const swagger = require('feathers-swagger');

function init() {
    swagger({
        prefix: /api\/v\d\//,
        docsPath: "/docs",
        uiIndex: true,
        info: {
            title: "Backend",
            description: "backend!"
        },
        securityDefinitions: {
            bearer: {
                type: "apiKey",
                name: "authorization",
                in: "header"
            }
        },
        security: [
            {
                bearer: []
            }
        ]
    })

}

module.exports = init;
// module.exports.default = init;