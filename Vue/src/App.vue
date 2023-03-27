<template>
  <div id="app_main">
    <main v-if="!loading"
      class="animate__animated animate__zoomIn"
      :style="{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url(${bg_img})`}"
    >
      <CurrentTemp />
      <CurrOthMtx />
      <Forcast />
      <TimeReload />
    </main>
    <Loader v-else />
  </div>
</template>

<script>
// Components
import CurrentTemp from './components/CurrentTemp.vue';
import CurrOthMtx from './components/CurrOthMtx/CurrOthMtx.vue';
import Forcast from './components/Forcast/Forcast.vue';
import TimeReload from './components/TimeReload.vue';
import Loader from './components/Loader.vue';
// Default Data
import Def_Data from './utils/default_data';

// Setting Options
export default {
  name: 'App',
  components: {Loader,CurrentTemp,CurrOthMtx,Forcast,TimeReload},
  data() {return {...Def_Data}}
};
</script>

<style scoped>
  /* Write Css */
</style>