import api from '../../api/post/index.js'
// import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    posts: [],
    selectedIdx: 0,
    post: {},
  },
  getters: {},
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setSelectedIdx(state, selectedIdx) {
      state.selectedIdx = selectedIdx
    },
    setPost(state, post) {
      state.post = post
    },
  },
  actions: {
    async getPosts(context) {
      const data = await api.getPosts()
      if (data.success) {
        await context.commit('setPosts', data.response.posts)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getPost(context) {
        const info = {
            idx: context.state.selectedIdx
        }
        const data = await api.getPost(info)
        if (data.success) {
          await context.commit('setPost', data.response)
          return true
        } else {
          alert(data.error.status + data.error.message)
          return false
        }
      },
  },
}
