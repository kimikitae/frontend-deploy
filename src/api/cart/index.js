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

    if (!response.ok) {
      throw new Error('카트 정보 가져오기에 실패했습니다.')
    }
    console.log(response)
    const data = await response.json()
    return data
  },
}