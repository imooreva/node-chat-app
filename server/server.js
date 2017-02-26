const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); //helps middleware work properly
const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath)); //middleware
app.listen(PORT, () => console.log(`Started up on port ${PORT}`));