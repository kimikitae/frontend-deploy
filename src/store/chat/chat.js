import api from '../../api/chat/index.js'
import router from '../../router/index.js'

export default {
  namespaced: true,

  state: {
    chats: [],
    chat:{}
  },
  getters: {},
  mutations: {
    setChats(state, chats) {
      state.chats = chats
    },
    setChat(state, chat) {
      state.chat = chat
    },
  },
  actions: {
    async getChatRooms(context) {
      const data = await api.getChatRooms()
      if (data.success) {
        await context.commit('setChats', data.response.chats)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    async getChatRoom(context, info) {
      const data = await api.getChatRoom(info)
      if (data.success) {
        await context.commit('setChat', data.response)
        return true
      } else {
        alert(data.error.status + data.error.message)
        return false
      }
    },
    













    async getPost(context) {
      const info = {
        idx: context.state.selectedIdx,
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
    async getSearchPosts(context, info) {
      const data = await api.getSearchPosts(info)
      if (data.success) {
        await context.commit('setPosts', data.response.posts)
        return true
      } else {
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
        alert(data.error.status + data.error.message)
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
  },
}
