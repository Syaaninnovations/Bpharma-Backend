require('dotenv').config();
let AWS = require("aws-sdk");

AWS.config.update({
    "region": process.env.applicationRegion,
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY
});
module.exports = { AWS  };