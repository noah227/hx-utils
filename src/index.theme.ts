const hx = require("hbuilderx")

/**
 * @description 判断是否是object
 * @param {Object} object
 */
function isObj(object: any) {
    return object && typeof (object) == "object" && Object.prototype.toString.call(object).toLowerCase() === "[object object]"
}

/**
 * 来自股官方文档示例的内容（部分命名小调整）
 * @link https://hx.dcloud.net.cn/ExtensionTutorial/fitTheme?id=%e8%8e%b7%e5%8f%96hbuilderx%e4%b8%bb%e9%a2%98%e6%95%b0%e6%8d%ae
 * @description 获取跟主题相匹配的颜色
 *   - fontFamily           字体
 *   - fontSize             字号
 *   - background           背景色
 *   - fontColor            字体颜色
 *   - liHoverBackground    li类元素，悬停背景色
 *   - inputBgColor         输入框背景色
 *   - inputLineColor       输入框线条颜色
 *   - lineColor            其它线条颜色
 *   - scrollbarColor       滚动条颜色
 * @param {String} area - HBuilderX区域，当area=undefined，返回编辑器区域的背景色；当area=sideBar时，返回项目管理器背景色
 * 调整：形参area命名拼写纠正
 */
function getThemeData(area?: "sideBar") {
    let background: string
    let fontColor: string
    let liHoverBackground: string
    let inputBgColor: string
    let inputLineColor: string
    let lineColor: string
    let scrollbarColor: string

    let config = hx.workspace.getConfiguration()
    let colorScheme = config.get("editor.colorScheme") as string | undefined
    let colorCustomizations = config.get("workbench.colorCustomizations")

    // 获取HBuilderX编辑器字体大小
    let fontSize = config.get("editor.fontSize") as number | undefined
    if (fontSize === undefined) {
        fontSize = 14
    }

    // 获取HBuilderX编辑器字体
    let fontFamily = config.get("editor.fontFamily") as string | undefined
    // 调整：官方这里判断条件是 if (fontFamily) ，应该是not判断才对，很是诡异，故作调整
    if (!fontFamily) {
        fontFamily = "Monaco"
    }

    // 获取当前主题
    if (colorScheme === undefined) {
        colorScheme = "Default"
    }


    // 处理用户自定义的颜色
    let customColors: { [index: string]: any } = {}
    try {
        customColors = colorCustomizations[`[${colorScheme}]`]
        if (!isObj(customColors)) {
            customColors = {}
        }

    } catch (e) {
    }

    // 根据参数，返回编辑器、或项目管理器背景色
    let viewBackgroundOptionName = area === "sideBar" ? "sideBar.background" : "editor.background"
    let viewFontOptionName = area === "sideBar" ? "list.foreground" : undefined
    let viewLiHoverBgOptionName = area === "sideBar" ? "list.hoverBackground" : "list.hoverBackground"

    switch (colorScheme) {
        case "Monokai":
            background = "rgb(39,40,34)"
            fontColor = "rgb(179,182,166)"
            liHoverBackground = "rgb(78,80,73)"
            inputBgColor = "#2E2E2E"
            inputLineColor = "rgb(81,140,255)"
            lineColor = "rgb(23,23,23)"
            scrollbarColor = "#6F6F6F"
            break
        case "Atom One Dark":
            background = "rgb(40,44,53)"
            fontColor = "rgb(171,178,191)"
            liHoverBackground = "rgb(44,47,55)"
            inputBgColor = "#2E2E2E"
            inputLineColor = "rgb(81,140,255)"
            lineColor = "rgb(33,37,43)"
            scrollbarColor = "#6F6F6F"
            break
        default:
            background = "rgb(255,250,232)"
            fontColor = "#243237"
            liHoverBackground = "rgb(224,237,211)"
            inputBgColor = "rgb(255,254,250)"
            inputLineColor = "rgb(65,168,99)"
            lineColor = "rgb(225,212,178)"
            scrollbarColor = "rgb(207,181,106)"
            break
    }


    if (customColors !== undefined) {
        if (customColors[viewBackgroundOptionName] && viewBackgroundOptionName in customColors) {
            background = customColors[viewBackgroundOptionName]
        }

        if (viewFontOptionName && customColors[viewFontOptionName] && viewFontOptionName in customColors) {
            fontColor = customColors[viewFontOptionName]
        }

        if (customColors[viewLiHoverBgOptionName] && viewLiHoverBgOptionName in customColors) {
            liHoverBackground = customColors[viewLiHoverBgOptionName]
        }
    }

    return {
        fontFamily,
        fontSize,
        fontColor,
        background,
        liHoverBackground,
        inputLineColor,
        inputBgColor,
        lineColor,
        scrollbarColor
    }
}

module.exports = getThemeData
