const setText = (element, str) => {
    element.innerText = str;
    element.style.animation = "none";
    setTimeout(() => (element.style.animation = null));
};
const getMiddlePoint = (x1, y1, x2, y2) => [(x1 + x2) / 2, (y1 + y2) / 2];
const formatTime = () => parseFloat(`${new Date().valueOf()}.${new Date().getMilliseconds()}`);
const getDeg = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
//# sourceMappingURL=functions.js.map