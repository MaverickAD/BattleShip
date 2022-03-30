let Logout = (function (){
    return {
        init(){
            let p = document.createElement("p");
            let div = document.getElementById("text");
            let card = document.getElementById("formCard");

            card.parentNode.removeChild(card);

            let cookie = decodeURIComponent(document.cookie);
            p.textContent = "Bonjour, " + Lib.getCookieValue(cookie, "username") + ". Tu as l'id " + Lib.getCookieValue(cookie, "id");
            div.appendChild(p);

            let button = document.createElement("button");
            let form = document.createElement("form");
            form.setAttribute("action", " ");
            form.appendChild(button);
            button.setAttribute("action", "submit");
            button.textContent = "log out";
            div.appendChild(form);

            form.addEventListener("submit", event => {
                event.preventDefault();
                document.cookie = "username=; expires = Thu, 01 Jan 1970 00:00:00 GMT"; // Technique chelou mais ça marche ...
                document.cookie = "id=; expires = Thu, 01 Jan 1970 00:00:00 GMT"; // Technique chelou mais ça marche ...
                window.location.href = '/session';
            });
        }
    }
})();