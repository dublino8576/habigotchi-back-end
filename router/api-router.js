import express from 'express'
const apiRouter = express.Router()

import {controllerFunction} from '../controllers/habitController'
apiRouter.get('/' , controllerFunction)

export default apiRouter
