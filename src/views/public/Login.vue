<template>
  <main class="form-signin text-center">
    <form @submit.prevent="login">
      <h1 class="h3 mb-3 fw-normal">Please log in</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
               v-model="loginInfo.email">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
               v-model="loginInfo.password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
</template>

<script>
import {useRouter} from 'vue-router'
import {onBeforeMount, ref} from 'vue'

export default {
  name: "Login",
  setup() {
    const router = useRouter()
    onBeforeMount(async () => {
      let token = localStorage.getItem('token')
      if (token) {
        try {
          const result = await axios.get(`me`)
          await router.push({name: 'Dashboard'})
        }catch (err){
          console.log(err)
          if (err.response.status === 401) {
            localStorage.removeItem('token')
          }
        }
      }

    })

    const loginInfo = ref({
      email: null,
      password: null
    })

    function login() {
      // axios.get(`${process.env.VUE_APP_ROOT_BACKEND}sanctum/csrf-cookie`).then(response => {
      axios.post(`login`, {email: loginInfo.value.email, password: loginInfo.value.password})
          .then(res => {
            localStorage.setItem('token', res.data.data.token)
            window.axios.defaults.headers['Authorization'] = `Bearer ${res.data.data.token}`
            router.push({name: 'Dashboard'})
            console.log(res)
          })
          .catch(err => {
            router.push({name: 'Login'})
          })
      // });
    }

    return {
      loginInfo,
      login
    }
  },
  // data(){
  //   return {
  //     email: null,
  //     password:null
  //   }
  // },
  // methods:{
  //    login(){
  //      // axios.get(`${process.env.VUE_APP_ROOT_BACKEND}sanctum/csrf-cookie`).then(response => {
  //       axios.post(`login`, {email: this.email, password: this.password})
  //           .then(res => {
  //             localStorage.setItem('token', res.data.data.token)
  //             this.$router.push({name: 'Dasboard'})
  //             console.log(res)
  //           })
  //     // });
  //   }
  // }
}
</script>

<style scoped src="@/assets/login-register.css"></style>