import {modelFunction} from '../models/modelFunction'

exports.controllerFunction = (req,res,next) => {
    return modelFunction()
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((err) => {
        next(err)
    })
}
