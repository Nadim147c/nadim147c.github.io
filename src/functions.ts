const setText = (element: HTMLHeadingElement, str: string) => {
    element.innerText = str
    element.style.animation = "none"
    setTimeout(() => (element.style.animation = null))
}

const getTime = () => parseFloat(`${new Date().valueOf()}.${new Date().getMilliseconds()}`)

const getDeg = (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
