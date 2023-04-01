<template>
  <div id="app_main">
    <template v-if="!main_data.loading">
      <main class="animate__animated animate__zoomIn"
        :style="{backgroundImage:`
          linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0) 100%), url(${get_bg_img})
        `}"
      >
        <!-- Settings Modal -->
        <SettingsComp
          v-if="main_data.settings.open"
          :settings="main_data.settings"
          :toggle_settings="toggle_settings"
          :update_settings="update_settings"
          :req_api="req_api"
          :refresh="main_data.refresh"
        />
        <!-- Main Content Starts Here -->
        <CurrentTemp
          :toggle_settings="toggle_settings"
          :curr_temp="main_data.curr_temp"
          :title="main_data.title"
          :location="main_data.location"
          :temp_unit="main_data.settings.temp"
        />
        <CurrOthMtx
          :curr_other_metrics="main_data.curr_other_metrics"
          :temp_unit="main_data.settings.temp"
          :dist_unit="main_data.settings.dist"
          :measure_unit="main_data.settings.measure"
        />
        <Forcast
          :req_url="main_data.req_url"
          :forcast_day="main_data.forcast_day"
          :temp_unit="main_data.settings.temp"
        />
        <TimeReload
          :loading="main_data.loading"
          :refresh="main_data.refresh"
          :refresh_api="req_api"
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
// Api Service
import Api_Service from './utils/api_service';

// Setting Options
export default {
  name: 'App',
  components: {Loader,CurrentTemp,CurrOthMtx,Forcast,TimeReload,SettingsComp},
  data() {
    return {
      main_data:Def_Data
    }
  },
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
      if(can_update[what]) this.main_data.settings = {...this.main_data.settings,[what]:to};
    },
    toggle_settings() {this.update_settings('open',!this.main_data.settings.open)},
    setResData(resData) {this.main_data = {...this.main_data,...resData}},
    toggle_load(reload) {
      if(!reload) this.main_data.loading = !this.main_data.loading;
      else this.main_data.refresh = !this.main_data.refresh;
    },
    req_api(cus_query) {
      Api_Service({
        req_url:this.main_data.req_url,
        setData:this.setResData,
        toggle_load:this.toggle_load,
        cus_query:cus_query
      });
    }
  },
  computed: {
    get_bg_img() {
      const {req_url,bg_img} = this.main_data;
      return req_url+'/bg_imgs/'+bg_img+'.png';
    }
  },
  created() {
    if(this.main_data.loading) this.req_api();
  },
  watch: {
    'main_data.refresh'(pre) {
      console.log('Refresh: ',pre);
    }
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
  .footer > p > a {
    font-weight: 700;
  }
</style>