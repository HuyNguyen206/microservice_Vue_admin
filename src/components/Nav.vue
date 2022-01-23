<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <div class="navbar-nav">
      <div class="nav-item text-nowrap" style="display: flex; align-items: center">
        <router-link :to="{name : 'users.profile'}" class="px-3 mr-2 text-white">{{ fullName }}</router-link>
        <a class="nav-link px-3" href="#" @click.prevent="logout">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>

import {useRouter} from "vue-router";
import {computed, toRefs} from 'vue'

export default {
  name: "Nav",
  props:['user'],
  setup(props){
    const router = useRouter()
    const {user} = toRefs(props)
    function logout(){
      axios.post('logout')
      .then(res => {
        localStorage.removeItem('token')
        console.log(res.data)
        router.push({name: 'Login'})
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
    const fullName = computed(() => {
      return user?.value?.first_name + user?.value?.last_name || ''
    })
    return {
      logout,
      fullName
    }
  }
}
</script>

<style scoped>

</style>