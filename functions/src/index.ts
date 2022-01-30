import * as functions from 'firebase-functions'
import * as express from "express";
import {addCar,removeCar,getLastUpdate,getAll} from './parkingController'

const app = express();

const list = {
  "/incCar": "Increments the number of cars",
  "/decCar": "Decrement the number of cars",
  "/currentStatus": "Gives the last update",
  "/getAll": "Gives all the entries"
};

app.get('/', (req, res) => res.status(200).send(list))
app.get('/incCar', addCar)
app.get('/decCar', removeCar)
app.get('/currentStatus', getLastUpdate)
app.get('/getAll', getAll)

exports.app = functions.region('us-east1').https.onRequest(app)