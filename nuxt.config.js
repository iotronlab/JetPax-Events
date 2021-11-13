export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Independent Artist Association',
    title: 'Welcome to IAA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Independent Artist Association is an event organizer community of performing artists based in Kolkata, India. The growth and development of underground artists is the primary focus of our organization.',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        hid: 'rzpay',
        src: 'https://checkout.razorpay.com/v1/checkout.js',
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vee-validate.js',
    },
    { src: '~/plugins/firebase.js', mode: 'client', ssr: false },

    { src: '~/plugins/pixi.js', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/auth-next',

    // https://go.nuxtjs.dev/pwa
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'https://devapi.iaa.org.in/api',
  },

  // sentry config
  sentry: {
    dsn: 'https://e073240737c847159fcc5b6e914abde1@o1063476.ingest.sentry.io/6053880', // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      /* icon options */
      source: '/icon.png',
    },
    manifest: {
      lang: 'en',
      name: 'Independent Artist Association',
      short_name: 'IAA',
      description: `Independent Artist Association is an event organizer community of performing artists based in Kolkata, India.
      The growth and development of underground artists is the primary focus of our organization.`,
    },
    meta: {
      theme_color: '#121212',
      nativeUI: true,
      name: 'IAA',
      author: 'iotron',
      description: `Independent Artist Association is an event organizer community of performing artists based in Kolkata, India.
      The growth and development of underground artists is the primary focus of our organization.`,
      ogHost: 'https://www.iaa.org.in',
    },
  },
  googleFonts: {
    families: {
      'Josefin Sans': {
        wght: [400, 700],
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: true,
      light: false,
      options: {
        customProperties: false,
        variations: false,
        // themeCache: {
        //   get: (key) => localStorage.getItem(key),
        //   set: (key, value) => localStorage.setItem(key, value),
        // },
        // minifyTheme,
      },
      themes: {
        dark: {
          primary: 'ed2f7b',
          accent: '#A78BFA',
          secondary: 'f9b31e',
          info: '#6366F1',
          warning: '#F59E0B',
          error: '#EF4444',
          success: '#9FE2BF',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    optimization: {
      splitChunks: {
        //  maxSize: 200000,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
}
