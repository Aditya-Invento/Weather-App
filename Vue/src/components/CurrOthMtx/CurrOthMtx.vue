<template>
  <div class="curr_other_metc_wpr">
    <CurrMtx title='Feels Like' :val='getMtxVal("feelslike")' :unit='temp_unit' />
    <CurrMtx title='High' :val='getMtxVal("high")' :unit='temp_unit' />
    <CurrMtx title='Low' :val='getMtxVal("low")' :unit='temp_unit' />
    <CurrMtx title='UV Index' :val='getUvVal()' unit='def' :other='true' :uv='true' />
    <CurrMtx title='Wind' :val='getMtxVal("wind","dist")' :unit='dist_unit' :other='true' />
    <CurrMtx title='Precip' :val='getMtxVal("precip","measure")' :unit='measure_unit' :other='true' />
  </div>
</template>

<script>
import def_prop from '../../utils/def_prop';
// Component
import CurrMtx from './CurrMtx.vue';
// Setting Options
export default {
  // name:'CurrOthMtx',
  components: {CurrMtx},
  props: {
    curr_other_metrics:def_prop.get(Object,{
      high: {_f:'--',_c:'--'},low: {_f:'--',_c:'--'},
      feelslike: {_f:'--',_c:'--'},precip: {mm: '--',inch: '--'},
      wind: {kph: '--',mph: '--'},uv: '--',is_day: null,
    }),
    temp_unit:def_prop.get(String,'c'),
    dist_unit:def_prop.get(String,'kph'),
    measure_unit:def_prop.get(String,'inch')
  },
  data() {
    return {
      uv: this.curr_other_metrics.uv,
      is_day: this.curr_other_metrics.is_day
    };
  },
  methods: {
    getMtxVal(title,type='temp') {
      if(title === 'wind' || title === 'precip') {
        return this.curr_other_metrics[title][this[type+"_unit"]];
      }
      return this.curr_other_metrics[title]["_"+this[type+"_unit"]]
    },
    getUvVal() {
      return Boolean(this.is_day) ? this.uv : 0;
    }
  }
}
</script>