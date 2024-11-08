const fs = require("fs")
const path = require("path")
const generateWatchConfigurationKeys = () => {
    const hxSettings = require("json5").parse(fs.readFileSync(path.resolve(__dirname, "./hx.settings.json5"), {encoding: 'utf8'}))
    fs.writeFileSync(
        path.resolve(__dirname, "../src/index.event.types.ts"),
        `/** Auto Generated - ${new Date().toLocaleString()} */\nexport type TWatchSection =\n\t${Object.keys(hxSettings).map(k => `"${k}"`).join(" |\n\t")}`
    )
}

generateWatchConfigurationKeys()
