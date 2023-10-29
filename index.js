var express = require('express');
var cors = require('cors');
var multer = require("multer");
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const upload = multer({dest: "uploads/"});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req,res){
  console.log(req.file);
  let file_name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  res.json({
    name: file_name,
    type: type,
    size: size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
