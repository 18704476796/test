let defaultToken = ''
try {
  if (localStorage.token) {
    defaultToken = localStorage.token // 用户token
  }
} catch (e) {}

export default {
  // localStorage
  token: defaultToken // 用户token，字符串类型 localStorage
}
