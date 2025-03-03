import * as dev_data from '../data/dev-data/index.js'
import seed from './seed.js';
import db from ("../connection/js")


const runSeed = () => {
    return seed(dev_data).then(() => db.end());
  };
  
  runSeed();
  