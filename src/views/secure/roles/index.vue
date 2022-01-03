<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Roles</h1>
  </div>
  <div class="d-flex justify-content-between flex-wrap btn-toolbar">
    <router-link :to="{name:'roles.create'}" class="btn btn-sm btn-outline-secondary">Add</router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody v-if="roles">
      <tr v-for="(role, index) in roles" :key="role.id">
        <td>{{index = index + (currentPage-1)*perPage + 1}}</td>
        <td>{{role.name}}</td>
        <td>
          <div class="btn-group">
            <router-link :to="{name: 'roles.edit', params:{id: role.id}}" href=""  class="btn btn-primary">Edit</router-link>
            <a href="" @click.prevent="deleteRole(role.id)" class="btn btn-danger">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <nav>
    <ul class="pagination">
      <li class="page-item" v-if="previousPage">
        <a href="" @click.prevent="previous" class="page-link">Previous</a>
      </li>
      <li class="page-item" v-if="nextPage">
        <a href=""  @click.prevent="next" class="page-link">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useRouter} from  'vue-router'
export default {
  name: "RoleList",
  setup(){
    const router = useRouter()
    const roles = ref([])
    const paginationData = ref({})
    const currentPage = ref(1);
    const perPage = ref(5);
    const fetchRole = (url = 'roles?page=1') => {
      axios.get(`${url}`)
          .then(res => {
            roles.value = res.data.data
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
      fetchRole();
    })
    const nextPage = computed( () => {
      return paginationData.value?.next
    })
    const previousPage = computed( () => {
      return paginationData.value?.prev
    })

    function next(){
      fetchRole(nextPage.value)
    }
    function previous(){
      fetchRole(previousPage.value)
    }

    function deleteRole(id){
      if (confirm('Are you sure to delete?')) {
        axios.delete(`roles/${id}`)
            .then(res => {
              fetchRole()
            })
            .catch(err => {

            })
      }
    }
    return {
      roles,
      next,
      previous,
      nextPage,
      previousPage,
      currentPage,
      perPage,
      deleteRole
    }
  }
}
</script>

<style scoped>

</style>