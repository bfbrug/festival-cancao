import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SessionJurorController from './app/controllers/SessionJurorController';
import JurorController from './app/controllers/JurorController';
import ParticipantController from './app/controllers/ParticipantController';
import RatingController from './app/controllers/RatingController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/juror_sessions', SessionJurorController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/jurors', JurorController.store);
routes.get('/jurors', JurorController.index);
routes.put('/jurors/:id', JurorController.update);

routes.post('/participants', ParticipantController.store);
routes.get('/participants', ParticipantController.index);
routes.put('/participants/:id', ParticipantController.update);

routes.post('/ratings/:id_participant', RatingController.store);

export default routes;
