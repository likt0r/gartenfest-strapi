"use strict";

/**
 * A set of functions called "actions" for `me`
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async find(ctx) {
    console.log("Me Request", ctx.state);
    if (ctx.state.user) {
      const result = {
        username: ctx.state.user.username,
        email: ctx.state.user.email,
        adress: ctx.state.user.adress,
        tel: ctx.state.user.tel,
      };
      return ctx.send(result);
    }
    return ctx.send({});
  },
};
