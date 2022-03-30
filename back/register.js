const db = require( __dirname + '/db');
const { v4: uuidv4 } = require('uuid');

let post = app => {
    app.post('/register', (async (req, res) => {
        let result = await db.isDataUsed(req.body.pseudo, req.body.email); // On vérifie dans la DB si le pseudo ou l'email sont déjà pris
        if (result[0]) { // Le pseudo est déjà pris
            res.send("Pseudo déja utilisé !");
            console.log("Pseudo");
        } else if (result[1]) { // Le mail est pris
            res.send("Email déja utilisé !");
            console.log("Mail");
        } else { // C'est bon
            db.addUser(req.body.pseudo, req.body.email, req.body.password).then(() => console.log("User add!")); // On ajoute l'utilisateur dans la DB
            let id = uuidv4();
            res.cookie("id", id);
            res.cookie("username", req.body.email);
            res.constructor("id", uuidv4());
            res.send("Compte crée !");
            req.session.userdata = ({
                username: req.body.email,
                id: id
            });
            req.session.save();
        }
    }))
}

module.exports = {
    post(app) { return post(app); }
}