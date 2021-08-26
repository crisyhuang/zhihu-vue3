<template>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      v-bind="$attrs"
    >
    <p v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'

// 单条规则类型
interface RuleProp {
  type: 'required' | 'email',
  message: string;
}
// 导出规则数组，用于约束父组件对规则的定义
export type RulsProp = RuleProp[]

const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

export default defineComponent({
  props: {
    rules: Array as PropType<RulsProp>,
    modelValue: String
  },
  // 禁止组件根元素继承 attribute
  inheritAttrs: false,
  setup (props, context) {
    console.log(context.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    const validateInput = () => {
      if (props.rules) {
        // every 检测数组所有元素是否都符合指定条件
        // 若有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测
        // 适合校验表单项的业务场景
        const allPassed = props.rules.every(rule => {
          let passed = true

          inputRef.message = rule.message

          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break

            case 'email':
              passed = emailReg.test(inputRef.val)
              break

            default:
              break
          }

          return passed
        })

        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      updateValue,
      validateInput
    }
  }
})
</script>
