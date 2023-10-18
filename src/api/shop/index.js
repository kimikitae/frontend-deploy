//mock server
// const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
//const server = 'http://localhost:8080'
import store from '../../store/index'
import {server} from '../conf.js'

export default {
  async postShops(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async putShopInfo(info) {
    const tok = store.state.token.accessToken
    console.log(info)
    const response = await fetch(`${server}/shops/${info.idx}/update`, {
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
  async getMyShop() {
    const tok = store.state.token.accessToken
    const idx = store.state.user.userInfo.idx
    const response = await fetch(`${server}/users/${idx}/shop`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async deleteShop(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/shops/${info.idx}/unregist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async postBrand(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/shops/brand`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async postShopInfo(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/shops/regist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tok
      },
      body: JSON.stringify(info)
    })
    const data = await response.json()
    return data
  },
  async getShop() {
    const tok = store.state.token.accessToken
    const idx = store.state.shop.selectedIdx
    const response = await fetch(`${server}/shops/${idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
}
