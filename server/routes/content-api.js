"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    type: 'content-api',
    routes: [
        {
            method: 'GET',
            path: '/',
            handler: 'controller.getAnalyticsData',
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
    ],
};
