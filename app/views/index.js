const express = require('express');
const app = express();


app.use(require('./login.view'));
app.use(require('./presupuestos.view'));
app.use(require('./usuarios.view'));

module.exports = app;