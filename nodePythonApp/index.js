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
  destination: './sample_images',
        filename: function ( req, file, cb ) {
          fs.unlinkSync('./sample_images/test.png');

            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, "test.png" );
        }
})
let upload = multer({ storage: storage })

app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
  const file = req.file;
  // console.log(file.originalname);
  if (!file) {
    const error = new Error('No File');
    error.httpStatusCode = 400;
    return next(error);
  }

  // shell.exec('python -m apps.simple_test');
  // shell.exec('python -m apps.render_turntable -f ./ -ww 512 -hh 512');
  
 /* missing code to get file from directori and send it back to react

     code here 

*/

    res.send(file);
  
})