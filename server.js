require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.options('*', cors());
app.use("/api/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
const https = require('https')
const fs = require('fs')
const routeBO = require('./routes/index');

app.use('/api', routeBO);

app.listen(process.env.API_PORT, () => {
  console.log(`[Server] listening on port ${process.env.API_PORT}`);
});
