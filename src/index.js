const express = require('express');
const router = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(cors());


app.use(express.json());

app.use('', router);

app.listen(80)