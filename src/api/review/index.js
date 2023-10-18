//mock server
//const server = "https://port-0-backend-jvpb2alnuic3pc.sel5.cloudtype.app"
//local server
//const server = 'http://localhost:8080'
import store from '../../store/index'

export default {
  async getReviewInfo() {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tok,
      },
    })
    const data = await response.json()
    return data
  },
  async postReview(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/reviews/write`, {
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
  async deleteReview(info) {
    const tok = store.state.token.accessToken
    const response = await fetch(`${this.server}/reviews/${info.idx}/delete`, {
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
    const response = await fetch(`${this.server}/reviews/${info.idx}/update`, {
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
