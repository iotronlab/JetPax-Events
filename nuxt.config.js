export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - JetPax Events',
    title: 'Curated experiences for you',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Independent Artist Association is an event organizer community of performing artists based in Kolkata, India. The growth and development of underground artists is the primary focus of our organization.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: `Artist, artists in India,contemporary artists in India, Underground musicians,emerging musicians in India, IndependentAssociation, Performance, Platform,
          Stage, Musician, Dancer, Art, platform for musicians, concert stage in india`,
      },
      {
        name: 'google-site-verification',
        content: 'E1MrJYuyLZvN7leVNKi7vxRhXw_M_1JYhnZcjR84k8s',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vee-validate.js',
    },
    { src: '~/plugins/firebase.js', mode: 'client', ssr: false },

    // { src: '~/plugins/pixi.js', mode: 'client', ssr: false },
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
    'nuxt-gsap-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/auth-next',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',

    // https://go.nuxtjs.dev/pwa
  ],
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:8000',

    // apiUrl: process.env.API_URL || 'https://devapi.iaa.org.in',

    // apiUrl: process.env.API_URL || 'https://api.iaa.org.in',
    // payKey: 'rzp_live_aFZgYfG1U1OvhZ',
    payKey: 'rzp_test_AeWPLfokXKNjBv',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/api/v1',
    // baseURL: 'https://api.iaa.org.in/api',

    // baseURL: 'https://devapi.iaa.org.in/api',
    // baseURL: 'https://api.iaa.org.in/api',

    credentials: true,
  },
  algolia: {
    apiKey: '59EY5CH98E',
    applicationId: '6ce4114a8c3e029c0e0768c169afd193',
  },
  auth: {
    redirect: {
      home: '/',
      logout: '/',
      login: '/auth/sign-in',
      callback: '/',
    },
    localStorage: {
      prefix: 'iaa.',
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        // url: 'https://api.iaa.org.in',
        url: 'http://localhost:8000',
        //  url: 'https://devapi.iaa.org.in',
        // url: 'https://api.iaa.org.in',
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/api/v1/login',
            method: 'post',
          },
          user: {
            url: '/api/v1/details',
            method: 'get',
          },
          logout: {
            url: '/api/v1/logout',
            method: 'get',
          },
        },
      },
    },
  },

  sitemap: {
    hostname: 'https://www.iaa.org.in',
    gzip: true,
    routes: ['about#team'],
  },

  robots: {
    UserAgent: '*',
    Host: 'https://www.iaa.org.in',
    Disallow: '/_nuxt',
    Sitemap: 'https://www.iaa.org.in/sitemap.xml',
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
    meta: {
      theme_color: '#121212',
      nativeUI: true,
      name: 'IAA',
      author: 'iotron',
      description: `Independent Artist Association is an event organizer community of performing artists based in Kolkata, India.
      The growth and development of underground artists is the primary focus of our organization.`,
      ogHost: 'https://www.iaa.org.in',
    },
    manifest: {
      name: 'Independent Artist Association',
      short_name: 'IAA',
      description: `Independent Artist Association is an event organizer community of performing artists based in Kolkata, India.
      The growth and development of underground artists is the primary focus of our organization.`,
      background_color: '#121212',
    },
  },
  googleFonts: {
    download: false,
    families: {
      'Josefin Sans': {
        wght: [400, 700],
      },
      Poppins: {
        wght: [800],
      },
    },
  },

  // gsap
  gsap: {
    extraPlugins: {
      // scrollTo: true,
      // scrollTrigger: true,
      // text: true,
      draggable: true,
    },
    clubPlugins: {
      // drawSVG: true,
      // morphSVG: true,
      // gsDevTools: true,
      // scrollSmoother: true,
      // scrambleText: true,
      // splitText: true,
    },
    extraEases: {
      // expoScaleEase: true,
      // slowMo: true,
      // roughEase: true,
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
          primary: '#d946ef',
          // accent: colors.grey.darken3,
          secondary: '#C084FC',
          accent: '#86198f',
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
    transpile: ['vee-validate/dist/rules'],
    extractCSS: {
      ignoreOrder: true,
    },
    optimization: {
      splitChunks: {
        maxSize: 200000,
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
    analyze: {
      analyzerMode: 'static',
    },
  },
}
