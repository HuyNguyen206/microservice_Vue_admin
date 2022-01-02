<template>
  <div class="col-9">
    <form action="" @submit.prevent="create" class="form pt-5">
      <div class="form-group pb-4">
        <label>First name</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.first_name}" v-model="form.first_name">
        <div v-if="errorValidation.first_name" class="invalid-feedback">
          {{errorValidation.first_name[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Last name</label>
        <input type="text" class="form-control" v-model="form.last_name">
      </div>
      <div class="form-group pb-4">
        <label>Email</label>
        <input type="text" class="form-control" v-model="form.email">
      </div>
      <div class="form-group pb-4">
        <label>Role</label>
        <select class="form-control" v-model="form.role" id="">
          <option v-for="role in roles" :value="role.id">{{role.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-primary form-control">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
export default {
  name: "create",
  setup(){
    const router = useRouter()
    const form = ref({
      first_name: null,
      last_name:null,
      email: null,
      role:null
    })
    const errorValidation = ref({})
    const roles = ref([])
    onMounted(() => {
      axios.get('roles')
      .then(res => {
        roles.value = res.data.data
      })
    })
    function create(){
      axios.post(`users`, form.value)
      .then(res => {
        alert('Create successfully!')
        router.push({name: 'users.index'})
      })
      .catch(err => {
        if(err.response.status === 422) {
          errorValidation.value = err.response.data
        } else {
          alert(err.response.data.message)
        }
      })
    }
    return {
      create,
      form,
      errorValidation,
      roles
    }
  }
}
</script>

<style scoped>

</style>