//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = 'http://localhost:8080'
import store from '../../store/index'

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
}
