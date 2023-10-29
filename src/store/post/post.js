import api from '../../api/post/index.js'
import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    posts: [],
    selectedIdx: 0,
    post: {},
    notices: [],
    writeInfo: {
      title: '',
      content: '',
      options: [],
      idx: 0,
      place: '',
      people: '',
      time: '',
    },
    enable: false,
    dist: 0,
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
    setNotices(state, notices) {
      state.notices = notices
    },
    setMenu(state, info){
      state.writeInfo.options = info.options
      state.writeInfo.idx = info.idx
    },
    setTCTP(state, info){
      state.writeInfo.title = info.title
      state.writeInfo.content = info.content
      state.writeInfo.time = info.time
      state.writeInfo.people = info.people
      state.writeInfo.place = info.place
    },
    setEnable(state, enable){
      state.enable = enable
    },
    setDist(state, dist){
      state.dist = dist
    }
  },
  actions: {
    async getPosts(context) {
      const data = await api.getPosts()
      if (data.success) {
        await context.commit('setPosts', data.response.posts)
        return true
      } else {
        router.push('/')
        //alert(data.error.status + data.error.message)
        return false
      }
    },
    async getPost(context, info) {
      const data = await api.getPost(info)
      if (data.success) {
        await context.commit('setPost', data.response)
        return true
      } else {
        router.push('/')
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getSearchPosts(context, info) {
      const data = await api.getSearchPosts(info)
      if (data.success) {
        await context.commit('setPosts', data.response.posts)
        return true
      } else {
        router.push('/')
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getNotices(context) {
      const data = await api.getNotices()
      if (data.success) {
        await context.commit('setNotices', data.response.notices)
        return true
      } else {
        router.push('/')
        //alert(data.error.status + data.error.message)
        return false
      }
    },
    async postNotice(context, info) {
      const data = await api.postNotice(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async writePost(context) {
      const data = await api.writePost(context.state.writeInfo)
      if (data.success) {
        router.push('/ShareView')
        return true
      } else {
        router.push('/')
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async deletePost(context, info) {
      const data = await api.deletePost(info)
      if (data.success) {
        router.push('/ShareView')
        return true
      } else {
        router.push('/')
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async enterShare(context, info) {
      const data = await api.enterShare(info)
      if (data.success) {
        router.go(0)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
  },
}
