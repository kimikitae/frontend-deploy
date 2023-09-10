//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = 'http://localhost:8080'
import store from '../../store/index'

export default {
  async login(info) {
    const response = await fetch(`${server}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    let head = response.headers.get('Authorization')
    let data = await response.json()

    let d = {
      success: data.success,
      response: data.response,
      error: data.error,
      token: head
    }
    return d
  },
  async signup(info) {
    const response = await fetch(`${server}/users/regist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async getInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      }
    })
    const data = await response.json()
    return data
  },
  async putInfo(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
}
