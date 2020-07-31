import {Router} from 'express'
import apiRoutes from './api'

const routes = Router();
routes.use('/api', (new apiRoutes).routes)

export default routes
