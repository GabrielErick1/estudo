export async function jsonMidler(req, res) {
<<<<<<< HEAD:rcksett/rockset/src/server/midllerr.js
   const buffers = []

   for await (const chunk of req) {
     buffers.push(chunk)
   }

   try {
     req.body = JSON.parse(Buffer.concat(buffers).toString())
   }catch{
     req.body = null
   }
=======
    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)   
    }

    try {
     req.body = JSON.parse(Buffer.concat(buffers).toString());
    }catch {
        req.body = null
    }
    res.setHeader("Content-Type", "application/json")
>>>>>>> d80b8e144650729481b3b7fa7dd612ef0f93fd2c:rockset/src/server/midllerr.js
}