import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { testData, testPosts } from './testData'

// 接口定义-用户
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
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

const store = createStore<GlobalDataProps>({
  state: {
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
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'hjj' }
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
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
    }
  }
})

export default store
