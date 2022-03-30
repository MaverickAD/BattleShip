function makeBoard() {
    let table = new Array(10);
    for(let i = 0; i < 10; i++){
        table[i] = new Array(10);
    }
    for(let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            table[i][j] = 0;
        }
    }
    return table;
}

module.exports = makeBoard ;