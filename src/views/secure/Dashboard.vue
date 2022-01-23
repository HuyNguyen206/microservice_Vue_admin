<template>
  <h2>Daily sales</h2>
  <div id="chart"></div>
</template>

<script>
import {onMounted} from "vue";
import * as c3 from 'c3'

export default {
  name: "Dashboard",
  setup() {
    onMounted(() => {
      const chart = c3.generate({
        bindto: '#chart',
        data:{
          x: 'x',
          columns: [
              ['x'],
              ['Sales']
          ],
          types: {
            Sales: 'bar'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      })

      axios.get('dashboard/chart')
      .then(res => {
        chart.load({
          columns: [
              ['x', ...res.data.data.map(r => r.date)],
              ['Sales', ...res.data.data.map(r => r.revenue)]
          ]
        })
      })
    })
  }

}
</script>


<style scoped>

</style>