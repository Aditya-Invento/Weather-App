<template>
  <!-- Search Input -->
  <div class="search animate__animated animate__fadeInDown animate__delay-1s">
    <span><i class="fa-solid fa-magnifying-glass"></i></span>
    <!-- :disabled="search_by_new === 'auto'" -->
    <input @click="click_inp" v-model="search_inp" type="text" placeholder="Location by: city or zip-code?" />
  </div>
  <!-- Search Supporters -->
  <div class="search_supporters animate__animated animate__fadeInDown animate__delay-1s">
    <div class="search_supp">
      <input type="radio" value="auto" v-model="search_by_new" />
      <label>Auto Identify</label>
    </div>
    <div class="search_supp">
      <input type="radio" value="city" v-model="search_by_new" />
      <label>City</label>
    </div>
    <div class="search_supp">
      <input type="radio" value="zip" v-model="search_by_new" />
      <label>Zip-Code</label>
    </div>
  </div>
  <!-- Search Submit -->
  <button :style="refresh?{backgroundColor:'#8a8a8a',cursor:'not-allowed'}:{}" :disabled="refresh" @click="search_weather" class="animate__animated animate__fadeInDown animate__delay-1s">
    <span>{{refresh ? 'Loading...' : 'Submit'}}</span>
    <span v-if="!refresh"><i class="fa-solid fa-angle-right"></i></span>
  </button>
  <div class="note animate__animated animate__fadeInDown animate__delay-1s">
    <p class="note_1">*Note:- Search by zip-code ( Outside US )</p>
    <p>&lt;zip-code&gt;,&lt;country-code&gt; | Ex: 11062,IN</p>
  </div>
</template>

<script>
export default {
  props: {
    search_by: String,
    update_settings: Function,
    req_api: Function,
    refresh: Boolean
  },
  data() {
    return {
      search_inp: '',
      search_by_new: this.search_by
    }
  },
  methods: {
    click_inp() {
      const {search_by_new} = this;
      if(search_by_new === 'auto') this.search_by_new = 'city';
    },
    search_weather() {
      const {refresh,search_by,search_by_new,search_inp,req_api} = this;
      if(!refresh) {
        // search_by !== search_by_new && ( For Same Search Types )
        if(search_by_new === 'auto') req_api('?by=auto');
        if(search_by_new === 'city') req_api(`?by=city&val=${search_inp}`);
        if(search_by_new === 'zip') {
          const fragments = search_inp.split(',');
          if(fragments.length === 2) {
            const zip = fragments[0];
            const country = fragments[1].toLocaleUpperCase();
            if(country.length === 2 && zip.length) {
              req_api(`?by=zip&val=${zip}&country_code=${country}`);
            }
          }
        }
      }
    }
  }
}
</script>