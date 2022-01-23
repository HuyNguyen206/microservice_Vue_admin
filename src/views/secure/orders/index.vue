<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Orders</h1>
    </div>
    <div class="d-flex justify-content-between flex-wrap btn-toolbar">
      <a @click.prevent="exportCSV" class="btn btn-sm btn-outline-secondary">Export</a>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
        </tr>
        </thead>
        <tbody v-if="orders">
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{index = index + (currentPage-1)*perPage + 1}}</td>
          <td>{{order.first_name}}</td>
          <td>{{order.last_name}}</td>
          <td>{{order.email}}</td>
          <td>
            <div class="btn-group">
              <router-link :to="{name: 'orders.view', params:{id: order.id}}" href=""  class="btn btn-primary">View</router-link>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
   <paginator @fetchData="fetchOrder" :paginationData="paginationData"></paginator>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRouter} from  'vue-router'
import paginator from "../components/paginator";
export default {
  name: "OrderList",
  components:{paginator},
  setup(){
    const router = useRouter()
    const orders = ref([])
    const paginationData = ref({})
    const currentPage = ref(1);
    const perPage = ref(5);
    const fetchOrder = (url = 'orders?page=1') => {
      axios.get(`${url}`)
          .then(res => {
            orders.value = res.data.data.data
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
      fetchOrder();
    })
    function exportCSV(){
      axios.get('orders/export/csv', {responseType: 'blob'})
      .then(res => {
        // const blob = new Blob([res.data], {type: 'text/csv'})
        const downloadUrl = window.URL.createObjectURL(res.data)
        const link = document.createElement('a');
        link.href = downloadUrl
        link.download = 'order.csv'
        link.click()
      })
    }
    return {
      orders,
      currentPage,
      perPage,
      paginationData,
      fetchOrder,
      exportCSV
    }
  }
}
</script>

<style scoped>

</style>