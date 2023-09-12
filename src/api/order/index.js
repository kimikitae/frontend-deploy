//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = 'http://localhost:8080'
import store from '../../store/index'

export default {
  async getOrderInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getCancelOrderInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/orders/cancel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async deleteOrder(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/orders/${info.idx}/delete`, {
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
