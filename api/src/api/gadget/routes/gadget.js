'use strict';

/**
 * gadget router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::gadget.gadget');
