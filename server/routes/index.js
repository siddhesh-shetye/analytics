"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminRoutes = require('./admin');
const contentApiRoutes = require('./content-api');

module.exports = {
    adminRoutes,
    export: contentApiRoutes,
};