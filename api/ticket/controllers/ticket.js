"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async find(ctx) {
    let entities;
    Object.assign(ctx.query, { guest: ctx.state.user.id });
    if (ctx.query._q) {
      entities = await strapi.services.ticket.search(ctx.query);
    } else {
      entities = await strapi.services.ticket.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.ticket })
    );
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const ticket = await strapi.services.ticket.findOne({
      id,
      guest: ctx.state.user.id,
    });
    if (!ticket) {
      return ctx.throw(403, "Forbidden");
    }
    const entity = await strapi.services.ticket.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.ticket });
  },
  async create(ctx) {
    let entity = ctx.request.body;
    console.log("Create Request runs");

    const event = await strapi.services.event.findOne({ id: entity.event });
    if (!event) {
      return ctx.throw(
        400,
        "Da wo du hinwillst ist keiner. Das Event zu deiner Einladung gibt es nicht."
      );
    }
    const invitation = await strapi.services.invitation.findOne({
      id: entity.invitation,
    });
    if (!invitation) {
      return ctx.throw(400, "Sorry aber deine Einladung ist ungültig.");
    }
    const ticket = await strapi.services.ticket.findOne({
      guest: ctx.state.user.id,
    });
    if (ticket) {
      return ctx.throw(400, "Du nimmst bereits an diesem Event teil.");
    }

    const count = await strapi.services.ticket.count({
      invitation: entity.invitation,
    });

    Object.assign(entity, {
      guest: ctx.state.user,
      waitingList: invitation.maxTickets < count,
      signed: new Date(),
    });

    entity = await strapi.services.ticket.create(entity);
    return sanitizeEntity(entity, { model: strapi.models.ticket });
  },
};
