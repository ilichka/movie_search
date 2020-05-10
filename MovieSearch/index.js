let items = document.querySelectorAll('.carusel .item');
let currentItem = 0;
let isEnabled = true;
let smth = 0;
let now = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    if (direction === 'to-left') {
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction);
        });
    } else {
        if (direction === 'to-right') {
            items[currentItem + 3].classList.add(direction);
            items[currentItem + 3].addEventListener('animationend', function () {
                this.classList.remove('active', direction);
            });
        }
    }
}

function hideCycleItem(direction) {
    isEnabled = false;
    if (direction === 'to-left') {
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('active', direction);
        });
    } else {
        if (direction === 'to-right') {
            items[currentItem - 10].classList.add(direction);
            items[currentItem - 10].addEventListener('animationend', function () {
                this.classList.remove('active', direction);
            });
        }
    }
}

function showItem(direction) {
    if (direction === 'from-right') {
        items[currentItem + 4].classList.add('next', direction);
        items[currentItem + 4].addEventListener('animationend', function () {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    } else {
        if (direction === 'from-left') {
            items[currentItem - 1].classList.add('next', direction);
            items[currentItem - 1].addEventListener('animationend', function () {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
        }
    }
}

function showCycleItem(direction) {
    if (direction === 'from-right') {
        items[currentItem - 9].classList.add('next', direction);
        items[currentItem - 9].addEventListener('animationend', function () {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    } else {
        if (direction === 'from-left') {
            items[currentItem - 1].classList.add('next', direction);
            items[currentItem - 1].addEventListener('animationend', function () {
                this.classList.remove('next', direction);
                this.classList.add('active');
                isEnabled = true;
            });
        }
    }
}

function moveItem(direction) {
    if (direction === 'to-left') {
        document.querySelectorAll('.active').forEach(key => {
            key.classList.add('to-left')
        });
        document.querySelectorAll('.active').forEach(key => {
            key.addEventListener('animationend', () => {
                key.classList.remove('to-left')
            })
        })
    } else {
        if (direction === 'to-right') {
            document.querySelectorAll('.active').forEach(key => {
                key.classList.add('to-right')
            });
            document.querySelectorAll('.active').forEach(key => {
                key.addEventListener('animationend', () => {
                    key.classList.remove('to-right')
                })
            })
        }
    }
}

function moveCycleItem(direction) {
    if (direction === 'to-left') {
        document.querySelectorAll('.active').forEach(key => {
            key.classList.add('to-left')
        });
        document.querySelectorAll('.active').forEach(key => {
            key.addEventListener('animationend', () => {
                key.classList.remove('to-left')
            })
        })
    } else {
        if (direction === 'to-right') {
            document.querySelectorAll('.active').forEach(key => {
                key.classList.add('to-right')
            });
            document.querySelectorAll('.active').forEach(key => {
                key.addEventListener('animationend', () => {
                    key.classList.remove('to-right')
                })
            })
        }
    }
}

function nextItem(n) {
    if (currentItem === 13) {
        currentItem = 0;
    }
    if (currentItem >= 9) {
        document.querySelector('.item__container').appendChild(document.querySelector('.item'));
        hideCycleItem('to-left');
        showCycleItem('from-right');
        moveCycleItem('to-left');
        currentItem++;
        console.log(1)
    } else {
        if (!now) {
            document.querySelector('.item__container').appendChild(document.querySelector('.item'));
        }
        hideItem('to-left');
        showItem('from-right');
        moveItem('to-left');
        currentItem++;
        now = false;
        /*changeCurrentItem(n + 1);*/
    }
    smth++;
}

function previousItem(n) {
    if (currentItem === 0) {
        currentItem = 13;
    }
    if (currentItem > 9) {
        document.querySelector('.item__container').prepend(document.querySelectorAll('.item')[12]);
        hideCycleItem('to-right');
        showCycleItem('from-left');
        moveCycleItem('to-right');
        currentItem--;
    } else {
        if (!now) {
            document.querySelector('.item__container').prepend(document.querySelectorAll('.item')[12])
        }
        hideItem('to-right');
        showItem('from-left');
        moveItem('to-right');
        currentItem--;
        now = false;
        /*changeCurrentItem(n - 1);*/
    }
}

document.querySelector('.left__arrow ').addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.right__arrow').addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem);
    }
});


/*function fetchApi() {
    let url = 'http://www.omdbapi.com/?apikey=42d95850';
    let promise = fetch(url);
    promise.then(response=>{
       return response.json();
    }).then(console.log)
    /!*alert(promise.ok);*!/
}

fetchApi();*/

const movies = [
    'Joker',
    'Sonnik',
    'Avengers',
    'The Intouchables',
    'Pikachu',
    'Shazam',
    'Aquaman',
    'Harry Potter',
    'Justice League',
    'lucky slevin number',
    'Bad Boys',
    'Real Steel',
    'pirates of the caribbean'
];

let focus = false;
let value;

function movieSearch() {
    value = document.querySelector('.input_text').value;
    if (value.length !== 0) {
        let regex = /*/${value}/*/ new RegExp(value, 'gi');
        let result = movies.filter(movies => movies.match(regex));
        document.querySelectorAll('.active').forEach(key => {
            key.classList.remove('active')
        });
        document.querySelectorAll('.movie__name-text').forEach(key => {
            let innertxt = key.innerHTML;
            for (let i = 0; i < 13; i++) {
                if (innertxt === result[i]) {
                    key.closest('.item').classList.add('active');
                    break;
                }
            }
        });
        document.querySelectorAll('.arrow').forEach(key => {
            key.classList.add('hidden')
        });
        console.log(result)
    }
}

function fucReturnPls() {
    let item = 0;
    document.querySelector('.input_text').value = '';
    document.querySelectorAll('.arrow').forEach(key => {
        key.classList.remove('hidden');
        document.querySelectorAll('.active').forEach(key => {
            key.classList.remove('active')
        });
        document.querySelectorAll('.item').forEach(key => {
            if (item < 4) {
                key.classList.add('active');
                item++;
            }
        });
        item = 0;
    })
}

document.querySelector('.input_text').addEventListener('focus', () => {
    focus = true;
    console.log(focus)
});

document.querySelector('.input_text').addEventListener('blur', () => {
    focus = false;
    console.log(focus)
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' && focus) {
        movieSearch();
        console.log(e.code);
    }
    if(e.code==='Backspace' && document.querySelector('.input_text').value.length === 0){
        fucReturnPls();
    }
});

document.querySelector('.search__cross').addEventListener('click', () => {
    /*let item = 0;
    document.querySelector('.input_text').value = '';
    document.querySelectorAll('.arrow').forEach(key => {
        key.classList.remove('hidden');
        document.querySelectorAll('.active').forEach(key => {
            key.classList.remove('active')
        });
        document.querySelectorAll('.item').forEach(key => {
            if (item < 4) {
                key.classList.add('active');
                item++;
            }
        });
        item = 0;
    })*/
    fucReturnPls();
});

document.querySelector('.search__btn').addEventListener('click', () => {
    movieSearch();
});