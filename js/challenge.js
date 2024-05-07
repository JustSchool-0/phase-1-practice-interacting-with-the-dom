function incrementCounter() {
    const counter = document.querySelector("#counter");
    const parsed = parseInt(counter.innerText);
    counter.innerText = `${parsed + 1}`;
}

function decrementCounter() {
    const counter = document.querySelector("#counter");
    const parsed = parseInt(counter.innerText);
    counter.innerText = `${parsed - 1}`;
}

function toConsumableArray(a) {
    if (Array.isArray(a)) {
        let c = Array(a.length);
        for (let b = 0; b < a.length; b++) {
            c[b] = a[b];
        }
        return c;
    }
    return Array.from(a);
}

const timer = function () {
    return setInterval(function () {
        incrementCounter();
    }, 1000);
};

let playing = true;
let interval = timer();

const minus = document.querySelector("#minus"),
    plus = document.querySelector("#plus"),
    heart = document.querySelector("#heart"),
    pause = document.querySelector("#pause"),
    commentForm = document.getElementsByTagName('form')[0];

minus.addEventListener('click', function () {
    decrementCounter();
});

plus.addEventListener('click', function () {
    incrementCounter();
});

heart.addEventListener('click',
    function () {
        const a = document.querySelector('#counter');
        const b = parseInt(a.innerText);
        const c = document.querySelector('.likes');
        let d;
        if (
            []
                .concat(toConsumableArray(c.children))
                .map(function (a) {
                    return parseInt(a.dataset.num);
                })
                .includes(b)
        ) {
            d = document.querySelector('[data-num="' + b + '"]');
            const e = parseInt(d.children[0].innerText);
            d.innerHTML = b + " has been liked <span>" + (e + 1) + "</span> times";
        } else {
            d = document.createElement("li");
            d.setAttribute("data-num", `${b}`);
            d.innerHTML = b + " has been liked <span>1</span> time";
            c.appendChild(d);
        }
    });

pause.addEventListener('click', function () {
    if (playing) {
        playing = false;
        clearInterval(interval);
        this.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        this.innerText = "pause";
    }
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.id === 'pause') {
            continue;
        }
        button.disabled = !playing;
    }
});

commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const b = this.children[0];
    const c = b.value;
    b.value = "";
    const d = document.querySelector('.comments'),
        e = document.createElement('p');
    e.innerText = c;
    d.appendChild(e);
});