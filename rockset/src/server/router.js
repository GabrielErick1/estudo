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
    method: "PUT",
    path: routPath("/usres/:id"),
    handler: (req, res) => {
        const {id} = req.params;
<<<<<<< HEAD:rcksett/rockset/src/server/router.js
        const {name, password, email } = req.body;
        const data = {
=======
        const {name, password, email} = req.body;
        const dados = {
>>>>>>> d80b8e144650729481b3b7fa7dd612ef0f93fd2c:rockset/src/server/router.js
            name,
            email,
            password,
        }
<<<<<<< HEAD:rcksett/rockset/src/server/router.js
        databases.update('users', id, data)
        return res.writeHead(200).end()
=======
        databases.update('users', id, dados)
        return res.writeHead(204).end()
>>>>>>> d80b8e144650729481b3b7fa7dd612ef0f93fd2c:rockset/src/server/router.js
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