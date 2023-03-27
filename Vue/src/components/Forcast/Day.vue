<template>
  <div :title="get_title" class="forcast animate__animated animate__flipInX animate__delay-1s">
    <p>{{ get_day }}</p>
    <div class="temp">
      <img :src="icon_link" alt="clear sky" title="clear sky" />
      <p>{{ get_temp }}&deg;{{ get_unit }}</p>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
export default {
  props: {
    req_url: String,
    temp_unit: String,
    date: String,
    temp_c: String,
    temp_f: String,
    icon: Number
  },
  computed: {
    get_day() {
      return this.date !== '--' ? Moment(new Date(this.date)).format('dddd') : this.date;
    },
    get_title() {
      return this.icon === 1000 ? 'Clear Sky' : this.icon;
    },
    icon_link() {
      return this.req_url+`/icons/${this.icon}d.svg`;
    },
    get_temp() {
      return this['temp_'+this.temp_unit];
    },
    get_unit() {
      return this.temp_unit.toLocaleUpperCase()
    }
  }
}
</script>