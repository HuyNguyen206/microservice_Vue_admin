<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Products</h1>
    </div>
    <div class="d-flex justify-content-between flex-wrap btn-toolbar">
      <router-link :to="{name:'products.create'}" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody v-if="products">
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{index = index + (currentPage-1)*perPage + 1}}</td>
          <td>{{product.title}}</td>
          <td>{{product.description}}</td>
          <td>{{product.price}}</td>
          <td>
            <img width="200" height="200" :src="product.image" alt="">
          </td>
          <td>
            <div class="btn-group">
              <router-link :to="{name: 'products.edit', params:{id: product.id}}" href=""  class="btn btn-primary">Edit</router-link>
              <a href="" @click.prevent="deleteProduct(product.id)" class="btn btn-danger">Delete</a>
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
  name: "ProductList",
  setup(){
    const router = useRouter()
    const products = ref([])
    const paginationData = ref({})
    const currentPage = ref(1);
    const perPage = ref(20);
    const fetchProduct = (url = 'products?page=1') => {
      axios.get(`${url}`)
          .then(res => {
            products.value = res.data.data.data
            paginationData.value = res.data.data.links
            currentPage.value = res.data.data.meta.current_page
            perPage.value = res.data.data.meta.per_page
          })
          .catch(err => {
            if (err.response.status === 401) {
              localStorage.removeItem('token')
              router.push({name: 'Login'})
            }
          })
    }
    onMounted(() =>{
      fetchProduct();
    })
    const nextPage = computed( () => {
      return paginationData.value?.next
    })
    const previousPage = computed( () => {
      return paginationData.value?.prev
    })

    function next(){
       fetchProduct(nextPage.value)
    }
    function previous(){
       fetchProduct(previousPage.value)
    }

    function deleteProduct(id){
      if (confirm('Are you sure to delete?')) {
        axios.delete(`products/${id}`)
            .then(res => {
              fetchProduct()
            })
            .catch(err => {

            })
      }
    }
    return {
      products,
      next,
      previous,
      nextPage,
      previousPage,
      currentPage,
      perPage,
      deleteProduct
    }
  }
}
</script>

<style scoped>

</style>