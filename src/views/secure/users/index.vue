<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Users</h1>
    </div>
    <div class="d-flex justify-content-between flex-wrap btn-toolbar">
      <router-link :to="{name:'users.create'}" class="btn btn-sm btn-outline-secondary">Add</router-link>
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
          <td>{{index = index + (currentPage-1)*perPage + 1}}</td>
          <td>{{user.first_name}}</td>
          <td>{{user.last_name}}</td>
          <td>
            <span v-for="(role, index2) in user.roles" :key="index2">
              {{role.name}} {{(index2+1) !== user.roles.length ? ',' : ''}}
            </span>
          </td>
          <td>{{user.email}}</td>
          <td>
            <div class="btn-group">
              <router-link :to="{name: 'users.edit', params:{id: user.id}}" href=""  class="btn btn-primary">Edit</router-link>
              <a href="" @click.prevent="deleteUser(user.id)" class="btn btn-danger">Delete</a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
   <paginator @fetchData="fetchUser" :paginationData="paginationData"></paginator>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from  'vue-router'
import paginator from "../components/paginator";
export default {
  name: "UserList",
  components:{paginator},
  setup(){
    const router = useRouter()
    const users = ref([])
    const paginationData = ref({})
    const currentPage = ref(1);
    const perPage = ref(5);
    const fetchUser = (url = 'users?page=1') => {
      axios.get(`${url}`)
          .then(res => {
            users.value = res.data.data
            paginationData.value = res.data.links
            currentPage.value = res.data.meta.current_page
            perPage.value = res.data.meta.per_page
          })
          .catch(err => {
            if (err.reponse.status === 401) {
              localStorage.removeItem('token')
              router.push({name: 'Login'})
            }
          })
    }
    onMounted(() =>{
      fetchUser();
    })
    function deleteUser(id){
      if (confirm('Are you sure to delete?')) {
        axios.delete(`users/${id}`)
            .then(res => {
              fetchUser()
            })
            .catch(err => {

            })
      }
    }
    return {
      users,
      currentPage,
      perPage,
      deleteUser,
      paginationData,
      fetchUser
    }
  }
}
</script>

<style scoped>

</style>