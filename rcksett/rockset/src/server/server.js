import http from  "node:http"
import { jsonMidler } from "./midllerr.js";
import { database } from "./database.js";


const databases = new database()
let id = 1;
const server = http.createServer( async (req, res) => {
    const {method, url} = req
    await jsonMidler(req, res)
    
   if(method === "GET" &&   url === "/usres"){
    const users  = databases.select('users')
    return res.end(JSON.stringify(users))
  }
   
    if(method === "POST" && url === "/usres"){
        const {name, email, password} = req.body
        const users  = {
            id: id,
            name,
            email,
            password,
        }
        databases.insert('users', users)
        id++;
        return res.writeHead(201).end()
    }
   
   
   
});



const port = 3333

server.listen(port, () => {
  console.log("Server running at http://127.0.0.1:3333/");
});