console.log('hello');

var grid = document.getElementById('grid');
var table = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var moved = true;

var score = 0;

function spawn() {
    if (moved) {
        score += 1;
        let x;
        let y;
        do {
            x = Math.floor(Math.random() * (3 - 0 + 1));
            y = Math.floor(Math.random() * (3 - 0 + 1));
        } while (!isEmpty(x, y));
        table[x][y] = 2;
        moved = false;
    }
}


function draw() {
    spawn();
    grid.innerHTML = '';
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            var cell = table[x][y];
            let child = document.createElement('div');

            child.classList.add('cell');
            child.classList.add('v' + cell);
            if (cell !== 0) {
                child.innerHTML = cell;
            }
            grid.appendChild(child);
        }
    }
    updateScore();
}

function updateScore() {
    document.getElementById('score').innerHTML = score;
}

function moveUp() {
    for (let x = 0; x < table.length; x++) {
        for (let y = 1; y < table[x].length; y++) {
            const cell = table[x][y];
            let offset = 0;
            while (!isEmpty(x, y) && isEmpty(x, y - offset - 1)) {
                moved = true;
                if (canMerge(x, y, x, y - offset - 1)) {
                    table[x][y - offset - 1] = table[x][y - offset - 1] + table[x][y];
                    table[x][y] = 0;
                    offset = 0;
                    score += 2;
                } else {
                    offset += 1;
                }

            }
            if (offset) {
                table[x][y - offset] = cell;
                table[x][y] = 0;
            }
        }
    }
    draw();
}

function moveDown() {
    for (let y = table.length - 1; y >= 0; y--) {
        for (let x = 0; x < table.length; x++) {
            const cell = table[x][y];
            let offset = 0;
            while (!isEmpty(x, y) && (isEmpty(x, y + offset + 1) || canMerge(x, y, x, y + offset + 1))) {
                moved = true;
                if (canMerge(x, y, x, y + offset + 1)) {
                    table[x][y + offset + 1] = table[x][y + offset + 1] + table[x][y];
                    table[x][y] = 0;
                    offset = 0;
                    score += 2;
                } else {
                    offset += 1;
                }
            }
            if (offset) {
                table[x][y + offset] = cell;
                table[x][y] = 0;
            }
        }
    }
    draw();
}

function moveRight() {
    for (let y = 0; y < 4; y++) {
        for (let x = 2; x >= 0; x--) {
            const cell = table[x][y];
            let offset = 0;
            while (!isEmpty(x, y) && (isEmpty(x + offset + 1, y) || canMerge(x, y, x + offset + 1, y))) {
                moved = true;
                if (canMerge(x, y, x + offset + 1, y)) {
                    table[x + offset + 1][y] = table[x + offset + 1][y] + table[x][y];
                    table[x][y] = 0;
                    offset = 0;
                    score += 2;
                } else {
                    offset += 1;
                }
            }
            if (offset) {
                table[x + offset][y] = cell;
                table[x][y] = 0;
            }
        }
    }
    draw();
}
function moveLeft() {
    for (let y = 0; y < table.length; y++) {
        for (let x = 1; x < table[y].length; x++) {
            const cell = table[x][y];
            let offset = 0;
            while (!isEmpty(x, y) && (isEmpty(x - offset - 1, y) || canMerge(x, y, x - offset - 1, y))) {
                moved = true;
                if (canMerge(x, y, x - offset - 1, y)) {
                    table[x - offset - 1][y] = table[x - offset - 1][y] + table[x][y];
                    table[x][y] = 0;
                    offset = 0;
                    score += 2;
                } else {
                    offset += 1;
                }
            }
            if (offset) {
                table[x - offset][y] = cell;
                table[x][y] = 0;
            }
        }
    }
    draw();
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown':
            moveDown()
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;

        default:
            break;
    }
});

draw();
console.log(table)


function isEmpty(x, y) {
    if (x > 3 || y > 3 || x < 0 || y < 0) {
        return false;
    }
    return table[x][y] === 0;
}

function canMerge(x, y, x2, y2) {
    if (x > 3 || x < 0 || y > 3 || y < 0 || x2 > 3 || x2 < 0 || y2 < 0 || y2 > 3) {
        return false;
    }
    if (!isEmpty(x, y) && !isEmpty(x2, y2)) {
        return table[x][y] === table[x2][y2];
    } else {
        return false;
    }
}