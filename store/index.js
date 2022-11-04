export const strict = false
export const state = () => ({
  snackbar: {},
  cities: [],
})

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
  cities(state) {
    return state.cities
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
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    //   snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
  },
  async getCities({ commit }) {
    await this.$axios
      .$get('all-cities')
      .then((res) => {
        commit('SET_CITIES', res.data)
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err))
      })
  },
}
