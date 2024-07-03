'use strict';

module.exports = ({ strapi }) => ({
  async index(ctx) {
    return await strapi.plugin('analytics').service('service').getData();
  },

  async getData(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getData();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getOverview(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getOverview();
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

  async getIdentifierOverview(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getIdentifierOverview(ctx);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getList(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getList(ctx);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  
  /*
  * @param key
  * @param data object with required key and extra params
  * @return Object
  */
  async generateAnalyticsObject(key, data) {
    // Validate if all required fields are present in the data object
    const requiredFields = ['event_type', 'collection_name', 'collection_id'];

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

  async getAnalyticsData(ctx) {
    try {
      return await strapi.plugin('analytics').service('service').getAnalyticsData(ctx);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});

