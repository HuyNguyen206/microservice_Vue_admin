<template>
  <form action="" @submit.prevent="updateInfo" class="form pt-5">
    <div class="form-group pb-4">
      <label>First name</label>
      <input type="text" class="form-control" :class="{'is-invalid': errorValidation.first_name}" v-model="userInfo.first_name">
      <div v-if="errorValidation.first_name" class="invalid-feedback">
        {{errorValidation.first_name[0]}}
      </div>
    </div>
    <div class="form-group pb-4">
      <label>Last name</label>
      <input type="text" class="form-control" :class="{'is-invalid': errorValidation.last_name}" v-model="userInfo.last_name">
      <div v-if="errorValidation.last_name" class="invalid-feedback">
        {{errorValidation.last_name[0]}}
      </div>
    </div>
    <div class="form-group pb-4">
      <label>Email</label>
      <input readonly type="text" class="form-control"  v-model="userInfo.email">
    </div>
    <div class="form-group pb-4">
      <label>Password</label>
      <input type="password" class="form-control" :class="{'is-invalid': errorValidation.password}" v-model="userInfo.password">
      <div v-if="errorValidation.password" class="invalid-feedback">
        {{errorValidation.password[0]}}
      </div>
    </div>
    <div class="form-group pb-4">
      <label>Password confirm</label>
      <input type="password" class="form-control" :class="{'is-invalid': errorValidation.password_confirmation}" v-model="userInfo.password_confirmation">
      <div v-if="errorValidation.password_confirmation" class="invalid-feedback">
        {{errorValidation.password_confirmation[0]}}
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary form-control">Update info</button>
    </div>
  </form>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "profile",
  setup() {
    const userInfo = ref({
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      password_confirmation: null
    })
    const router = useRouter()
    const errorValidation = ref({})
    onMounted(() => {
      axios.get('me')
      .then(res => {
        userInfo.value = res.data.data
      })
    })
    function updateInfo() {
      axios.put('update-info', userInfo.value)
      .then(res => {
        router.push({name: 'users.index'})
      }).catch(err => {
        console.log(err.response)
        if(err.response.status === 422) {
          errorValidation.value = err.response.data.errors
        } else {
          alert(err.response.data.message)
        }
      })
    }
    return {
      userInfo,
      errorValidation,
      updateInfo
    }
  }
}
</script>

<style scoped>

</style>