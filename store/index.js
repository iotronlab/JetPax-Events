export const strict = false
export const state = () => ({
  snackbar: {},
})

export const getters = {
  snackbar(state) {
    return state.snackbar
  },
}

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    snackbar.showing = true
    snackbar.icon = snackbar.icon || null
    snackbar.color = snackbar.color || 'success'
    state.snackbar = snackbar
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    //   snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
  },
}
