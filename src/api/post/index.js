//mock server
//const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
//const server = 'http://localhost:8080'
import store from '../../store/index'
import {server} from '../conf.js'

export default {
  async getPosts() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getPost(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/posts/${info.idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async getSearchPosts(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/posts/search`, {
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
  async getNotices() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/notices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async postNotice(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/notices/write`, {
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
  async writePost(info) {
    console.log(info)
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/posts/write`, {
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
  async deletePost(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/posts/${info.idx}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async enterShare(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/chats/enter`, {
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
}
