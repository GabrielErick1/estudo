import { routPath } from "../regex/router-path.js";
import { database } from "./database.js";
const databases = new database()
import {randomUUID} from "node:crypto"
export const router = [

   {
    method: "DELETE",
    path: routPath("/usres/:id"),
    handler: (req, res) => {
        const {id} = req.params;
        databases.delete('users', id)
        return res.writeHead(204).end()
    }
   },
   {
    method: "GET",
    path: routPath("/usres"),
    handler: (req, res) => {
        const users  = databases.select('users')
        return res.end(JSON.stringify(users))
    }
   },
   //post
   {
    method: "POST",
    path: routPath("/usres"),
    handler: (req, res) => {
        const {name, email, password} = req.body
      //  const use  = databases.select('users')
       /*
      verifica se exist id igual aquele const userExists = users.some(user => user.id === id);
       aqui soma e retuna o maior id const maxId = use.reduce((max, user) => {
          const userId = Number(user.id);
          return userId > max ? userId : max;
        }, 0);

       let novoId = maxId +  1;
*/
        const users  = {
            id: randomUUID(),
            name,
            email,
            password,
        }
        databases.insert('users', users)
        return res.writeHead(201).end()
    }
   },

  
]