import {FastifyReply, FastifyRequest, fastify} from "fastify"

const app = fastify({
  logger: true
})

app.get('/', async (req: FastifyRequest, res: FastifyReply ) => {
    return 'Hello World'
})

app.listen({
  port: 3333
}).then();