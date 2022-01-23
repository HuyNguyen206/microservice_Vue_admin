<template>
  <div class="col-9">
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
        </tr>
        </thead>
        <tbody v-if="orderItems">
        <tr v-for="(orderItem, index) in orderItems" :key="orderItem.id">
          <td>{{index = index + (currentPage-1)*perPage + 1}}</td>
          <td>{{orderItem.product_title}}</td>
          <td>{{orderItem.price}}</td>
          <td>{{orderItem.quantity}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <paginator @fetchData="fetchOrderItem" :paginationData="paginationData"></paginator>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import paginator from "../components/paginator";
export default {
  name: "orderItem",
  components:{paginator},
  setup(){
    const router = useRouter()
    const route = useRoute()
    const orderItems = ref([])
    const errorValidation = ref({})
    const paginationData = ref({})
    const currentPage = ref(1);
    const perPage = ref(5);
    const fetchOrderItem = (url = `orders/${route.params.id}?page=1`) => {
      axios.get(`${url}`)
          .then(res => {
            orderItems.value = res.data.data.data
            paginationData.value = res.data.data.links
            currentPage.value = res.data.data.meta.current_page
            perPage.value = res.data.data.meta.per_page
          })
          .catch(err => {
            if (err.reponse.status === 401) {
              localStorage.removeItem('token')
              router.push({name: 'Login'})
            }
          })
    }
    onMounted(() => {
      fetchOrderItem()
    })

    return {
      orderItems,
      currentPage,
      perPage,
      paginationData,
      errorValidation,
      fetchOrderItem
    }
  }
}
</script>

<style scoped>

</style>