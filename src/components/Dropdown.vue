<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      @click.prevent="toggleOpen"
      class="btn btn-outline-light my-2 dropdown-toggle"
    >{{ title }}</a>
    <ul
      v-if="isOpen"
      class="dropdown-menu"
      :style="{ display: 'block' }"
    >
      <li class="dropdown-item">
        <a href="#">新建文章</a>
      </li>
      <li class="dropdown-item">
        <a href="#">编辑资料</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    // 下拉菜单的显示/隐藏
    const isOpen = ref(false)
    // 下拉菜单的 DOM 节点
    const dropdownRef = ref<null | HTMLElement>(null)

    // 切换下拉菜单的显示/隐藏
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    // 判断点击事件的目标对象是否在下拉菜单的范围以外
    const isClickOutside = useClickOutside(dropdownRef)

    // 因 setup 仅执行一次，此处需监听 isClickOutside
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
