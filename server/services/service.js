'use strict';

const modelName = "plugin::analytics.analytic";
let dateFNS = require('date-fns');

module.exports = ({ strapi }) => ({
  async getAnalyticsData() {
    const analytics = await strapi.entityService.findMany(modelName);
    return { data : analytics };
  },

  async getAnalyticsWithFilters(obbj) {
    const user = obbj.user.id ? obbj.user.id.toString() : (obbj.user.guest_id || '');
    const analyticsHours = dateFNS.subHours(new Date(), strapi.plugin('analytics').config('analytics_hours'));

    const analyticsFilters = {
      $and: [
        { event_type: obbj.event_type },
        { collection_name: obbj.collection_name },
        { collection_id: obbj.collection_id },
        { user_token: user },
        { createdAt: { $gt: analyticsHours } }
      ]
    };
    
    if (obbj.field) {
      analyticsFilters.$and.push({ field: obbj.field });
    }

    return await strapi.entityService.findMany(modelName, { filters: analyticsFilters });
  },

  async create(ctx) {
    const { event_type, event_name, collection_name, collection_id, field } = ctx.request.body;
    const { user } = ctx.state;


    if(strapi.plugin('analytics').config('attempts_enabled').toLowerCase() === "true") {
      const exists = await this.getAnalyticsWithFilters({ event_type, collection_name, collection_id, field, user });

      if (exists?.length >= strapi.plugin('analytics').config('analytics_attempts')) {
        return ctx.badRequest('Analytics per day exceeded');
      }
    }

    const data = {
      event_type,
      event_name,
      collection_name,
      collection_id,
      field,
      user_token: user.id ? user.id.toString() : (user.guest_id || ''),
      publishedAt: new Date()
    };
    
    const analytics = await strapi.entityService.create(modelName, { data });

    if(analytics?.id) {
      return ctx.send({
        message: 'Analytics entry created successfully',
        status: 201
      });
    }

    return ctx.badRequest('Failed to create analytics entry');
  }
});
