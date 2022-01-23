<template>
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
import {computed} from "vue";

export default {
  name: "paginator",
  props:['paginationData'],
  setup(props, context) {
    const nextPage = computed( () => {
      return props.paginationData?.next
    })
    const previousPage = computed( () => {
      return props.paginationData?.prev
    })

    function next(){
      context.emit('fetchData', `${nextPage.value}`)
      console.log('nextPage.value '+ nextPage.value)
      // fetchProduct(nextPage.value)
    }
    function previous(){
      context.emit('fetchData',  `${previousPage.value}`)
      // fetchProduct(previousPage.value)
    }
    return {
      nextPage,
      previousPage,
      next,
      previous
    }
  }
}
</script>

<style scoped>

</style>