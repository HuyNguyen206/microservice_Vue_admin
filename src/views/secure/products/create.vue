<template>
  <div class="col-9">
    <form action="" @submit.prevent="create" class="form pt-5">
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
        <button class="btn btn-primary form-control">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import myUpload from 'vue-image-crop-upload'
export default {
  name: "create",
  components:{
    myUpload
  },
  setup(){
    const router = useRouter()
    const errorValidation = ref({})
    const show = ref(false)
    const form = ref({
      title: null,
      description:null,
      price: null
    })
    const apiDomain = ref(`${process.env.VUE_APP_ROOT_API}products`)
    const eng = ref({
      hint: 'Click or drag the file here to upload',
      loading: 'Uploading…',
      noSupported: 'Browser is not supported, please use IE10+ or other browsers',
      success: 'Upload success',
      fail: 'Upload failed',
      preview: 'Preview',
      btn: {
        off: 'Cancel',
        close: 'Close',
        back: 'Back',
        save: 'Save'
      },
      error: {
        onlyImg: 'Image only',
        outOfSize: 'Image exceeds size limit: ',
        lowestPx: 'Image\'s size is too low. Expected at least: '
      }
    })
    const headers = ref({
      smail: '*_~',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json'
    })
    const imgDataUrl = ref('')
    function toggleShow() {
      show.value = !show.value;
    }
  /** crop success
    *
    * [param] imgDataUrl
    * [param] field
    */
    function cropSuccess(imgDataUrl2, field){
      console.log('-------- crop success --------');
      imgDataUrl.value = imgDataUrl2;
    }
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    function cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    }
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    function cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
   return {
      form,
      errorValidation,
     headers,
     cropUploadFail,
     cropSuccess,
     cropUploadSuccess,
     imgDataUrl,
     toggleShow,
     show,
     eng,
     apiDomain
   }
  }
}
</script>

<style scoped>

</style>