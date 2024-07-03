import { Router } from 'express';
import { sessionControler } from '../controls/sessionControler.js';
const routersession = Router();
const { createSession } = new sessionControler();

routersession.post('/session', createSession);

export { routersession };
