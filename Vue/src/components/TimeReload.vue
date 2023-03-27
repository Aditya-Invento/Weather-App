<template>
  <div class="time_reload animate__animated animate__fadeInUp animate__delay-1s">
    <p>{{ time }}</p>
    <div title="Refresh Weather">
      <span><i class="fa-solid fa-rotate-right"></i></span>
      <span>Refresh</span>
    </div>
  </div>
</template>

<script>
import def_prop from '../utils/def_prop';
import Moment from 'moment';

export default {
  props: {
    refresh_api: def_prop.get(Function,()=>{}),
    loading: def_prop.get(Boolean,true)
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