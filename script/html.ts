import hyperstream from 'hyperstream'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { globby } from 'globby'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const output = 'public'

async function build () {
    const files = await globby(['src/**/*.html', '!src/**/_*.html'])

    files.forEach(async (f) => {
        const parts = f.split('/')
        parts.shift()  // rm the `src` folder
        const filename = parts.pop()
        const withoutExtension = filename?.split('.').shift()

        const subfolder = path.join(
            output,
            ...parts,
            (withoutExtension === 'index' ? '' : withoutExtension!)
        )

        await mkdir(path.join(__dirname, subfolder), { recursive: true })

        const hs = hyperstream({
            '#content': {
                _appendHtml: '<em>hello from the script</em>'
            }
        })

        fs.createReadStream(f)
            .pipe(hs)
            .pipe(fs.createWriteStream(
                path.join(__dirname, subfolder, 'index.html')
            ))
    })
}

build()
