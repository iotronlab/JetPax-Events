export const strict = false
export const state = () => ({
  snackbar: {},
  cities: [],
  defaultCity: null,
})

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
  cities(state) {
    return state.cities
  },
  defaultCity(state) {
    return state.defaultCity
  },
}

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    snackbar.showing = true
    snackbar.icon = snackbar.icon || null
    snackbar.color = snackbar.color || 'success'
    state.snackbar = snackbar
  },

  SET_CITIES(state, cities) {
    state.cities = cities
  },

  SET_CITY(state, city) {
    state.defaultCity = city
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    //   snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
  },

  setCity({ commit }, city) {
    document.cookie = 'defaultCity=' + city
    commit('SET_CITY', city)
    // this.$router.push(`/${city}`)
  },

  async getCities({ commit, dispatch }) {
    await this.$axios
      .$get('all-cities')
      .then((res) => {
        commit('SET_CITIES', res.data)

        dispatch('syncDefaultCity', res.data)

        return res.data
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err))
      })
  },

  syncDefaultCity({ dispatch }, cities) {
    let city = cities.find((element) => element.url === state.defaultCity)
    // city not found in database
    if (city === undefined) {
      city = cities.find((element) => element.default === 1)

      dispatch('setCity', city.url)
    }
  },
}
