const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const multer = require('multer')
const shell = require('shelljs')
const fs = require('fs')


app.use(cors());
app.use(morgan("dev"));

app.get("/createavatar", function (req, res, next) {
  //shell.exec('python -m apps.simple_test')
  //shell.exec('python -m apps.render_turntable -f ../client/src/components/FrontOffice/Avatar/models -ww 512 -hh 512')

});

const port = process.env.PORT || 5008;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const storage = multer.diskStorage({
  destination: '../client/src/components/FrontOffice/Avatar',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, "test.jpg" );
        }
})
let upload = multer({ storage: storage })
fs.unlinkSync('../client/src/components/FrontOffice/Avatar/test.jpg')
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.originalname);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
   // shell.exec('python -m apps.simple_test')
    //shell.exec('python -m apps.render_turntable -f ../client/src/components/FrontOffice/Avatar/models -ww 512 -hh 512')
  
})