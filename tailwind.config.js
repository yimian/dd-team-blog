module.exports = {
  purge: {
    content: [
      'content/**/*.md',
    ],
  },
  important: true,
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '36em',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}