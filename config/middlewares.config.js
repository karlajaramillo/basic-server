const express = require("express");
const cors = require("cors");

const { ORIGIN } = process.env;

function middlewares(app) {
  try {
    // recognize the incoming request object as a json object
    app.use(express.json());
    // to parse the request with urlencoded payloads
    app.use(express.urlencoded({extended: true}));
    // allow communication between server and browser
    app.use(cors( { credentials: true, origin: ORIGIN }));
  } catch(err) {
    console.log('error', err.message);
  } 
}

module.exports = middlewares;