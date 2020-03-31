export function createAnim(frames, frameLen) {
    return function resolveFrame(distance) {
         
        if (frames.length === 1) {
            return frames[0];
        }

        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    }
}
