"use strict"
/**
 * @param {string} selector
 * @returns {HTMLHeadElement}
 */
const getHeading = (selector) => document.querySelector(selector)

/**
 * @returns {HTMLDivElement}
 */
const getLinksDiv = () => document.querySelector(".links")

const title = getHeading(".title")
const username = getHeading(".username")
const links = getLinksDiv()

const styleSheet = document.styleSheets[0]

const defaultTitle = title.innerText
const defaultUsername = username.innerText

/**
 * @param {string} str Title of background
 */
const setText = (ele, str) => {
    ele.innerText = str
    ele.style.animation = "none"
    setTimeout(() => (ele.style.animation = null))
}

data.links.forEach((link) => {
    const image = document.createElement("img")
    image.setAttribute("src", `icons/${link.icon}`)
    image.setAttribute("alt", link.url)
    image.className = "icon"

    image.onmouseenter = () => {
        setText(title, link.service)
        setText(username, `@${link.username}`)

        styleSheet.insertRule(`.icon {opacity: 0; size: 0}`, 0)
        links.style.backgroundColor = "transparent"
        links.style.boxShadow = "none"
    }

    image.onmouseleave = () => {
        setText(title, defaultTitle)
        setText(username, defaultUsername)

        const rule = styleSheet.cssRules[0].cssText
        if (rule.startsWith(".icon")) styleSheet.deleteRule(0)
        links.style.backgroundColor = null
        links.style.boxShadow = null
    }

    const a = document.createElement("a")
    a.setAttribute("href", link.url)
    a.className = "icon-container"
    a.setAttribute("target", "_blank")
    a.appendChild(image)

    links.appendChild(a)
})
