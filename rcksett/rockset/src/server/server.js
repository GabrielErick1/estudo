import http from  "node:http"
import { jsonMidler } from "./midllerr.js";
import { router } from "./router.js";

const server = http.createServer( async (req, res) => {
    const {method, url} = req
    await jsonMidler(req, res)
  console.log(method);
   const routers = router.find(routerd => {
     console.log(routerd.path);
    return routerd.method === method && routerd.path.test(url)
   })

   if(routers){
    const routeparams  = req.url.match(routers.path)
    req.params  =  {...routeparams.groups}
   return routers.handler(req, res)

   } else {
   return res.writeHead(404).end()
   }
  });


const port = 3333

server.listen(port, () => {
  console.log("Server running at http://127.0.0.1:3333/");
});