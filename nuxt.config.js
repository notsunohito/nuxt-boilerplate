const { NODE_ENV } = process.env
const API_PORT = NODE_ENV === 'test' ? 1338 : 1337

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  srcDir: 'app/',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'source-map'
      }
    }
  },
  css: [
    'minireset.css/minireset.css',
    { src: '~assets/css/global.sass', lang: 'sass' }
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: [
    '~/api/'
  ],
  axios: {
    baseURL: `http://localhost:${API_PORT}/`,
    headers: {'Content-Type': 'application/json'},
    credentials: true,
    debug: true
  }
}
