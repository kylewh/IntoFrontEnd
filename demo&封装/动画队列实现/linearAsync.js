// simple polyfill
function timeNow() {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    }
    return Date.now() ? Date.now() : (+new Date());
}

if (typeof window.requestAnimationFrame === 'undefined') {
    window.requestAnimationFrame = function (callback) {
        return setTimeout(function () {
            callback.call(this, timeNow());
        }, 1000 / 60);
    };
}


class Animator {

    constructor(duration, update, easing) {
        this.duration = duration;
        this.update = update;
        this.easing = easing || function (q) {
            return q;
        };
    }

    animate() {
        let startTime = 0,
            duration = this.duration,
            update = this.update,
            easing = this.easing,
            self = this;

        return new Promise((resolve, reject) => {
            let id = 0;

            function step(timestamp) {
                //timestamp is the parameter that requestAnimationFrame will passed in.
                //It's actually a DOMHighResTimeStamp: The unit is milliseconds and should be accurate to 5 µs (microseconds).
                startTime = startTime || timestamp;
                self.p = Math.min(1.0, (timestamp - startTime) / duration);
                update.call(self, easing ? easing(self.p) : self.p, self.p);

                if (self.p < 1.0) {
                    id = requestAnimationFrame(step);
                } else {
                    //reject('canceled')
                    resolve(self);
                }
            }

            self.cancel = () => {
                cancelAnimationFrame(id);
                update.call(self, easing ? easing(self.p) : self.p);
                // update.call(self, 0, 0); //reset;
                resolve(self);
            };

            id = requestAnimationFrame(step);
        });

    }

    updateEase(newEasing) {
        return new Animator(this.duration, this.update, newEasing);
    }
}

const view = [];

var boxs = document.getElementsByClassName('box'),
    len = boxs.length;

for (var i = 0; i < len; i++) {
    view[i] = boxs[i];
}


let a1 = new Animator(2000, function (easedp) {
    let distance = 600;
    view[0].style.transform = `translateX(${easedp*distance}px) rotateY(${360*easedp}deg)`;
})

let a2 = new Animator(2000, function (easedp) {
    let distance = 600;
    view[1].style.transform = `translateX(${easedp*distance}px) rotateY(${360*easedp}deg)`;
}, function (p) {
    return p * p;
});

let a3 = new Animator(2000, function (easedp) {
    let distance = 600;
    view[2].style.transform = `translateX(${easedp*distance}px) rotateY(${360*easedp}deg)`;
}, function (p) {
    return p * (2 - p);
});

view.forEach(function (ele, idx) {
    ele.addEventListener('click', function () {
        console.log(idx);
        [a1, a2, a3][idx].cancel();
    });
});



let go = function* () {
    for (let i = 0, task; task = [a1, a2, a3][i++];) {
        let temp = yield task.animate();
    }
};

function run(gen) {
    var g = gen();
    function next(res) {
        var result = g.next(res);
        if (result.done) return result.value;
        result.value.then(function (res) {
            next(res);
        });
    }
    next();
}

run(go);