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
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.last_name}" v-model="form.last_name">
        <div v-if="errorValidation.last_name" class="invalid-feedback">
          {{errorValidation.last_name[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Email</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.email}" v-model="form.email">
        <div v-if="errorValidation.email" class="invalid-feedback">
          {{errorValidation.email[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Role</label>
        <select class="form-control" :class="{'is-invalid': errorValidation.role}" v-model="form.role" id="">
          <option v-for="role in roles" :value="role.id">{{role.name}}</option>
        </select>
        <div v-if="errorValidation.role" class="invalid-feedback">
          {{errorValidation.role[0]}}
        </div>
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
        console.log(err.response)
        if(err.response.status === 422) {
          errorValidation.value = err.response.data.errors
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