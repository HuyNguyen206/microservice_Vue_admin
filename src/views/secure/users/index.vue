<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Users</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Role</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody v-if="users">
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{index+=1}}</td>
          <td>{{user.first_name}}</td>
          <td>{{user.last_name}}</td>
          <td>
            <span v-for="(role, index2) in user.roles" :key="index2">
              {{role.name}} {{(index2+1) !== user.roles.length ? ',' : ''}}
            </span>
          </td>
          <td>{{user.email}}</td>
          <td>
            Action
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from  'vue-router'
export default {
  name: "UserList",
  setup(){
    const router = useRouter()
    const users = ref([])
    onMounted(() =>{
      axios.get('users')
      .then(res => {
        users.value = res.data.data
      })
      .catch(err => {
        if (err.reponse.status === 401) {
          localStorage.removeItem('token')
          router.push({name: 'Login'})
        }
      })
    })
    return {
      users
    }
  }
}
</script>

<style scoped>

</style>