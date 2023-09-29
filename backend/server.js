const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/index');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const cors = require('cors');

var busboy = require('connect-busboy');
//...

//Express
const app = express();

app.use(express.json());
app.use(busboy()); 


// capturar body
//app.use(bodyparser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true })); 
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/healthcheck', require('./routers/health_checker'));

app.get('/app/*', function (req, res) {
  res.send("Backend en Node Js Ok!!!")
  //res.sendFile(__dirname+"/public/index.html");
});


//-Middelware - file upload
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


var corsOptions = {
  origin: '*', // Reemplazar con dominio
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));



router(app);


//Handler
app.use(function(err, req, res, next) {

  const status = err.statusCode || 500; 
  const message = err.message;
  const data = err.data;

  res.status(status).json({
    message: message,
    data: data
  })


});

//mongoose.connect(process.env.MONGO_URL, {
  mongoose.connect('mongodb+srv://patricio-27:Kp6UdFtBjCUUXvg@clusternode.th9ofqr.mongodb.net/Bdnode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(  ()=>{
    console.log('Mongo Ok');
})
  
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
      console.log(`servidor andando en: ${PORT}`)
      console.log(process.env.PORT)
  })