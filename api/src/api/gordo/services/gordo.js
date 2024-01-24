'use strict';

/**
 * gordo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gordo.gordo');
