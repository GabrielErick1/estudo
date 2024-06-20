"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const app = (0, fastify_1.fastify)({
    logger: true
});
app.get('/', async (req, res) => {
    return 'Hello World';
});
app.listen({
    port: 3333
}).then();
