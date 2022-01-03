<template>
  <div class="col-9">
    <form action="" @submit.prevent="create" class="form pt-5">
      <div class="form-group pb-4">
        <label>Name</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.name}" v-model="form.name">
        <div v-if="errorValidation.name" class="invalid-feedback">
          {{errorValidation.name[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Permissions</label>
        <vSelect multiple :options="permissions" label="name" :class="{'is-invalid': errorValidation.permissions}" v-model="form.permissions">
          <template #search="{attributes, events}">
            <input
                class="vs__search"
                :required="!form.permissions"
                v-bind="attributes"
                v-on="events"
            />
          </template>
        </vSelect>
        <div v-if="errorValidation.permissions" class="invalid-feedback">
          {{errorValidation.permissions[0]}}
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {useRouter} from 'vue-router'
export default {
  name: "create",
  components: {vSelect},
  setup(){
    const router = useRouter()
    const form = ref({
      name: null,
      permissions:[]
    })
    const permissions = ref([])
    onMounted(() => {
      axios.get('permissions')
      .then(res => {
        permissions.value = res.data.data
      })
    })
    const errorValidation = ref({})
    function create(){
      axios.post(`roles`, form.value)
      .then(res => {
        alert('Create successfully!')
        router.push({name: 'roles.index'})
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
      permissions
    }
  }
}
</script>

<style scoped>

</style>