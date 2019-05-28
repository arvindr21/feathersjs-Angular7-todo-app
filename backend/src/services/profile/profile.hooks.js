const { authenticate } = require('@feathersjs/authentication').hooks;
const { readRestrict, writeRestrict, permitUser } = require('../../authorization');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [permitUser, readRestrict],
    get: [permitUser, readRestrict],
    create: [permitUser, writeRestrict],
    update: [permitUser, writeRestrict],
    patch: [permitUser, writeRestrict],
    remove: [permitUser, writeRestrict]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
