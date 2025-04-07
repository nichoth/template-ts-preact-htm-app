/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nesting'),
        require('postcss-preset-env')
    ]
}

module.exports = config
