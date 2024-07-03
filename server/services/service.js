'use strict';

const modelName = "plugin::analytics.analytic";
let dateFNS = require('date-fns');

module.exports = ({ strapi }) => ({
  async getData() {
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
    const { event_type, collection_name, collection_id, field, identifier } = ctx.request.body;
    const { user } = ctx.state;


    if(strapi.plugin('analytics').config('attempts_enabled').toLowerCase() === "true") {
      const exists = await this.getAnalyticsWithFilters({ event_type, collection_name, collection_id, field, user });

      if (exists?.length >= strapi.plugin('analytics').config('analytics_attempts')) {
        return ctx.badRequest('Analytics per day exceeded');
      }
    }

    const data = {
      event_type,
      collection_name,
      collection_id,
      field,
      identifier,
      user_token: user.id ? user.id.toString() : (user.guest_id || ''),
      publishedAt: new Date()
    };
    
    const analytics = await strapi.entityService.create(modelName, { data });

    if(analytics?.id) {
      return {
        message: 'Analytics entry created successfully',
        status: 201
      };
    }

    return ctx.badRequest('Failed to create analytics entry');
  },

  async getAnalyticsData() {
    const analytics = await strapi.entityService.findMany(modelName);

    const groupedData = {};

    analytics.forEach(item => {
      const entityId = item.collection_id + '-' + item.collection_name;
      const field = item.field;
  
      if (!groupedData[entityId]) {
        groupedData[entityId] = {
          entity_id: item.collection_id,
          entity_name: item.collection_name,
          data: []
        };
      }
  
      // Find the index of the field in the data array
      const index = groupedData[entityId].data.findIndex(obj => obj.field === field);
      if (index === -1) {
        // If the field does not exist, add it to the data array
        groupedData[entityId].data.push({ field, count: 1 });
      } else {
        // If the field already exists, increment its count
        groupedData[entityId].data[index].count++;
      }
    });
  
    return { data : Object.values(groupedData) };
  },

  async getOverview() {
    const analytics = await strapi.entityService.findMany(modelName);

    const groupedData = {};

    analytics.forEach(item => {
      const entityId = item.collection_name;
  
      if (!groupedData[entityId]) {
        groupedData[entityId] = {
          entity_name: item.collection_name,
          counter: 1
        };
      } else {
        groupedData[entityId].counter++;
      }
    });
  
    return { data : Object.values(groupedData) };
  },
  
  async getIdentifierOverview(ctx) {
    const analytics = await strapi.entityService.findMany(modelName, {
      ...ctx.request.query
    });

    const groupedData = {};

    analytics.forEach(item => {
      const identifier = item.identifier;
      if (!identifier) {
        return;
      }

      let field = item.field;
      if(!field && item.event_type === "viewed") {
        field = 'page_views';
      }

      if (!groupedData[identifier]) {
        groupedData[identifier] = {
          record_identifier: identifier,
          data: []
        };
      }

      // Find the index of the field in the data array
      const index = groupedData[identifier].data.findIndex(obj => obj.identifier === field);
      if (index === -1) {
        // If the field does not exist, add it to the data array
        groupedData[identifier].data.push({ identifier: field, count: 1 });
      } else {
        // If the field already exists, increment its count
        groupedData[identifier].data[index].count++;
      }
    });
  
    return { data : Object.values(groupedData) };
  },
  
  async getList(ctx) {
    return await strapi.entityService.findMany(modelName, ctx.request.query);
  },
});
