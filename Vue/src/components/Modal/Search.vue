<template>
  <!-- Search Input -->
  <div class="search animate__animated animate__fadeInDown animate__delay-1s">
    <span><i class="fa-solid fa-magnifying-glass"></i></span>
    <input v-model="search_inp" type="text" placeholder="Location by: city or zip-code?" />
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
  <button class="animate__animated animate__fadeInDown animate__delay-1s">
    <span>Submit</span>
    <span><i class="fa-solid fa-angle-right"></i></span>
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
    update_settings: Function
  },
  data() {
    return {
      search_inp: '',
      search_by_new: this.search_by
    }
  },
  watch: {
    search_inp(data) {
      console.log(data);
    }
  }
}
</script>