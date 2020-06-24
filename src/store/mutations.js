export default {
  changeToken (state, token) { // token存储
    state.token = token
    try {
      localStorage.token = token
    } catch (e) {}
  }
}
