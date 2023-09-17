//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = 'http://localhost:8080'
import store from '../../store/index'

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









  async getReviewInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  
  async deleteReview(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${server}/reviews/${info.idx}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async putReview(info) {
    const tok = store.state.token.accessToken
    console.log(info)
    const content = {
      content: info.content
    }
    const response = await fetch(`${server}/reviews/1/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()
    return data
  },
}
