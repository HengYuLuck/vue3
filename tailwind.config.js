/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'tw-',
    corePlugins: {
        preflight: false // 解决样式覆盖问题
    },
    content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
    safelist: [
        {
            pattern: /^tw-bg-/,
        },
        {
            pattern: /^tw-text-/,
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

