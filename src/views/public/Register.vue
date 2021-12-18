<template>
  <main class="form-signin">
    <form @submit.prevent="register">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="First name" v-model="form.first_name">
        <label for="floatingInput">First name</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="floatingLInput"  placeholder="Last name" v-model="form.last_name">
        <label for="floatingLInput">Last name</label>
      </div>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInputE" placeholder="name@example.com" v-model="form.email">
        <label for="floatingInputE">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="form.password">
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingConfirmPassword" placeholder="Confirm password" v-model="form.password_confirmation">
        <label for="floatingConfirmPassword">Confirm Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
</template>

<script>
// import axios from 'axios'
import {router} from 'vue-router'
export default {
  name: "Register",
  data(){
    return {
      form:{
        first_name:'',
        last_name:'',
        password:'',
        password_confirmation:'',
        email:''
      }
    }
  },
  methods:{
    register() {
     // axios.post(`${process.env.VUE_APP_ROOT_API}register`, this.form)
     //  .then(res => {
     //    router.push({name: 'Login'})
     //  })
    }
  }
}
</script>

<style scoped src="@/assets/login-register.css"></style>