const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { disallow } = require('feathers-hooks-common');

const { readRestrict, writeRestrict, permitAdmin, permitUser } = require('../../authorization');

// update will replace the entire document. To merge with existing data patch should be used. 
module.exports = {
  before: {
    // on the user collection we are only letting the API to create and get one record. 
    // We do not want to expose any other kind of user modification 
    all: [],
    find: [disallow('rest')],
    get: [authenticate('jwt'), permitUser, readRestrict],
    create: [hashPassword()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]

    // Commenting for future reference to show how to protect a HTTP VERB
    // find: [authenticate('jwt'), permitUser, readRestrict],
    // get: [authenticate('jwt'), permitUser, readRestrict],
    // create: [hashPassword()],
    // update: [hashPassword(), authenticate('jwt'), permitAdmin, writeRestrict],
    // patch: [hashPassword(), authenticate('jwt'), permitAdmin, writeRestrict],
    // remove: [authenticate('jwt'), permitAdmin, writeRestrict]
  },

  after: {
    all: [
      // Make sure the password & permissions fields are never sent to the client
      // Always must be the last hook
      protect('password'), protect('permissions')
    ],
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
