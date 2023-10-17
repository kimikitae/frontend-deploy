//mock server
const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
//const server = 'http://localhost:8080'
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
  async getOrder(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/orders/${info}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getSave() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/orders/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getPayInfo() {
    const tok = store.state.token.accessToken
    const info = { 
      postIdx: store.state.chat.chat.postIdx
    }
    const response = await fetch(`${server}/orders/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
      body: JSON.stringify(info),
    })
    const data = await response.json()
    return data
  },
}
