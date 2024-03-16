declare type OptionsType = {
    modulesDir: string
    template: string,
    index: string
}

import * as fs from "fs"
import * as path from "path"

export default function (options: OptionsType) {
    let modules = fs.readdirSync(options.modulesDir)

    let buildPageName = ""
    return {
        name: "vite-modules-plugin",

        // 原始的配置config内容
        config(config, env) {
            let rollupOptions = config.build.rollupOptions

            // 开发时
            if (env.command === "serve") {

            }

            // 打包时
            else {
                let buildName = process.env.BUILD_MODULE;

                // 如果是子模块
                if (buildName != "index") {
                    rollupOptions.input = `@virtual:${buildName}/template.html`
                    config.build.outDir = `./docs/${buildName}`
                }

                // 如果是入口
                else {
                    rollupOptions.input = `@virtual:/index.html`
                    config.build.outDir = `./docs`
                }
            }
        },

        resolveId(id) {
            if (id.indexOf("@virtual:") !== -1) {
                if (id.endsWith("/template.html")) {
                    buildPageName = id.replace(/^@virtual:/, '').replace(/\/template\.html$/, "")
                } else {
                    buildPageName = "index"
                }
                return process.cwd() + "/index.html"
            } return null
        },

        load(id) {
            if (id.endsWith("/index.html")) {
                let moduleName = buildPageName
                if (moduleName == 'index') {
                    return fs.readFileSync(options.index, "utf-8")
                } else {
                    let template = fs.readFileSync(path.join(options.modulesDir, moduleName, options.template), "utf-8")
                    return template.replace('${module}', "/" + options.modulesDir + "/" + moduleName)
                }
            } return null
        },

        // 用于配置开发服务器的钩子
        configureServer(server) {
            return () => {

                // 自定义请求处理
                server.middlewares.use((req, res, next) => {
                    if (req.url.endsWith(".html")) {
                        const url = req.originalUrl || "/"

                        // 首页
                        if (url == "/" || url === "/index.html") {
                            let template = fs.readFileSync(options.index, "utf8")

                            // 应用 Vite 内建 HTML 转换和任意插件 HTML 转换
                            server.transformIndexHtml(url, template).then(content => {
                                res.end(content)
                            })
                        }

                        else {
                            let moduleName = url.replace(/^\//, '').replace(/\/index.html$/, '')

                            // 模块页面
                            if (modules.indexOf(moduleName) > -1) {
                                let template = fs.readFileSync(path.join(options.modulesDir, moduleName, options.template), "utf-8")
                                server.transformIndexHtml(url, template.replace('${module}', "/" + options.modulesDir + "/" + moduleName)).then(content => {
                                    res.end(content)
                                })
                            }

                            // 否则
                            else {
                                next()
                            }
                        }
                    } else {
                        next()
                    }
                })
            }
        }
    }
}