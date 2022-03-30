let Connection = (function (){
    return {
        init(){

            let loginForm = document.getElementById("loginForm");
            let login_inputMail = document.getElementById("login_inputMail");
            let login_inputPassword = document.getElementById("login_inputPassword");

            let registerForm = document.getElementById("registerForm");
            let register_inputName = document.getElementById("register_inputName");
            let register_inputMail = document.getElementById("register_inputMail");
            let register_inputPassword = document.getElementById("register_inputPassword");
            let register_inputPassword2 = document.getElementById("register_inputPassword2");

            loginForm.addEventListener("submit", async event => {
                event.preventDefault();
                if (login_inputMail.value && login_inputPassword.value){
                    let res = await Logger.sendLogin(login_inputMail.value, login_inputPassword.value);
                    let type = +(res === "Connected!"); // Le + convertit le binaire en int
                    Lib.showMsg(loginForm, res, type);
                    if(res === "Connected!"){ // Si le compte est crée on redirige 5s après !
                        let t = setTimeout(() => {
                            window.location.href = '/';
                            window.clearTimeout(t);
                        }, 2000);
                    }
                }else{
                    Lib.showMsg(loginForm, "Tous les champs ne sont pas remplis !", 0);
                }
            });

            registerForm.addEventListener("submit", async event => {
                event.preventDefault();
                if (register_inputPassword.value && register_inputPassword2.value && register_inputName.value && register_inputName.value) { // Si tous les champs sont remplis
                    if (register_inputPassword.value !== register_inputPassword2.value) { // Les deux mots de passes sont différents
                        Lib.showMsg(registerForm, "Les deux mots de passes sont différents !", 0);
                    } else { // Sinon on crée l'utilisateur
                        let res = await Logger.sendRegister(register_inputName.value, register_inputMail.value, register_inputPassword.value);
                        let type = +(res === "Compte crée !"); // Le + convertit le binaire en int
                        Lib.showMsg(registerForm, res, type);
                        if (res === "Compte crée !") { // Si le compte est crée on redirige 5s après !
                            let t = setTimeout(() => {
                                window.location.href = '/';
                                window.clearTimeout(t);
                            }, 2000);
                        }
                    }
                } else {
                    Lib.showMsg(registerForm, "Tous les champs ne sont pas remplis !", 0);
                }
            })
        }
    }
})();