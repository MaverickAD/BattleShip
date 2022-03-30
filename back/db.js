/**
 * @desc Module utilisé pour dialoguer avec la base de donnée
 * @author Cyril Cuvelier
 */

const bcrypt = require('bcrypt');
const config = require("./config");
const mysql = require("mysql"),
    connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });

/**
 * @desc Fonction qui ajoute un utilisateur à la base de donnée
 * @param pseudo nom de l'utilisateur
 * @param mail mail de l'utilisateur
 * @param password mot de passe EN CLAIR de l'utilisateur
 * @return  Elle est asynchrone mais je sais pas pourquoi...
 */
let addUser = async (pseudo, mail, password) => {

    let promise = new Promise( function (resolve, reject) {
        bcrypt.genSalt(config.saltRounds,function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                if (err) reject(err);
                resolve(hash);
            });
        });
    });

    password = await promise;

    return new Promise(function (resolve, reject) {
        // let sessionData = req.session;

        // if(!sessionData.username){
        //     res.sendFile(__dirname + '/front/html/login.html')
        // }
        // else{
        //     res.sendFile(__dirname + '/front/html/index.html')
        // }
        let sql = "INSERT INTO users (pseudo, mail, password) VALUES (?)";
        connection.query(
            sql,
            [[pseudo, mail, password]],
            function (error, results) {
                if (error) reject(error);
                resolve(results);
            });
    });
}

/**
 * @desc Fonction qui vérifie la disponibilité d'un nom d'utilisateur ou d'un mail
 * @param pseudo nom d'utilisateur à vérifier
 * @param mail mail à vérifier
 * @returns {Promise<boolean[]>} [nomUsed, mailUsed]
 */
let isDataUsed = async (pseudo, mail) => {

    let nameUsed = false;
    let mailUsed = false;

    let promises = Promise.all([
        new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM users WHERE pseudo = (?)";
            connection.query(
                sql,
                [pseudo],
                function (error, results) {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        }),
        new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM users WHERE mail = (?)";
            connection.query(
                sql,
                [mail],
                function (error, results) {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        }),
    ]);

    let result = await promises;

    if (result[0].length !== 0) nameUsed = true;
    if (result[1].length !== 0) mailUsed = true;

    return [nameUsed, mailUsed];
}

/**
 * Fonction qui vérifie si la paire name/password ou mail/password existe dans la base de donnée
 * @param name Nom d'utilisateur
 * @param mail Mail de l'utilisateur
 * @param password Mot de pas EN CLAIR de l'utilisateur
 * @returns {Promise<boolean>}
 */
let logIn = async (mail, password) => {
    let sql, data;
    let canLoggIn = false;

   sql = "SELECT password FROM users WHERE mail = (?)";
   data = mail;

    let promise = new Promise(function (resolve, reject) {
        connection.query(
            sql,
            [data],
            function (error, results) {
                if (error) reject(error);
                resolve(results);
            });
    });

    let passwordHashed = await promise;

    if (passwordHashed[0]){

        promise = new Promise( function (resolve, reject) {
            bcrypt.compare(password, passwordHashed[0].password, function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });

        canLoggIn = await promise;
    }

    return canLoggIn;
}

/**
 * @desc Fonction qui nous déconnecte de la base de donnée
 */
let endConnection = () => connection.end();

module.exports = {
    addUser(pseudo, mail, password) { return addUser(pseudo, mail, password); },
    isDataUsed(pseudo, mail) { return isDataUsed(pseudo, mail); },
    logIn(mail, password) { return logIn(mail, password); },
    endConnection() { return endConnection(); },
};