import { env } from "../env";
import {app} from "./app"

app.listen(
    { 
        host: '0.0.0.0', 
        port: env.PORT_SERVER
    },
).then((port) => {
    console.log(`rodando port: ${port}`);  
})