<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>

    <validate-form @form-submit="onFormSubmit">
      <validate-input
        ref="inputRef"
        v-model="emailVal"
        :rules="rulesProp"
        type="text"
        placeholder="请输入邮箱地址"
      ></validate-input>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>

      <template #submit>
        <button type="submit" class="btn btn-danger">提交</button>
      </template>

    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateForm from './components/ValidateForm.vue'
import ValidateInput, { RulsProp } from './components/ValidateInput.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'huangjj'
}

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateForm,
    ValidateInput
  },
  setup () {
    const emailVal = ref('')
    const inputRef = ref<any>()

    const rulesProp = reactive<RulsProp>([
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ])

    const onFormSubmit = (valid: boolean) => {
      console.log('valid', valid)
      console.log(inputRef.value.validateInput())
    }

    return {
      currentUser,
      rulesProp,
      emailVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>
