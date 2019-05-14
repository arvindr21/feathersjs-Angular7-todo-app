const { queryWithCurrentUser, associateCurrentUser } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');

// Access rights based on current user
// A user who is indentified by their _id only will be allowed
// to access the resource. 
const readRestrict = queryWithCurrentUser({
    idField: '_id',
    as: '_id'
})

const writeRestrict = associateCurrentUser({
    idField: '_id',
    as: '_id'
})


// Access rights based on role
const permitUser = checkPermissions({
    roles: ['user', 'admin']
});

const permitAdmin = checkPermissions({
    roles: ['admin']
});

module.exports.readRestrict = readRestrict;
module.exports.writeRestrict = writeRestrict;
module.exports.permitUser = permitUser;
module.exports.permitAdmin = permitAdmin;