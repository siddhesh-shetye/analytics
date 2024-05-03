'use strict';

module.exports = ({ strapi }) => ({
  async index(ctx) {
    return await strapi.plugin('analytics').service('service').getAnalyticsData();
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

  async generateAnalyticsObject(key, data) {
    // Validate if all required fields are present in the data object
    const requiredFields = ['event_type', 'event_name', 'collection_name', 'collection_id'];

    for (const field of requiredFields) {
      if (!data.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    return {
      analytics_data: {
        analytics_key: key,
        analytics_params: data
      }
    };
  },
});
