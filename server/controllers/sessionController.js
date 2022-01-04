const sessionController = {};

/* Import Statements */
import axios from 'axios';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import db from './models.cjs';
dotenv.config();

/* Constants */
const SALT_WORK_FACTOR = 10;


// Login User: Check whether the user exists in the database.
sessionController.loginUser = async (req, res, next) => {
  res.locals.userName = req.body.username;

  // Make an asynchronous call to the database to check whether that username exists.
  const userSelect = `SELECT * from login WHERE username='${res.locals.userName}'`
  async function queryUser() {
    await db.query(userSelect, (err, result) => {
      if (err) {
        return next({
          log: 'error encountered in loginUser',
          message: {
            'err': `error encountered in loginUser: ${err}`
          }
        });
      } else {
        // if the user exists, then get the associated password and name from the result object (if it exits)
        if (result.rows.length) {
          res.locals.foundUser = true;
          res.locals.passWord = result.rows[0].password;
          res.locals.name = result.rows[0].name;
          return next();
        } else {
          // If we didn't hit an error and didn't find the user in the database, save fact that user wasn't found to a variable.
          res.locals.foundUser = false;
          return next();
        }
      }
    });
  }
  await queryUser();
};

// After checking whether the user exists, check whether the password on req.body.password is the same as password in the DB.
sessionController.checkPassword = async (req, res, next) => {

  // Compare req.body.password to hashed password in the DB.
  bcrypt.compare(req.body.password, res.locals.passWord, (err, response) => {
    if (response === true) {
      res.locals.clearance = true;
    } else {
      res.locals.clearance = false;
    }
    return next();
  });
};

// Middleware to add new user to the database.
sessionController.addUser = async (req, res, next) => {

  // If the user already exists --> set variable so indicating, and return to the route.
  if (res.locals.foundUser === true) {
    res.locals.userAlreadyExists = true;
    return next();
  } else if (res.locals.foundUser === false) {
    // If the user doesn't exist yet, create it (hashing and saving its password.)
    res.locals.userAlreadyExists = false;
    res.locals.createUserName = req.body.username;
    res.locals.createPassWord = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    res.locals.createName = req.body.name;
    const createUser = `INSERT INTO login (username, password, name) VALUES (\'${res.locals.createUserName}\', \'${res.locals.createPassWord}\', \'${res.locals.createName}\')`;
    await db.query(createUser, (err, result) => {
      if (err) {
        return next({
          log: 'error encountered in addUser',
          message: {
            'err': `error encountered in addUser: ${err}`
          }
        });
      } else {
        console.log(`Successfully created new user ' + ${res.locals.createUserName}`);
      }
    });
    return next();
  } else {
    return next();
  }
};

export default sessionController;