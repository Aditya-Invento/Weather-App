<template>
  <div id="settings_modal" class="settings animate__animated animate__fadeIn">
    <!-- Modal Close -->
    <span onclick="toggle_modal()" title="close" class="close_btn">
      <i class="fa-solid fa-xmark rotate_smooth"></i>
    </span>
    <!-- Search -->
    <Search />
    <!-- Unit Ctrls -->
    <div class="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">

    </div>
  </div>
</template>

<script>
import Search from './Search.vue';

export default {
  components: {Search},
}
</script>