/**
 * Job.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'job',
  attributes: {

    job_name: {
      type: 'string',
      required: true
    },

    part_id: {
      type: 'number',
      required: true
    },

    quantity: {
      type: 'number'
    }

  },

};

