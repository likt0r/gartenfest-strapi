"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { removeHistory } = require("../../tools.js");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.event.findOne({ id });
    // if user is a guest only send data if he has a ticket an delete all not nessary fields
    if (ctx.state.user.role.name == "Guest") {
      const entity = await strapi.services.ticket.findOne({
        event: id,
        guest: ctx.state.user.id,
      });
      if (!entity) return ctx.throw(404, "Forbidden");
    }
    if (entity) {
      removeHistory(entity);
      delete entity.tickets;
      delete entity.invitations;
    }
    return sanitizeEntity(entity, { model: strapi.models.event });
  },
};
