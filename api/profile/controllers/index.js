"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * A set of functions called "actions" for `me`
 */
module.exports = {
  async update(ctx) {
    const { id } = ctx.state.user;
    //sanitize request body
    const updateData = ["username", "address", "tel"].reduce((acc, field) => {
      acc[field] = ctx.request.body[field];
      return acc;
    }, {});

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id: ctx.state.user.id },
      updateData
    );

    ctx.send(
      sanitizeEntity(data, {
        model: strapi.query("user", "users-permissions").model,
      })
    );
  },
};
