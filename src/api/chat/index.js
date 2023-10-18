//mock server
//const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
// const server = 'http://localhost:8080'
import store from '../../store/index'
import {server} from '../conf.js'

export default {
  async getChatRooms() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getChatRoom(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/chats/${info.idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async deleteChat(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/chats/${info.selectedRoom}/delete`, {
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
