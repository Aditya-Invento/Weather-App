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
// import {def_prop} from '../../utils/cusFuncs';
export default {
  components: {DayComp},
  props: {
    req_url: String,
    forcast_day: Array,
    temp_unit: String

    // forcast_day: def_prop(Array,new Array(2).fill({date: '--',temp_c: '--',temp_f: '--',icon: 100})),
    // temp_unit: def_prop(String,'c')
  }
}
</script>