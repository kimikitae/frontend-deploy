//mock server
// const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
// const server = 'http://localhost:8080'
import store from '../../store/index'

export default {
  async getCartInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async putCartInfo(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/carts/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async deleteCart() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/carts/clear`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
}
