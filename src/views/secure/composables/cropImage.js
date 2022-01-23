import { ref} from 'vue'
export default function cropImage() {
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
    const show = ref(false)
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
