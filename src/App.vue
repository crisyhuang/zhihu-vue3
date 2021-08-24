<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form>
      <validate-input :rules="rulesProp"></validate-input>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
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
    ValidateInput
  },
  setup () {
    const rulesProp = reactive<RulsProp>([
      { type: 'required', message: 'not empty' },
      { type: 'email', message: 'email type' }
    ])

    return {
      currentUser,
      rulesProp
    }
  }
})
</script>
