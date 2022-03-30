const makeBoard = require("./makeBoard.js");

class Ship {
    constructor(name, size, direction, life){
        this.name = name;
        this.size = size;
        this.direction = direction;
        this.life = life;
    }

    get getName(){
        return this.name;
    }

    get getSize(){
        return this.size;
    }

    get getDirection(){
        return this.direction;
    }

    get getLife(){
        return this.life;
    }
}

class Game {
    constructor(){
        this.shipBoardPlayer1 = makeBoard();
        this.shipBoardPlayer2 = makeBoard();

        this.weaponBoardPlayer1 = makeBoard();
        this.weaponBoardPlayer2 = makeBoard();

        this.allShipPlayer1 = []
        this.allShipPlayer2 = []
    }

    getShipBoard(player){
        if(player === 1){
            return this.shipBoardPlayer1
        }
        else if(player === 2){
            return this.shipBoardPlayer2;
        }
    }

    getWeaponBoard(player){
        if(player === 1){
            return this.weaponBoardPlayer1
        }
        else if(player === 2){
            return this.weaponBoardPlayer2;
        }
    }

    getAllShip(player){
        if(player === 1){
            return this.allShipPlayer1
        }
        else if(player === 2){
            return this.allShipPlayer2;
        }
    }

    displayShipBoard(player){
        if(player === 1){
            console.log("Player 1 - Ship");
            console.table(this.shipBoardPlayer1);
        }
        else if(player === 2){
            console.log("Player 2 - Ship");
            console.table(this.shipBoardPlayer2);
        }
    }

    displayWeaponBoard(player){
        if(player === 1){
            console.log("Player 1 - Weapon");
            console.table(this.weaponBoardPlayer1);
        }
        else if(player === 2){
            console.log("Player 2 - Weapon");
            console.table(this.weaponBoardPlayer2);
        }
    }

    displayPlayer(player){
        this.displayShipBoard(player);
        this.displayWeaponBoard(player);
    }

