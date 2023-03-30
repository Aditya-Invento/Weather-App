<template>
  <div id="settings_modal" class="settings animate__animated animate__fadeIn">
    <!-- Modal Close -->
    <span @click="toggle_settings" title="close" class="close_btn">
      <i class="fa-solid fa-xmark rotate_smooth"></i>
    </span>
    <!-- Search -->
    <Search :update_settings="update_settings" :search_by="settings.search_by" />
    <!-- Unit Ctrls -->
    <div class="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">
      <UnitCtrl
        v-for="(u,idx) in units"
        :key="idx"
        :type="u"
        :settings="settings"
        :update_settings="update_settings"
      />
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
import UnitCtrl from './UnitCtrl.vue';

export default {
  props: {
    settings: Object,
    toggle_settings: Function,
    update_settings: Function
  },
  data() {
    return {
      units: ['temp','dist','measure']
    }
  },
  components: {Search,UnitCtrl},
  methods: {}
}
</script>