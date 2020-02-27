<template>
  <div id="container-for-blood-group"></div>
</template>

<script>
import { mapState } from 'vuex';
import Highcharts from 'highcharts';

export default {
  name: 'BloodGroupChart',
  computed: {
    ...mapState(['users']),

    bloodGroupData(){
      let o_negative = []
      let o_positive = []
      let a_negative = []
      let a_positive = []
      let b_positive = []
      let b_negative = []
      let ab_negative = []
      let ab_positive = []

			this.users.filter(user => {
				if (user.blood_group === 'O-') {
          o_negative.push(user)
				}else if (user.blood_group === 'O+') {
          o_positive.push(user)
        }else if (user.blood_group === 'A+') {
          a_positive.push(user)
        }else if (user.blood_group === 'A-') {
          a_negative.push(user)
        }else if (user.blood_group === 'B+') {
          b_positive.push(user)
        }else if (user.blood_group === 'B-') {
          b_negative.push(user)
        }else if (user.blood_group === 'AB+') {
          ab_positive.push(user)
        }else if (user.blood_group === 'AB-') {
          ab_negative.push(user)
        }

      })
      return [['0-', o_negative.length], ['O+', o_positive.length], ['A+', a_positive.length], ['A-', a_negative.length], ['B+', b_positive.length], ['B-', b_negative.length], ['AB+', ab_positive.length], ['AB-', ab_negative.length]]

    }
  },
  mounted: function(){
    this.dataSource()
  },
  watch: {
    users(){
      this.dataSource()
    }
  },
  methods: {
    dataSource(){

      let blood_groups = this.bloodGroupData.map(group => group[0] )
      let population = this.bloodGroupData.map(group => group[1] )

      this.setup({ blood_groups, population })

    },
    setup(obj){
      const { blood_groups, population } = obj
      Highcharts.chart('container-for-blood-group', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Blood Group Chart'
        },
        subtitle: {
          text: 'Source: ehealth4everyone.com'
        },
        xAxis: {
          categories: blood_groups,
          crosshair: true,
          allowDecimals: false
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Population'
          }
        },

        series: [{
          name: 'Blood Group',
          data: population
        }]
      })
    }
  }

}
</script>
