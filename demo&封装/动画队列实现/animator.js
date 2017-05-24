// simple polyfill
function timeNow() {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    }
    return Date.now() ? Date.now() : (+new Date());
}

if (typeof global.requestAnimationFrame === 'undefined') {
    global.requestAnimationFrame = function (callback) {
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
            return q
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

            let step = (timeStamp) => {
                startTime = startTime || timeStamp;
                let p = Math.min(1.0, (timeStamp - startTime) / duration);
                update.call(self, easing ? easing(p) : p, p);
                if (p < 1.0) {
                    id = requestAnimationFrame(step);
                } else {
                    resolve(self);
                }
            };
        });

        self.cancel = () => {
            cancelAnimationFrame(id);
            update.call(self, 0, 0); //reset;
            reject('Cancled');
        };
    }

    updateEase(newEasing) {
        return new Animator(this.duration, this.update, newEasing);
    }
}

module.exports = Animator;