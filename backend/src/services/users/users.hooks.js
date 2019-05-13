const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { queryWithCurrentUser } = require('feathers-authentication-hooks');
const { associateCurrentUser } = require('feathers-authentication-hooks');

const readRestrict = [
  queryWithCurrentUser({
    idField: '_id',
    as: '_id'
  })
];

const writeRestrict = [
  associateCurrentUser({
    idField: '_id',
    as: '_id'
  })
];

// update will replace the entire document. To merge with existing data patch should be used. 
module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), checkPermissions({
      roles: ['user']
    }), ...readRestrict],
    get: [authenticate('jwt'), checkPermissions({
      roles: ['user']
    }), ...readRestrict],
    create: [hashPassword()],
    update: [hashPassword(), authenticate('jwt'), checkPermissions({
      roles: ['user']
    }), ...writeRestrict],
    patch: [hashPassword(), authenticate('jwt'), checkPermissions({
      roles: ['user']
    }), ...writeRestrict],
    remove: [authenticate('jwt'), checkPermissions({
      roles: ['user']
    }), ...writeRestrict]
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
