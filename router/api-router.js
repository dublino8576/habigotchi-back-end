const express = require('express')
const apiRouter = express.Router()
const {controllerFunction} = require('../controllers/habitController')
// apiRouter.get('/' , (req, res) => {res.status(200).send("endpoint")})
apiRouter.get('/' , controllerFunction)

module.exports = apiRouter
