<template>
  <div class="col-9">
    <form action="" @submit.prevent="update" class="form pt-5">
      <div class="form-group pb-4">
        <label>Title</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.title}" v-model="form.title">
        <div v-if="errorValidation.title" class="invalid-feedback">
          {{errorValidation.title[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Description</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.description}" v-model="form.description">
        <div v-if="errorValidation.description" class="invalid-feedback">
          {{errorValidation.description[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <label>Price</label>
        <input type="text" class="form-control" :class="{'is-invalid': errorValidation.price}" v-model="form.price">
        <div v-if="errorValidation.price" class="invalid-feedback">
          {{errorValidation.price[0]}}
        </div>
      </div>
      <div class="form-group pb-4">
        <a class="btn btn-secondary btn-sm" @click="toggleShow">Select image</a>
        <myUpload field="image"
                  @crop-success="cropSuccess"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                  v-model="show"
                  :width="100"
                  :height="100"
                  :url="apiDomain"
                  :params="form"
                  :headers="headers"
                  img-format="png"
                  :langExt="eng"></myUpload>
        <img :src="imgDataUrl">
      </div>
      <div class="form-group">
        <button class="btn btn-primary form-control">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import myUpload from "vue-image-crop-upload";
import cropImage from "../composables/cropImage";
export default {
  name: "edit",
  components:{
    myUpload
  },
  setup(){
    const route = useRoute()
    const errorValidation = ref({})
    const form = ref({
      title: null,
      description:null,
      price: null
    })
    onMounted((apiDomain) => {
      axios.get(`products/${route.params.id}`)
      .then(res => {
        form.value = res.data.data
        imgDataUrl.value = res.data.data.image
      })
    })
    const cropImageData = cropImage()
    return {
      form,
      errorValidation,
      ...cropImageData
    }
  }
}
</script>

<style scoped>

</style>