    positionShipIsPossible(player, X, Y, ship){
        let possible = true;
        let iterator = 0;
        switch (ship.getDirection) {
            case 'north':
                if(X - 1 + ship.getSize > 10){
                    possible = false;
                    console.log("false");
                }
                while(iterator !== ship.getSize && possible !== false){
                    if(player === 1){
                        if(this.shipBoardPlayer1[X - 1 + iterator][Y - 1] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                    else if(player === 2){
                        if(this.shipBoardPlayer2[X - 1 + iterator][Y - 1] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                }
                break;
            case 'south':
                if(X - ship.getSize < 0){
                    possible = false;
                    console.log("false");
                }
                while(iterator !== ship.getSize && possible !== false){
                    if(player === 1){
                        if(this.shipBoardPlayer1[X - 1 - iterator][Y - 1] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                    else if(player === 2){
                        if(this.shipBoardPlayer2[X - 1 - iterator][Y - 1] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                }
                break;
            case 'east':
                if(Y - 1 + ship.size > 10){
                    possible = false;
                    console.log("false");
                }
                while(iterator !== ship.getSize && possible !== false){
                    if(player === 1){
                        if(this.shipBoardPlayer1[X - 1][Y - 1 + iterator] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                    else if(player === 2){
                        if(this.shipBoardPlayer2[X - 1][Y - 1 + iterator] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                }
                break;
            case 'west':
                if(Y - ship.getSize < 0){
                    possible = false;
                    console.log("false");
                }
                while(iterator !== ship.getSize && possible !== false){
                    if(player === 1){
                        if(this.shipBoardPlayer1[X - 1][Y - 1 - iterator] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                    else if(player === 2){
                        if(this.shipBoardPlayer2[X - 1][Y - 1 - iterator] === 1){
                            possible = false;
                        }
                        iterator += 1;
                    }
                }
                break;
        }
        return possible;
    }

    positionShip(player, X, Y, ship){
        if(this.positionShipIsPossible(player, X, Y, ship)){
            let allPos = []
            switch (ship.getDirection) {
                case 'north':
                    if(player === 1){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer1[X - 1 + i][Y - 1] = 1;
                            allPos.push([X - 1 + i, Y - 1]);
                        }
                        this.allShipPlayer1.push({player: player, ship: ship, allPos: allPos});
                    }
                    else if(player === 2){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer2[X - 1 + i][Y - 1] = 1;
                            allPos.push([X - 1 + i, Y - 1]);
                        }
                        this.allShipPlayer2.push({player: player, ship: ship, allPos: allPos});
                    }
                    break;
                case 'south':
                    if(player === 1){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer1[X - 1 - i][Y - 1] = 1;
                            allPos.push([X - 1 - i, Y - 1]);
                        }
                        this.allShipPlayer1.push({player: player, ship: ship, allPos: allPos});
                    }
                    else if(player === 2){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer2[X - 1 - i][Y - 1] = 1;
                            allPos.push([X - 1 - i, Y - 1]);
                        }
                        this.allShipPlayer2.push({player: player, ship: ship, allPos: allPos});
                    }
                    break;
                case 'east':
                    if(player === 1){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer1[X - 1][Y - 1 + i] = 1;
                            allPos.push([X - 1, Y - 1 + 1]);
                        }
                        this.allShipPlayer1.push({player: player, ship: ship, allPos: allPos});
                    }
                    else if(player === 2){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer2[X - 1][Y - 1 + i] = 1;
                            allPos.push([X - 1, Y - 1 + 1]);
                        }
                        this.allShipPlayer2.push({player: player, ship: ship, allPos: allPos});
                    }
                    break;
                case 'west':
                    if(player === 1){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer1[X - 1][Y - 1 - i] = 1;
                            allPos.push([X - 1, Y - 1 - 1]);
                        }
                        this.allShipPlayer1.push({player: player, ship: ship, allPos: allPos});
                    }
                    else if(player === 2){
                        for(let i = 0; i < ship.size; i++){
                            this.shipBoardPlayer2[X - 1][Y - 1 - i] = 1;
                            allPos.push([X - 1, Y - 1 - 1]);
                        }
                        this.allShipPlayer2.push({player: player, ship: ship, allPos: allPos});
                    }
                    break;
                default:
                    console.log('error');
                    break;
            }
        }
        else{
            console.log("Cannot place " + ship.getName + " a ship like this !");
        }
    }

    checkAttackMissile(player, X, Y){
        if(player === 1){
            if(this.shipBoardPlayer2[X - 1][Y - 1] === 1){
                this.shipBoardPlayer2[X - 1][Y - 1] = 2;
                this.weaponBoardPlayer1[X - 1][Y - 1] += '-G';
            }
        }
        else if(player === 2){
            if(this.shipBoardPlayer1[X - 1][Y - 1] === 1){
                this.shipBoardPlayer1[X - 1][Y - 1] = 2;
                this.weaponBoardPlayer2[X - 1][Y - 1] += '-G';
            }
        }
    }

    checkRadar(player, X, Y) {
        if (player === 1) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    console.log(String(X - 1 + i) + '-' + String(Y - 1 + j));
                    console.log(this.shipBoardPlayer2[X - 1 + i][Y - 1 + j])
                    if (this.shipBoardPlayer2[X - 1 + i][Y - 1 + j] === 1) {
                        this.weaponBoardPlayer1[X - 1 + i][Y - 1 + j] += '-G';
                    }
                }
            }
        } else if (player === 2) {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    console.log(String(X - 1 + i) + '-' + String(Y - 1 + j));
                    console.log(this.shipBoardPlayer1[X - 1 + i][Y - 1 + j])
                    if (this.shipBoardPlayer1[X - 1 + i][Y - 1 + j] === 1) {
                        this.weaponBoardPlayer2[X - 1 + i][Y - 1 + j] += '-G';
                    }
                }
            }
        }
    }

    checkFragMissile(player, X, Y){
        if(player === 1){
            for (let i = -1; i < 2 ; i++) {
                if(this.shipBoardPlayer2[X - 1 + i][Y - 1] === 1){
                    this.shipBoardPlayer2[X - 1 + i][Y - 1] = 2;
                    this.weaponBoardPlayer1[X - 1 + i][Y - 1] += '-G';
                }

                if(this.shipBoardPlayer2[X - 1][Y - 1 + i] === 1){
                    this.shipBoardPlayer2[X - 1][Y - 1 + i] = 2;
                    this.weaponBoardPlayer1[X - 1][Y - 1 + i] += '-G';
                }
            }
        }
        else if(player === 2){
            for (let i = -1; i < 2 ; i++) {
                if(this.shipBoardPlayer1[X - 1 + i][Y - 1] === 1){
                    this.shipBoardPlayer1[X - 1 + i][Y - 1] = 2;
                    this.weaponBoardPlayer2[X - 1 + i][Y - 1] += '-G';
                }
                if(this.shipBoardPlayer1[X - 1][Y - 1 + i] === 1){
                    this.shipBoardPlayer1[X - 1][Y - 1 + i] = 2;
                    this.weaponBoardPlayer2[X - 1][Y - 1 + i] += '-G';
                }
            }
        }
    }

    checkTorpedoMissile(player, X, Y){
        if(player === 1){
            if(this.shipBoardPlayer2[X - 1][Y - 1] === 1){
                for(let i = -4; i < 5; i++){
                    for(let j = -4; j < 5; j++){
                        console.log(String(X - 1 + i) + '-' + String(Y - 1 + j) + ' ||| ' + String(X + i) + '-' + String(Y + j));
                        console.log(this.shipBoardPlayer2[X - 1 + i][Y - 1 + j])
                    }
                }
            }
        }
        else if(player === 2){

        }
    }

    attackMissile(player, X, Y){
        if(player === 1){
            this.weaponBoardPlayer1[X - 1][Y - 1] = "M";
        }
        else if(player === 2){
            this.weaponBoardPlayer2[X - 1][Y - 1] = "M";
        }
        this.checkAttackMissile(player, X, Y);
    }

    radar(player, X, Y){
        if(player === 1){
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    this.weaponBoardPlayer1[X - 1 + i][Y - 1 + j] = "R"
                }
            }
        }
        else if(player === 2){
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    this.weaponBoardPlayer2[X - 1 + i][Y - 1 + j] = "R"
                }
            }
        }
        this.checkRadar(player, X, Y);
    }

    fragMissile(player, X, Y){
        if(player === 1){
            for(let i = -1; i < 2; i++){
                this.weaponBoardPlayer1[X - 1 + i][Y - 1] = "F"
                this.weaponBoardPlayer1[X - 1][Y - 1 + i] = "F"
            }
        }
        else if(player === 2){
            for(let i = -1; i < 2; i++){
                this.weaponBoardPlayer2[X - 1 + i][Y - 1] = "F"
                this.weaponBoardPlayer2[X - 1][Y - 1 + i] = "F"
            }
        }
        this.checkFragMissile(player, X, Y);
    }

    torpedoMissile(player, X, Y){
        if(player === 1){
            this.weaponBoardPlayer1[X - 1][Y - 1] = "T";
        }
        else if(player === 2){
            this.weaponBoardPlayer2[X - 1][Y - 1] = "T";
        }
        this.checkTorpedoMissile(player, X, Y);
    }
}

module.exports = { Ship, Game };