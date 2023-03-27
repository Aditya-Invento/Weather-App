<template>
  <div class="forcast_wpr">
    <DayComp
      v-for="(day,idx) in forcast_day"
      v-bind="{...day}"
      :req_url="req_url"
      :temp_unit="temp_unit"
      :key="idx"
    />
  </div>
</template>

<script>
import DayComp from './Day.vue';
import def_prop from '../../utils/def_prop';
export default {
  components: {DayComp},
  props: {
    req_url: String,
    forcast_day: def_prop.get(Array,new Array(2).fill({date: '--',temp_c: '--',temp_f: '--',icon: 100})),
    temp_unit: def_prop.get(String,'c')
  }
}
</script>