let shipManager = (function () {
    let canPlaceShip = (size, column, line, rotated) => {
        let retour = true;
        for (let i = 0; i < size + 1; i++){
            if (rotated){
                if (document.getElementById((column + i) + '-' + line) === null){
                    retour = false;
                }else{
                    let e = document.getElementById((column + i) + '-' + line);
                    if (e.getAttribute('used') !== null){
                        retour = false;
                    }
                }
            }else{
                if (document.getElementById(column + '-' + (line + i)) === null){
                    retour = false;
                }else{
                    let e = document.getElementById(column + '-' + (line + i));
                    if (e.getAttribute('used') !== null){
                        retour = false;
                    }
                }
            }
        }
        return retour;
    }
    let placeShip = (ship, size, startColumn, startLine, rotated) => {
        let color = ['black', 'red', 'orange', 'blue', 'gray'];

        for (let i = 0; i < size + 1; i++) {
            let column, line;

            if (rotated){
                column = startColumn + i;
                line = startLine;
            }else{
                column = startColumn;
                line = startLine + i;
            }

            let gridCase = document.getElementById(column + "-" + line);
            gridCase.style.background = gridCase.style.background === color[size] ? "" : color[size];
            gridCase.setAttribute('ship', ship);
            gridCase.setAttribute('size', size);
            if(rotated){
                gridCase.setAttribute('direction', 'east')
            }
            else {
                gridCase.setAttribute('direction', 'north');
            }
            gridCase.setAttribute('positionX', startLine);
            gridCase.setAttribute('positionY', startColumn);
            gridCase.setAttribute('used', '');
        }
    }
    let resetGrid = (isPlaced, shipName) => {
        let buttons = document.querySelectorAll("div#ship-container > button");
        for (let e of buttons){
            e.disabled = false;
        }
        for (let i = 0; i < isPlaced.length; i++){
            isPlaced[i] = false;
        }
        let gridCases = document.querySelectorAll("div#ship-placement > div.case-board");
        for (let e of gridCases){
            if (e.getAttribute("used") !== null){
                e.removeAttribute("used");
                e.removeAttribute("style");
                for (let name of shipName){
                    e.removeAttribute(name);
                }
            }
        }
        return "";

    }
    return {
        init(shipName){

            let table = document.querySelectorAll("div#ship-placement> div");
            let rotateButton = document.getElementById("rotate");
            let reset = document.getElementById("reset");
            let isPlaced = [false, false, false, false, false];
            let ship = "";
            let rotate = false;

            rotateButton.addEventListener("click", () => {
                rotate = !rotate;
                rotateButton.style.background = rotate ? "green" : "";
            });

            reset.addEventListener("click", (event) => {
                ship = resetGrid(isPlaced, shipName);
            });

            shipName.forEach((name) => {
                let e = document.getElementById(name);
                e.addEventListener("click", (event) => {
                    console.log(event.target.textContent);
                    ship = event.target.textContent;
                });
            });

            table.forEach((e) => {
                e.addEventListener("click", (event) => {
                    if (ship !== "") {
                        let size = shipName.indexOf(ship);
                        if (!isPlaced[size]) {
                            let indexCase = event.target.id;
                            indexCase = indexCase.split("-");
                            let column = parseInt(indexCase[0]);
                            let line = parseInt(indexCase[1]);

                            if (canPlaceShip(size, column, line, rotate)) {
                                placeShip(ship, size, column, line, rotate);
                                let button = document.getElementById(ship);
                                button.disabled = true;
                                isPlaced[size] = true;
                            }
                        }
                    }
                });
            });
        },
        getMap() {
            let table = document.getElementById("ship-placement");
            let shipsPlaced = [];
            for (let i = 0; i < table.children.length; i++){
                let attribute = [table.children[i].getAttribute("ship"), parseInt(table.children[i].getAttribute("size")) + 1, table.children[i].getAttribute("direction"), String(table.children[i].getAttribute("positionX")) + '-' + String(table.children[i].getAttribute("positionY"))]
                if(shipsPlaced.length === 0 && attribute[0] !== null){
                    shipsPlaced.push(attribute)
                }
                let notHere = false;
                for (let i = 0; i < shipsPlaced.length; i++){
                    if(shipsPlaced[i][0] === attribute[0]){
                        notHere = true;
                    }
                }
                if(!notHere){
                    shipsPlaced.push(attribute);
                }
            }
            shipsPlaced = shipsPlaced.filter(element => element[0] !== null);
            return shipsPlaced;
        }
    }

})();

