module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './*.html',
        './**/*.html',
        './*.js',
        './**/*.js'
      ]
    }),
    require('cssnano')({
      preset: 'default',
    })
  ]
}
