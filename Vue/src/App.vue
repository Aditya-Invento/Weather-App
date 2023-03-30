<template>
  <div id="app_main">
    <template v-if="!loading">
      <main class="animate__animated animate__zoomIn"
        :style="{backgroundImage:`
          linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0) 100%), url(${bg_img})
        `}"
      >
        <!-- Settings Modal -->
        <SettingsComp
          v-if="settings.open"
          :settings="settings"
          :toggle_settings="toggle_settings"
          :update_settings="update_settings"
        />
        <!-- Main Content Starts Here -->
        <CurrentTemp
          :toggle_settings="toggle_settings"
          :curr_temp="curr_temp"
          :title="title"
          :location="location"
          :temp_unit="settings.temp"
        />
        <CurrOthMtx
          :curr_other_metrics="curr_other_metrics"
          :temp_unit="settings.temp"
          :dist_unit="settings.dist"
          :measure_unit="settings.measure"
        />
        <Forcast
          :req_url="req_url"
          :forcast_day="forcast_day"
          :temp_unit="settings.temp"
        />
        <TimeReload
          :loading="loading"
        />
      </main>
      <footer class='footer animate__animated animate__fadeInUp'>
        <p>Made With <i class="fa-solid fa-heart"></i> By <a target="_blank" href="https://github.com/Aditya-Invento/">Aditya Burmam</a></p>
      </footer>
    </template>
    <Loader v-else />
  </div>
</template>

<script>
// Components
import CurrentTemp from './components/CurrentTemp.vue';
import CurrOthMtx from './components/CurrOthMtx/CurrOthMtx.vue';
import Forcast from './components/Forcast/Forcast.vue';
import TimeReload from './components/TimeReload.vue';
import SettingsComp from './components/Modal/Settings.vue';
import Loader from './components/Loader.vue';
// Default Data
import Def_Data from './utils/default_data';

// Setting Options
export default {
  name: 'App',
  components: {Loader,CurrentTemp,CurrOthMtx,Forcast,TimeReload,SettingsComp},
  data() {return {...Def_Data}},
  methods: {
    update_settings(what,to) {
      const can_update = {
        open:1,//true / false
        country_code: 1,//NA / <num>
        temp: 1,//c / f
        dist: 1,//mph / kph
        measure: 1,//mm / inch
        search_by: 1// auto / city / zip
      }
      if(can_update[what]) this.settings = {...this.settings,[what]:to};
    },
    toggle_settings() {this.update_settings('open',!this.settings.open)}
  }
};
</script>

<style scoped>
  .footer {
    margin-top: 30px;
  }
  .footer > p {
    font-size: 20px;
    font-weight: 500;
  }
</style>