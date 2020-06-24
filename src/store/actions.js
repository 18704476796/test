export default {
  changeToken (ctx, token) { // 存储用户token
    ctx.commit('changeToken', token)
  }
}
