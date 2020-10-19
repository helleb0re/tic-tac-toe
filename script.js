let cells = document.querySelectorAll('.cell div');
let board = document.querySelector('.main');
let restart = document.querySelector('.restart');
let textWinner = document.querySelector('.text_winner');
const indexOfCheck = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
let start = 1;
let i = start;
let a = '';

// main function for game

board.addEventListener('click', (event) => {
    if (!(event.target.classList.contains('x') || event.target.classList.contains('o'))
        && !event.target.classList.contains('cell') && !event.target.classList.contains('main')) {
        if (event.target.classList.contains('restart')) {
            if (board.classList.contains('win')) {
                board.classList.remove('win');
                addOrRemClassWin(a, cells, 1);
            } else {
                board.classList.remove('tie');
            }
            restartFunc(cells);
            hideTextWinner(textWinner);
            restart.style.display = 'none';
        } else {
            if (i % 2) {
                event.target.classList.add('x');
            } else {
                event.target.classList.add('o');
            }
            a = checkWin(indexOfCheck, cells);
            i++;
            if (a) {
                i = i % 2;
                start = i;
                addOrRemClassWin(a, cells);
                if (cells[a[0]].classList.value === 'x') {
                    textWinner.querySelector("[id='1']").classList.remove('hide');
                } else {
                    textWinner.querySelector("[id='2']").classList.remove('hide');
                }
                board.classList.add('win');
                restart.style.display = 'block';
            }
            if ((start === 1 && i === 10) || (start === 0 && i === 9)) {
                i = i % 2;
                start = i;
                textWinner.querySelector("[id='3']").classList.remove('hide');
                board.classList.add('tie');
                restart.style.display = 'block';
            }
        }
    }
});

// checking the winning condition

function checkWin(indexes, arr) {
    for (let i of indexes) {
        if (arr[i[0]].classList.value === arr[i[1]].classList.value
            && arr[i[1]].classList.value === arr[i[2]].classList.value
            && arr[i[0]].classList.value !== ''
            && arr[i[1]].classList.value !== ''
            && arr[i[2]].classList.value !== '') {
            return i;
        }
    }
    return false;
}

// restart

function restartFunc(arr) {
    arr.forEach((item) => {
        if (item.classList.value) {
            item.classList.remove(item.classList.value);
        }
    });
}

// add class for winner cells

function addOrRemClassWin(indexes, arr, key = 0) {
    if (key) {
        for (let i of indexes) {
            arr[i].parentElement.classList.remove('win');
        }
    } else {
        for (let i of indexes) {
            arr[i].parentElement.classList.add('win');
        }
    }
}

// text for winner

function hideTextWinner(parentElem) {
    parentElem.querySelectorAll('.variant').forEach((item) => {
        if (!item.classList.contains('hide')) {
            item.classList.add('hide');
        }
    })
}