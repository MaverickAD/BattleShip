const prod = false;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const login = require(__dirname + '/back/login');
const register = require(__dirname + '/back/register');
const socket = require(__dirname + '/back/socket');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

// Initialisation de la session et des cookies
const session = require('express-session')({
    secret: "a&edjdbhj&567_ç&gyuik:;,n0_",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

// Partage de la session et des cookies !
const sharedsession = require('express-socket.io-session');

// On utilise la session
app.use(session);

// On utilise les cookies
io.use(sharedsession(session, {
    autoSave: true
}));

// On utilise cookieParser
app.use(cookieParser());

// Si on passe en prod, on sécurise les cookies
if (prod){
    app.set('trust proxy', 1);
    session.cookie.secure = true;
}

// On utilise l'extension urlencodedParser pour decoder les requêtes
app.use(urlencodedParser);

// Pour aller chercher les fichiers JS
app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {
    if (!req.session.userdata){
        res.sendFile(__dirname + '/front/html/index.html');
    }else{
        res.sendFile(__dirname + '/front/html/waiting.html');
    }
})

// Page de traitement du formulaire de login
login.post(app);

// Page de traitement du formulaire d'inscription
register.post(app);

app.get('/play', (req, res) => {
    if (!req.session.userdata){
        res.sendFile(__dirname + '/front/html/index.html');
    }else {
        res.sendFile(__dirname + '/front/html/play.html');
    }
})

app.get('/session', (req, res) => {
    if (!req.session.userdata){
        res.redirect('/');
    }else {
       req.session.destroy(err => {
           res.redirect('/');
           }
       )
    }
})

// Partie socket
socket.init(io);


server.listen(port, () => {
    console.log("Application Chargée !");
})