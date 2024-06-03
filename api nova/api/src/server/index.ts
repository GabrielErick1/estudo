import dotenv from 'dotenv';
dotenv.config();
 
const PORT = parseInt(`${process.env.PORT || 3000}`);
 
import { App } from "./server"
 
new App().server.listen(PORT, () => console.log(`Server is running at ${PORT}.`));