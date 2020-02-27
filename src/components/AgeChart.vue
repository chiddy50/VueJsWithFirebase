<template>
  <div id="container-for-age-group"></div>
</template>

<script>
import { mapState } from 'vuex'
import Highcharts from 'highcharts'

export default {
  name: 'AgeChart',

  computed: {
    ...mapState(['users']),

    ageGroupData(){
      let age_0_19 = []
      let age_20_39 = []
      let age_40_59 = []
      let age_60_89 = []
      let age_90_above = []
      this.users.filter(user => {
        if (user.age >= "0" && user.age < "20") {
          age_0_19.push(user)
        }else if (user.age >= "20" && user.age < "40") {
          age_20_39.push(user)
        }else if (user.age >= "40" && user.age < "60") {
          age_40_59.push(user)
        }else if (user.age >= "60" && user.age < "90") {
          age_60_89.push(user)
        }else if (user.age >= "90") {
          age_90_above.push(user)
        }
      })
      return [ ['0-19yrs', age_0_19.length], ['20-39yrs', age_20_39.length], ['40-59yrs', age_40_59.length], ['60-89yrs', age_60_89.length], ['90yrs & above', age_90_above.length] ]
    }
  },
  mounted(){
    this.dataSource()
  },
  watch: {
    users(){
      this.dataSource()
    }
  },
  methods: {
    dataSource(){
      let age_groups = this.ageGroupData.map(group => group[0] )
      let population = this.ageGroupData.map(group => group[1] )

      this.setup({ age_groups, population })
    },
    setup(obj){
      const { age_groups, population } = obj
      Highcharts.chart('container-for-age-group', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Age Chart'
        },
        subtitle: {
          text: 'Source: ehealth4everyone.com'
        },
        xAxis: {
          categories: age_groups,
          crosshair: true,
          tickColor: 'orange'
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Population'
          },
        },

        series: [{
          name: 'Age Group',
          data: population
        }],
        colors: ['orange']
      })
    }
  }

}
</script>
