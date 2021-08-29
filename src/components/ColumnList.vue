<template>
  <div class="row">
    <div
      v-for="item in columnList"
      :key="item._id"
      class="col-4 mb-4"
    >
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.avatar && item.avatar.url"
            :alt="item.title"
            class="rounded-circle border border-light w-25 h-25 my-3"
          >
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <router-link :to="`/column/${item._id}`" class="btn btn-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      // 若想把构造函数断言成类型，需要使用 PropType
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = {
            url: require('@/assets/default_img.jpeg')
          }
        }

        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>
