import * as fs from "fs"
import { execSync } from "child_process"

let subFiles = fs.readdirSync("./src/modules")
const env = process.env
const cwd = process.cwd()

subFiles.unshift("index")
subFiles.forEach(function (file) {
    env.BUILD_MODULE = file
    execSync("vite build", { stdio: "inherit", env, cwd })
})