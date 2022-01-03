const sessionController = {};
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import db from './models.cjs';

const SALT_WORK_FACTOR = 10;
import bcrypt from 'bcryptjs';

sessionController.loginUser = async (req, res, next) => {

  console.log('running get User');
  console.log(req.body);

  res.locals.userName = req.query.username ? req.query.username : req.body.username;
  // protect query
  const userSelect = `SELECT * from login WHERE username='${res.locals.userName}'`;

  // look for the user.
  async function queryUser() {
    console.log('entering query user function');
    await db.query(userSelect, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('received result from the db and there was no error');
        // if the user exists, then get the associated passWord and name.
        console.log(result);
        if (result.rows.length) {
          console.log(`this user already exists, and its password is ${result.rows[0].password}`);
          res.locals.foundUser = true;
          res.locals.passWord = result.rows[0].password;
          res.locals.name = result.rows[0].name;
          console.log('leaving getuser');
          return next();
        } else {
          // if the user doesn't exist, then set foundUser to false.
          res.locals.foundUser = false;
          return next();
        }
      }
    });
  }

  const waitMe = await queryUser();
};

sessionController.checkPassword = async (req, res, next) => {
  // when checking password, want to check whether the password passed in is the same as res.locals.password.

  //res.locals.hashedPass = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
  bcrypt.compare(req.body.password, res.locals.passWord, function (err, response) {
    if (response === true) {
      res.locals.clearance = true;
    } else {
      res.locals.clearance = false;
    }
    return next();
  });

};

sessionController.addUser = async (req, res, next) => {
  console.log('running add user');

  console.log('request body');
  console.log(req.body);

  if (res.locals.foundUser === true) {
    console.log('not going to add a new user because this user already exists');
    res.locals.userAlreadyExists = true;
    return next();
  } else if (res.locals.foundUser === false) {
    console.log('going to add a new user because this user doesnt exist yet');
    res.locals.userAlreadyExists = false;
    res.locals.createUserName = req.body.username;
    res.locals.createPassWord = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    res.locals.createName = req.body.name;
    const createUser = `INSERT INTO login (username, password, name) VALUES (\'${res.locals.createUserName}\', \'${res.locals.createPassWord}\', \'${res.locals.createName}\')`;
    await db.query(createUser, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('no error so far in creating the user');
        console.log('created user');
        console.log(result.rows);
      }
    });
    console.log('this mans our error is in the db query');
    return next();
  } else {
    console.log('it should be impossible to reach this message -- if so something went wrong');
    return next();
  }
};

export default sessionController;