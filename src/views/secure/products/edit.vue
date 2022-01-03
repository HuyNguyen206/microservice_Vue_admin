<template>
  <div class="col-9">
    <form action="" @submit.prevent="update" class="form pt-5">
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
        <input disabled type="text" class="form-control" v-model="form.email">
      </div>
      <div class="form-group pb-4">
        <label>Role</label>
        <select multiple class="form-control" :class="{'is-invalid': errorValidation.roles}" v-model="form.roles" id="">
          <option v-for="role in roles" :value="role.id" :selected="hasRole(role.id)">{{role.name}}</option>
        </select>
        <div v-if="errorValidation.roles" class="invalid-feedback">
          {{errorValidation.roles[0]}}
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary form-control">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
export default {
  name: "create",
  setup(){
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      first_name: null,
      last_name:null,
      email: null,
      roles:null
    })
    const errorValidation = ref({})
    const roles = ref([])
    onMounted(() => {
      axios.get('roles')
      .then(res => {
        roles.value = res.data.data
      })
      axios.get(`users/${route.params.id}`)
          .then(res => {
            form.value = res.data.data
          })
    })

    function hasRole(id){
      form.value.roles.some((role) => {
        return role.id === id
      })
    }
    function update(){
      axios.put(`users/${route.params.id}`, form.value)
      .then(res => {
        alert('Update successfully!')
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
      update,
      form,
      errorValidation,
      roles,
      hasRole
    }
  }
}
</script>

<style scoped>

</style>