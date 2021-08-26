<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitFrom">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean

type Events = {
  'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>()

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const funcArr: ValidateFunc[] = []

    const submitFrom = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }

    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })

    return {
      submitFrom
    }
  }
})
</script>
