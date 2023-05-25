<template>
  <div class="time_reload animate__animated animate__fadeInUp animate__delay-1s">
    <p>{{ time }}</p>
    <div title="Refresh Weather">
      <span :style="refresh ? {display:'none'} : {}"><i class="fa-solid fa-rotate-right"></i></span>
      <span @click="refresh_api('?by=auto')">{{ refresh ? 'Loading...' : 'Refresh' }}</span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  props: {
    refresh_api: Function,
    loading: Boolean,
    refresh: Boolean
  },
  data() {
    return {
      timeout: null,
      timer: null,
      time: '--:-- --'
    }
  },
  mounted() {
    // Current Time
    this.timeout = setTimeout(()=>
      this.timer = setInterval(()=>
        this.time = Moment().format('hh:mm A')
      ,1000)
    ,1000);
    // Refresh API
    this.refresh_timer = setInterval(()=>this.refresh_api('?by=auto'),300000);
  },
  beforeUnmount() {
    // Current Time
    clearInterval(this.timer);
    clearTimeout(this.timeout);
    // Refresh API
    clearInterval(this.refresh_timer);
  }
}
</script>