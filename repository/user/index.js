const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { user } = require("../../models");

exports.createUser = async (payload) => {
  try {
    // encrypt the password
    payload.password = bcrypt.hashSync(payload.password, 10);


    // save to db
    const data = await user.create(payload);

    // save to redis (email and id)
    // const keyID = `user:${data.id}`;
    // await setData(keyID, data, 300);

    // const keyEmail = `user:${data.email}`;
    // await setData(keyEmail, data, 300);

    return data;
    } catch (error) {
        console.error(error);
        throw new Error("User with that email already exists!");
    }
};

exports.getUserByEmail = async (email) => {
  // const key = `user:${email}`;

  // // get from redis
  // let data = await getData(key);
  // if (data) {
  //     return data;
  // }

  // get from db
  data = await user.findAll({
    where: {
      email,
    },
  });
  if (data.length > 0) {
    // save to redis
    // await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`User is not found!`);
};

exports.getGoogleAccessTokenData = async (accessToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );
  return response.data;
};
