const title = document.querySelector(".title") as HTMLHeadingElement
const username = document.querySelector(".username") as HTMLHeadingElement
const links = document.querySelector(".links") as HTMLDivElement
const trailer = document.querySelector(".trailer") as HTMLDivElement

const styleSheet = document.styleSheets[0]

const defaultTitle = title.innerText
const defaultUsername = username.innerText

const mobile = /Mobi/i.test(navigator.userAgent)

let mouseHover = false
let lastMoveTime = formatTime()

linksData.forEach((link: Link, index) => {
    const image = document.createElement("img")
    image.setAttribute("src", `icons/${link.icon}`)
    image.setAttribute("alt", `${link.username} on ${link.service}`)
    image.className = "icon"

    if (!mobile) {
        image.onmouseenter = () => {
            // for making trailer to redirect arrow on hover
            mouseHover = true
            trailer.classList.add("trailer-link-hover")

            // Changing bg text
            setText(title, link.service)
            setText(username, `@${link.username}`)

            // Hiding other elements that aren't hovered
            const links = document.querySelectorAll(".icon") as NodeListOf<HTMLDivElement>
            links.forEach((link) => {
                if (link.getAttribute("index") !== index.toString()) link.classList.add("hidden")
            })
        }

        image.onmouseleave = () => {
            // for reset trailer to normal after hover
            mouseHover = false
            trailer.classList.remove("trailer-link-hover")

            // Resetting bg text
            setText(title, defaultTitle)
            setText(username, defaultUsername)

            // Showing elements after hover is ended
            const links = document.querySelectorAll(".icon") as NodeListOf<HTMLDivElement>
            links.forEach((link) => link.classList.remove("hidden"))
        }
    }

    const anchor = document.createElement("a")
    anchor.setAttribute("href", link.url)
    anchor.className = "icon-container"
    anchor.setAttribute("target", "_blank")
    anchor.setAttribute("index", index.toString())
    anchor.appendChild(image)

    links.appendChild(anchor)
})

document.onmousemove = (e) => {
    // current mouse position
    const x = e.clientX - 15
    const y = e.clientY - 15

    // current trailer position
    const lx = trailer.offsetLeft
    const ly = trailer.offsetTop

    // Distance between mouse and trailer
    const distance = Math.sqrt((x - lx) ** 2 + (y - ly) ** 2)

    // Getting time of move movement
    const currentTime = formatTime()
    const time = currentTime - lastMoveTime
    lastMoveTime = currentTime

    // Converting velocity to scale
    const velocity = Math.min(distance / (time * 3), 3)
    const scale = parseFloat(velocity.toFixed(2))

    const left = `${x}px`
    const top = `${y}px`

    // Getting middle point between mouse position and trailer position
    const [xm, ym] = getMiddlePoint(x, y, lx, ly)

    const backgroundColor = mouseHover ? "#fff4" : "#fff"

    const keyframes = [
        {},
        {
            scale: mouseHover ? "3" : scale.toString(),
            backgroundColor,
            top: ym,
            left: xm,
        },
        {
            scale: mouseHover ? "3" : "0",
            backgroundColor,
            top,
            left,
        },
    ]

    trailer.animate(keyframes, { duration: 300, fill: "forwards" })
}
