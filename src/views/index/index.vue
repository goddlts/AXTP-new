<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎回来: {{ profile.fullname }}</div>
    <div class="dashboard-text">role: {{ profile.role }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'profile'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 46px;
  }
}
</style>
