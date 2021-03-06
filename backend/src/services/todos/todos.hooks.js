const { authenticate } = require('@feathersjs/authentication').hooks;
const { readRestrict, writeRestrict, permitUser } = require('../../authorization');
const { addOwnerInfo } = require('../../hooks/hook.helpers');

function logHook(context) {
  console.log(context)
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permitUser, readRestrict],
    get: [permitUser, readRestrict],
    create: [permitUser, addOwnerInfo],
    update: [permitUser, writeRestrict, addOwnerInfo], // Overwrite a document
    patch: [permitUser, writeRestrict, addOwnerInfo], // Merge a document
    remove: [permitUser, writeRestrict, addOwnerInfo]
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
