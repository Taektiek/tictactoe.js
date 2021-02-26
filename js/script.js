const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const margin = 10;

ctx.fillStyle = 'white';

ctx.font = '230px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

canvas.addEventListener('mousedown', onMouseDown, false);

let p1 = 'x';
let p2 = 'o';

var currentPlayer = p1;

let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

winner = 0;

ctx.clearRect(0, 0, canvas.width, canvas.height);

function checkWin() {
    let rows = [
        [grid[0][0], grid[0][1], grid[0][2]],
        [grid[1][0], grid[1][1], grid[1][2]],
        [grid[2][0], grid[2][1], grid[2][2]],
    ];
    let columns = [
        [grid[0][0], grid[1][0], grid[2][0]],
        [grid[0][1], grid[1][1], grid[2][1]],
        [grid[0][2], grid[1][2], grid[2][2]],
    ];
    let diagonals = [
        [grid[0][0], grid[1][1], grid[2][2]],
        [grid[2][0], grid[1][1], grid[0][2]],
    ];

    let lines = rows.concat(columns).concat(diagonals);

    if (lines.findIndex(l => _.isEqual(l, [p1, p1, p1]))!=-1) {
        winner = p1;
    } else if (lines.findIndex(l => _.isEqual(l, [p2, p2, p2]))!=-1) {
        winner = p2;
    }
}

function showWinScreen() {
    ctx.globalAlpha = 0.93;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(winner + " won! Refresh to play again.", canvas.width/2, canvas.height/2);
}

function onMouseDown(event) {
    if (winner == 0) {
        let rect = canvas.getBoundingClientRect();

        let gridCoords = [Math.floor((event.clientX - rect.left) / canvas.width*3), Math.floor((event.clientY - rect.top) / canvas.width*3)];

        if (!(grid[gridCoords[1]][gridCoords[0]] == p1 || grid[gridCoords[1]][gridCoords[0]] == p2)) {

            grid[gridCoords[1]][gridCoords[0]] = currentPlayer;

            checkWin();

            if (winner != 0){
                showWinScreen();
            } else {
                if (currentPlayer == p1) {currentPlayer = p2}
                else if (currentPlayer == p2) {currentPlayer = p1};

                ctx.fillStyle = '#fff';
                drawGrid();
                ctx.fillStyle = '#000';
                drawSymbols();
            }
        }
    }
}

function drawGrid() { 
    for (let i=0; i < 3; i++) {
        for (let j=0; j < 3; j++) {
            ctx.fillRect(margin + i*(margin + (canvas.width-4*margin)/3), margin + j*(margin + (canvas.width-4*margin)/3), (canvas.width-4*margin)/3, (canvas.width-4*margin)/3);
        }
    }
}

function drawSymbols() { 
    for (let i=0; i < 3; i++) {
        for (let j=0; j < 3; j++) {
            if (grid[j][i] == 'x') {
                ctx.fillText('X', margin + (i+0.5)*(margin + (canvas.width-4*margin)/3), margin + (j+0.57)*(margin + (canvas.width-4*margin)/3));
            } else if (grid[j][i] == 'o') {
                ctx.fillText('O', margin + (i+0.5)*(margin + (canvas.width-4*margin)/3), margin + (j+0.57)*(margin + (canvas.width-4*margin)/3));
            }
        }
    }
}

ctx.globalAlpha = 1;
drawGrid();
ctx.fillStyle= '#000';
drawSymbols();