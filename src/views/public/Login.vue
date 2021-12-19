<template>
  <main class="form-signin text-center" >
    <form @submit.prevent="login">
      <h1 class="h3 mb-3 fw-normal">Please log in</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
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
export default {
  name: "Login",
  data(){
    return {
      email: null,
      password:null
    }
  },
  methods:{
     login(){
       // axios.get(`${process.env.VUE_APP_ROOT_BACKEND}sanctum/csrf-cookie`).then(response => {
        axios.post(`${process.env.VUE_APP_ROOT_API}login`, {email: this.email, password: this.password})
            .then(res => {
              console.log(res)
            })
      // });
    }
  }
}
</script>

<style scoped src="@/assets/login-register.css"></style>