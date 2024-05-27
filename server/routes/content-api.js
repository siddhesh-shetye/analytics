"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    type: 'content-api',
    routes: [
        {
            method: 'GET',
            path: '/',
            handler: 'controller.getData',
            config: {
              policies: [],
            },
        },
        {
            method: 'POST',
            path: '/',
            handler: 'controller.create',
            config: {
              policies: [],
            },
        },
        {
            method: 'GET',
            path: '/data',
            handler: 'controller.getAnalyticsData',
            config: {
              policies: [],
            },
        },
        {
            method: 'GET',
            path: '/overview',
            handler: 'controller.getOverview',
            config: {
              policies: [],
            },
        },
        {
            method: 'GET',
            path: '/overview-identifier',
            handler: 'controller.getIdentifierOverview',
            config: {
              policies: [],
            },
        },
    ],
};

