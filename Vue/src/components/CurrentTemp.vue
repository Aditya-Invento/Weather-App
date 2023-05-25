<template>
  <div class="curr_temp animate__animated animate__fadeInDown animate__delay-1s">
    <h1>{{ m_curr_temp }}&deg;{{ unit }}</h1>
    <span @click="toggle_settings" title="Open Settings" class="rotate_smooth"><i class="fa-solid fa-gear"></i></span>
  </div>
  <div class="tempDesc_place animate__animated animate__fadeInDown animate__delay-1s">
    <p>{{ m_title }}</p>
    <span>{{ location }}</span>
  </div>
</template>

<script>
// Utils
// import {def_prop} from '../utils/cusFuncs';

export default {
  props: {
    toggle_settings: Function,
    curr_temp: Object,
    title: String,
    location: String,
    temp_unit: String
    // toggle_settings: def_prop(Function,()=>{}),
    // curr_temp: def_prop(Object,{_f:'--',_c:'--'}),
    // title: def_prop(String,'--'),
    // location: def_prop(String,'--'),
    // temp_unit: def_prop(String,'c')
  },
  computed: {
    m_title() {return this.title === 'Sunny'? 'Clear Sky' : this.title},
    unit() {return this.temp_unit.toLocaleUpperCase()},
    m_curr_temp() {return this.curr_temp['_'+this.temp_unit]}
  }
}
</script>