import { Router } from 'express'
import { ApiV1 } from '@/routes/apiV1'
import { authenticate } from '@/app/http/middleware/authenticate'

const routes = Router()
routes.use('/api', authenticate, new ApiV1().router)

export default routes
