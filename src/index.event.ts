import {TWatchSection} from "@/index.event.types";

const hx = require("hbuilderx")
module.exports = {
    onConfigurationChange(section: TWatchSection, cb: (event: any) => any) {
        hx.workspace.onDidChangeConfiguration((e: any) => {
            if (e.affectsConfiguration(section)) cb(e)
        })
    }
}
