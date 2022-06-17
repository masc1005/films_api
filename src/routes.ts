import { Router } from 'express'

import user from './controllers/userController'
// import films from './controllers/filmsController'
// import gender from './controllers/genderController'
import login from './controllers/authController'
import authMiddleware from './middlewares/authMiddleware'


const routes = Router();


routes.post('/user', user.create)

routes.post('/login', login.authenticate)


routes.use(authMiddleware)

// routes.post('/films/:userId', films.create)
// routes.get('/films', films.read)
// routes.get('/film/:filmId', films.readOne)
// routes.put('/films', films.update)
// routes.delete('/films', films.delete)

// routes.post('/gender', gender.create)
// routes.get('/gender', gender.read)


export default routes;