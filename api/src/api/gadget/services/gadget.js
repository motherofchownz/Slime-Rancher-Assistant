'use strict';

/**
 * gadget service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gadget.gadget');
