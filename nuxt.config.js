export default {
  target: 'static',
  router: {
    base: '/dd-team-blog'
  },
  components: true,
  modules: ['@nuxt/content'],
  buildModules: ['@nuxtjs/tailwindcss'],
  head: {
    htmlAttrs: {
      lang: 'zh-CN',
      class: 'antialiased',
    },
    titleTemplate: '%s - DD Team Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },

      { hid: 'keywords', name: 'keywords', content: 'Keyword 1, Keyword 2' },
    ],
  }
}