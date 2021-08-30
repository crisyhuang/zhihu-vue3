import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { testData, testPosts } from './testData'

// 接口定义-用户
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: number;
  column?: string;
  email?: string;
}

// 接口定义-图片
interface imageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

// 接口定义-专栏
export interface ColumnProps {
  _id: number;
  title: string;
  avatar?: imageProps;
  description: string;
}

// 接口定义-文章
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

// 接口定义-全局data
export interface GlobalDataProps {
  token: string;
  loading: boolean;
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

// 抽象get请求和commit操作
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

// 抽象post请求和commit操作
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      // axios.get('/columns').then(res => {
      //   commit('fetchColumns', res.data)
      // })

      // 优化1：把 promise 改造成 async/await
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)

      // 优化2：将优化1的操作抽取成公共方法
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    // 整合登录操作+获取用户信息
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
