<template>
  <div class="curr_other_metc animate__animated animate__flipInX animate__delay-1s">
    <p>{{ title }} <span v-if='other&&!uv' style='font-size: 12px;'>{{ m_unit }}</span></p>
    <h3 v-if='other'>{{ val }}</h3>
    <h3 v-else>{{ val }}&deg;{{ m_unit }}</h3>
  </div>
</template>

<script>
import def_prop from '../../utils/def_prop';
export default {
  props: {
    title: def_prop.get(String,'--'),
    val: def_prop.get(String,''),
    unit: def_prop.get(String,'c'),
    other: def_prop.get(Boolean,false),
    uv: def_prop.get(Boolean,false)
  },
  created() {
    // console.log('title ',this.title);
    // console.log('val ',this.val);
    // console.log('unit ',this.unit);
    // console.log('other ',this.other);
    // console.log('uv ',this.uv);
  },
  computed: {
    m_unit() {
      return this.unit.toLocaleUpperCase()
    }
  },
}
</script>