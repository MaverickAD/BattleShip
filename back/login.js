const db = require( __dirname + '/db');
const { v4: uuidv4 } = require('uuid');

let post = app => {
    app.post('/login', async (req, res) => {
        let result = await db.logIn(req.body.email, req.body.password); // On demande à la DB si la paire mail/pass est bonne !
        if (result){
            console.log(req.body.email, " is logged !");
            let id = uuidv4();
            res.cookie("id", id);
            res.cookie("username", req.body.email);
            res.send("Connected!");
            req.session.userdata = ({
                username: req.body.email,
                id: id
            });
            req.session.save();
        }else{
            res.send('Error in password or pseudo/email');
            console.log("Login error!")
        }
    })
}

module.exports = {
    post(app) { return post(app); }
}