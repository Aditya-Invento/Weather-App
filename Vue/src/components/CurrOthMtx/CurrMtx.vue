<template>
  <div class="curr_other_metc animate__animated animate__flipInX animate__delay-1s">
    <p>{{ title }} <span v-if='other&&!uv' style='font-size: 12px;'>{{ m_unit }}</span></p>
    <h3 v-if='other'>{{ val }}</h3>
    <h3 v-else>{{ val }}&deg;{{ m_unit }}</h3>
  </div>
</template>

<script>
// import {def_prop} from '../../utils/cusFuncs';
export default {
  props: {
    title: String,
    val: String,
    unit: String,
    other: Boolean,
    uv: Boolean

    // title: def_prop(String,'--'),
    // val: def_prop(String,''),
    // unit: def_prop(String,'c'),
    // other: def_prop(Boolean,false),
    // uv: def_prop(Boolean,false)
  },
  computed: {
    m_unit() {
      return this.unit.toLocaleUpperCase()
    }
  },
}
</script>