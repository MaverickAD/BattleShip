let Logger = (function () {
    async function postLog(pseudo, email, password, url){
        return await $.ajax({
            type: "POST",
            url: url,
            data: {
                pseudo: pseudo,
                email: email,
                password: password
            },
        });
    }

    return{
        async sendLogin(email, password){
            return await postLog("", email, password, "/login");
        },
        async sendRegister(pseudo, email, password){
            return await postLog(pseudo, email, password, "/register");
        }
    }
})();