
const express = require('express');
const controllers = require('./auth.controllers');

const ROUTES = {
  signup: "/signup", //post
  login: "/login", // post
  isLoggedIn: "/login", //get -> check if it's logged in  
  logout: "/logout", //post
}
//router.get('/login',  async (req, res) => { }

function authRouter (app) {
  const router = express.Router();
  
  router
    .post(ROUTES.signup, controllers.signup) //post - signup
    .post(ROUTES.login, controllers.login) //post - login
    .get(ROUTES.isLoggedIn, controllers.getLoggedInUser) //get - logged in
    .post(ROUTES.logout, controllers.logout) //post - logout
  
    app.use("/api", router);
}

// post: /api/signup
// post: /api/login
// get: /api/login
// post: /api/logout



module.exports = authRouter; // this will be included in app.js