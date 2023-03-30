<template>
  <div class="mtrix_ctrl_wpr">
    <p>{{ types[type].title }}</p>
    <div title="Click me!" class="mtrix_ctrl" @click="change_units(type)">
      <span :class="is_sel(type,0) ? 'sel' : ''">{{ get_val(type,0) }}</span>
      <span :class="is_sel(type,1)?'switch on':'switch'"><i class="fa-solid fa-toggle-off"></i></span>
      <span :class="is_sel(type,1) ? 'sel' : ''">{{ get_val(type,1) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    settings: Object,
    update_settings: Function
  },
  data() {
    return {
      types: {
        dist: {title:'Dist Speed',vals:['kph','mph']},
        temp: {title:'Tempreture',vals:['f','c']},
        measure: {title:'Measurement',vals:['inch','mm']}
      }
    }
  },
  methods: {
    get_val(type,pos) {
      return `${this.types[type].vals[pos].toLocaleUpperCase()}${this.types[type].vals[pos]==='f'?'°':''}`;
    },
    is_sel(type,pos) {
      return this.settings[type] === this.types[type].vals[pos];
    },
    change_units(type) {
      const exp = this.settings[type] === this.types[type].vals[0] ? this.types[type].vals[1] : this.types[type].vals[0];
      this.update_settings(type,exp);
    }
  }
}
</script>