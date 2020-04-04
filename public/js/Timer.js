export default class Timer {
    constructor(deltaTime=1/60) {


        let lastTime = 0;
        let accumulatedTime = 0;
        this.shouldTimerStop = false;

        this.updateProxy = (time) => { 

            if(this.shouldTimerStop) {
                return;
            }

            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        }

    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    stop() {
        this.shouldTimerStop = true;
    }
}
