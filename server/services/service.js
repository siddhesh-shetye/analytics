'use strict';

const modelName = "plugin::analytics.analytic";

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async getAnalyticsData() {
    const analytics = await strapi.entityService.findMany(modelName);
    return { data : analytics };
  },

  async create(ctx) {
    const { body } = ctx.request;

    const analytics = await strapi.entityService.create(modelName, {
      data: { ...body, publishedAt: new Date() },
    });

    return { data : analytics };
  },
});
