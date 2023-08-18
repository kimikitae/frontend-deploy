const server = "http://localhost:8080/"

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
    alert("로그인 응답: ", data)
    return data
  },
}
