const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra')
const multer = require('multer')
const Swal = require('sweetalert2')
const secure = require('ssl-express-www')
const user = JSON.parse(fs.readFileSync('./user.json'))
const path = require('path');
var date = new Date()
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',   hour: 'numeric',
  minute: 'numeric',
  second: 'numeric' };


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.enable('trust proxy');
app.set("json spaces", 2)
app.use(secure)
app.use(cors());
app.use(express.static("public"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers" , "x-access-token, Origin, Content-Type, Accept");
    next();
});

const getId = (username) => {
    let position = null
    Object.keys(user).forEach((i) => {
        if (user[i].username === username) {
            position = true
        }
    })
    if (position !== null) {
        return position
    }
}

const addMessage = async (link, message) => {
    let pos = null
    Object.keys(user).forEach((i) => {
        if (user[i].link === link){
            pos = i
        }
    })
    if (pos !== null) {
        date3 = date.toLocaleDateString('id-ID' , options)
        let obj = {
            waktu: date3,
            message: message,
            type: "text"
        }
        user[pos].data.push(obj)
        fs.writeFileSync('./user.json', JSON.stringify(user))
    }
}

const addImage = async (link, image, req) => {
    let pos = null
    Object.keys(user).forEach((i) => {
        if (user[i].link === link){
            pos = i
        }
    })
    if (pos !== null) {
        date4 = date.toLocaleDateString('id-ID' , options)
        if (req.body.message == undefined || req.body.message == "" || req.body.message == " ") {
            obj = {
              waktu : date4,
              message: "",
              gambar: image,
              type: "image"
            }
            } else {
            obj = {
            waktu : date4,
            message: req.body.message,
            gambar: image,
            type: "image"
            }
        }
        user[pos].data.push(obj)
        fs.writeFileSync('./user.json', JSON.stringify(user))
    }
}

const addAudio = async (link, audio, req) => {
    let pos = null
    Object.keys(user).forEach((i) => {
        if (user[i].link === link){
            pos = i
        }
    })
    if (pos !== null) {
        date5 = date.toLocaleDateString('id-ID' , options)
            obj = {
            waktu : date5,
            audio: audio,
            type: "audio"
            }
        user[pos].data.push(obj)
        fs.writeFileSync('./user.json', JSON.stringify(user))
    }
}

const getName = (id) => {
    let pos = null
    Object.keys(user).forEach((i) => {
        if (user[i].link === id){
            pos = user[i].username
        }
    })
    if (pos !== null) {
        return pos
    }
}

const getData = (id) => {
    let pos = null
    Object.keys(user).forEach((i) => {
        if (user[i].link === id){
            pos = user[i]
        }
    })
    if (pos !== null) {
        return pos
    }
}


app.get('/', (req, res) => {
   if(req.session.loggedin){
       res.render('index', {
              data : req.session.data
       }, (err, html) => {
        if (err) return console.log(err)
        res.send(html)
       })
   } else {
      res.render('belumlogin', {}, (err, html) => {
        if (err) return console.log(err)
        res.send(html)
      })
   }
})

app.get('/usingchrome' , async (req,res) => {
  res.render('error', {}, (err,html) => {
    res.send(html)
  })
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    if (id === 'favicon.ico') return
    try {
    if (req.session.data.username ===  await getName(req.params.id)) {
        data3 = getData(id)
        name2 = getName(id)
        res.render('datamessage', {
            data : data3,
            name : name2
        }, (err, html) => {
            if (err) return console.log(err)
            res.send(html)
        })
    } else if (req.session.data.username !== getName(req.params.id)) {
        datauser = getData(req.params.id)
        res.render('message' , {
            data: datauser
        } , (err, html) => {
            if (err) return res.send('error')
            res.send(html)
        })
    } else if (getId(req.session.data.username)){
        res.render('index', {
            data : req.session.data
        }, (err, html) => {
            if (err) return console.log(err)
            res.send(html)
        })
    }
    } catch (err) {
    let test = null;
    for (let i of user) {
        if (i.link == req.params.id) {
            test = true
        }
    } 
    if (test) {
        datauser = getData(req.params.id)
        res.render('message', {
            data : datauser
        }, (err, html) => {
            if (err) return console.log(err)
            res.send(html)
        })
    } else {
        res.jsonp({status: 'gagal', message: 'User Not Found'})
    }
}
})

app.post('/', multer().none() , async (req, res) => {
    if (req.body.form === 'message'){
      addMessage(req.body.link, req.body.message)
      res.jsonp({status: 'succes', message: 'Message berhasil dikirim secara anonymous' , link: req.body.link})
    }
})

const upload = multer({
    dest: "./public/img/"
});

app.post('/image', upload.single("gambar") , async (req, res) => {
    getuser = getName(req.body.link)
    const tempPath = req.file.path;
    const directoryPath = path.join(__dirname, './public/img/');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
    });
    const random = Math.floor(Math.random() * 100000) + 1;
    let type = path.extname(req.file.originalname)
    //check if folder exits or not
    if (!fs.existsSync(directoryPath + getuser)) {
        fs.mkdirSync(directoryPath + getuser)
    }
    const tempat = path.join(__dirname, `./public/img/${getuser}/${random}${type}`);
    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".webp" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
         fs.rename(tempPath, tempat , function (err) {
          if (err) return console.log(err);
          addImage(req.body.link, `./img/${getuser}/${random}${type}` , req)
          res.jsonp({status: 'succes', message: 'Image berhasil dikirim secara Anonymous' , link: req.body.link})
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return console.log(err);
            res.jsonp({status: 'Error', message: 'Foto Harus PNG' , link: req.body.link})
        });
      }
})

const upload2 = multer({
    dest: "./public/audio/"
});

app.post('/audio', upload2.single("audio") , async (req, res) => {
    getuser = getName(req.body.link)
    const tempPath = req.file.path;
    const directoryPath = path.join(__dirname, './public/audio/');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
    });
    let type = path.extname(req.file.originalname)
        const random = Math.floor(Math.random() * 100000) + 1;
    if (!fs.existsSync(directoryPath + getuser)) {
        fs.mkdirSync(directoryPath + getuser)
    }
    const tempat = path.join(__dirname, `./public/audio/${getuser}/${random}${type}`);
    if (path.extname(req.file.originalname).toLowerCase() === ".mp3") {
       fs.rename(tempPath, tempat , function (err) {
          if (err) return console.log(err);
          addAudio(req.body.link, `./audio/${getuser}/${random}${type}` , req)
          res.jsonp({status: 'succes', message: 'Audio berhasil dikirim secara Anonymous' , link: req.body.link})
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return console.log(err);
            res.jsonp({status: 'Error', message: 'Foto Harus PNG' , link: req.body.link})
        });
      }
})


app.post('/datauser', multer().none() , async (req,res) => {
    const { username } = req.body
    if (username === '') return res.send({status: false, message: 'Username tidak boleh kosong'})
    const randomText = Math.random().toString(36).substring(2, 8)
        user.push({
            username: username,
            link: randomText,
            message: 'Link anda berhasil dibuat\n\nLink anda : https://Secretov2.piyoxz.repl.co/' + randomText,
            data: []
        })
        fs.writeFileSync('./user.json', JSON.stringify(user))
        req.session.loggedin = true
        req.session.data = {
           username : username,
           link: randomText,
           message: 'Link anda berhasil dibuat\n\nLink anda : https://Secretov2.piyoxz.repl.co/' + randomText,
           data : []

        }
        res.send({
            status: true,
            message: 'Link anda berhasil dibuat\n\nLink anda : https://Secretov2.piyoxz.repl.co/' + randomText
        })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})

