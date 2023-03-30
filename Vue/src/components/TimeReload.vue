<template>
  <div class="time_reload animate__animated animate__fadeInUp animate__delay-1s">
    <p>{{ time }}</p>
    <div title="Refresh Weather">
      <span><i class="fa-solid fa-rotate-right"></i></span>
      <span @click="refresh_api">Refresh</span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  props: {
    refresh_api: {
      type: Function,
      default: ()=> 'refresh clicked'
    },
    loading: Boolean
  },
  data() {
    return {
      timeout: null,
      timer: null,
      time: '--:-- --'
    }
  },
  mounted() {
    this.timeout = setTimeout(()=>
      this.timer = setInterval(()=>
        this.time = Moment().format('hh:mm A')
      ,1000)
    ,1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  }
}
</script>