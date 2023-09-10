//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = 'http://localhost:8080'
import store from '../../store/index'

export default {
  async getCartInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    console.log(response)
    const data = await response.json()
    return data
  },
  async putCartInfo(info) {
    const tok = store.state.token.accessToken
    console.log(info)
    const response = await fetch(`${server}/carts/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok
      },
      body: JSON.stringify(info)
    })
    console.log(response)
    const data = await response.json()
    return data
  },
}
