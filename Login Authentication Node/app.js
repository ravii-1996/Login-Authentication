const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./router/api.js');

var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.use('/api', router);

app.listen(process.env.PORT  || 4000, (err,res)=>{
  console.log("Server is running on "+ 4000);
});
