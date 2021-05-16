const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const multer = require('multer')
const shell = require('shelljs')
const path = require('path');
app.use(cors());
app.use(morgan("dev"));

app.get("/createavatar", function(req, res, next){
     
  var options = {
      root: path.join(__dirname)
  };
    
  var fileName = 'result_test_512.obj';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
          next();
      }
      console.log("File Sent")
      
      res.status(200).send();
      return ;
  });
});

/*app.get("/createavatar", function (req, res, next) {
  //shell.exec('python -m apps.simple_test')
  //shell.exec('python -m apps.render_turntable -f ./results/pifuhd_final/recon -ww 512 -hh 512')
  console.log("File Sent")
    res.send();
    return ;
});*/

const port = process.env.PORT || 5008;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const storage = multer.diskStorage({
  destination: './sample_images',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, "test.jpg" );
        }
})
let upload = multer({ storage: storage })
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.originalname);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
     // shell.exec('python -m apps.simple_test')
   // shell.exec('python -m apps.render_turntable -f ./ -ww 512 -hh 512')
  var options = {
    root: path.join(__dirname)
};
  
var fileName = 'result_test_512.obj';
res.sendFile(fileName, options, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:', fileName);
        next();
    }
    console.log("File Sent")
    res.send();
    return ;
});

})