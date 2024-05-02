'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('analytics')
      .service('service')
      .getWelcomeMessage();
  },

  async getAnalyticsData(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getAnalyticsData();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').create(ctx);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
