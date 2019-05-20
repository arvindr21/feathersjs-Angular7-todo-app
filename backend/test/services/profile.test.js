const assert = require('assert');
const app = require('../../src/app');

describe('\'profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/profile');

    assert.ok(service, 'Registered the service');
  });
});
