let Lib = (function () {

    return{
        showMsg(element, msg, success){
            success = success === 0 ? 'alert alert-danger' : 'alert alert-success';
            let elem = document.getElementById('alert');
            if (elem === null){
                elem = document.createElement('div');
                elem.setAttribute('class', success);
                elem.setAttribute('role', 'alert');
                elem.setAttribute('id', 'alert');
                elem.textContent = msg;
                element.appendChild(elem);
            }else{
                elem.removeAttribute('class');
                elem.setAttribute('class', success);
                elem.textContent = msg;
            }

        },
        getCookieValue(string, id){
            let value = "";
            string = string.split(";");
            for (let data of string){
                data = data.split("=");
                if (data[0].trim() === id){
                    value = data[1];
                }
            }
            return value;
        },
        createBoardSecond(table, copy){
            let x = 0;
            let y = 0;
            for(let i = 0; i < (10 * 10); i++){
                let div = document.createElement('div');
                div.classList.add("case-board");
                if(i % 10 === 0){
                    x = 0;
                    y++;
                }
                x++;
                div.id = String(x) + "-" + String(y);

                if(copy[x - 1][y - 1] !== 0){
                    if (copy[x - 1][y - 1] === 1){
                        div.style.background = 'gray';
                    }
                }
                table.appendChild(div);
            }
        },
        createBoard(table){
            console.log("I'm in createBoard")
            let x = 0;
            let y = 0;
            for(let i = 0; i < (10 * 10); i++){
                let div = document.createElement('div');
                div.classList.add("case-board");
                if(i % 10 === 0){
                    x = 0;
                    y++;
                }
                x++;
                div.id = String(x) + "-" + String(y);

                table.appendChild(div);
            }
        },
        createShipContainer(table, shipName){
            console.log("I'm in createShipContainer");

            shipName.unshift("rotate");
            shipName.push("reset");
            shipName.push("ready");

            for (let i = 0; i < shipName.length; i++){
                let button = document.createElement("button");
                button = document.createElement("button");
                button.textContent = shipName[i];
                button.setAttribute("id", shipName[i]);
                table.appendChild(button);
            }

            shipName.shift();
            shipName.pop();
            shipName.pop();

        },
        createWeaponContainer(table){
            let name = ['M', 'R', 'F', 'T'];
            for (let i = 0; i < 4; i++){
                let div = document.createElement('div');
                div.classList.add("weapon-case")

                div.id = name[i];

                div.textContent = name[i];

                table.appendChild(div);
            }
        }
    }

})();