//mock server
// const server = "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
//local server
const server = "http://localhost:8080"

export default {
  async login(info) {
    const response = await fetch(`${server}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info)
    })

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.')
    }

    const data = response.json()
    return data
  },
  async signup(info) {
    const response = await fetch(`${server}/users/regist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.')
    }

    const data = await response.json()
    return data
  }
}
