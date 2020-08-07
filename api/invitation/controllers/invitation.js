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
    const entity = await strapi.services.invitation.findOne({ uuid: id });
    removeHistory(entity);
    if (entity) {
      removeHistory(entity.event);
      delete entity.tickets;
    }

    return sanitizeEntity(entity, { model: strapi.models.invitation });
  },
};
