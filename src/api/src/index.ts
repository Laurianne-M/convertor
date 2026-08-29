import {onRequest} from "firebase-functions/https";
import routes from './routes/routes.js';

export const api = onRequest(routes);
