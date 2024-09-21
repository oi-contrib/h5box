import type { Plugin } from 'vite'

export default function DemoPlugin(): Plugin {
    return {
        name: 'vite-shader-plugin',

        // 代码转译
        transform(code, id) {
            return /\.c$/.test(id) ? `export default ${JSON.stringify(code)}` : code
        }
    }
};