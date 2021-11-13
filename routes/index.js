/** Requiring routes */
const userRoutes       = require('./userRoutes');
const restaurantRoutes = require('./restaurantRoutes');

/** Initiating routes */
const initRoutes = (app)=>{
  app.use(userRoutes)
  app.use(restaurantRoutes)
}

/** Importing routes */
module.exports = { initRoutes };
