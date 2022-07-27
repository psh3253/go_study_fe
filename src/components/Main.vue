<template>
  <Header></Header>
  <router-link to="/studies/create" class="btn btn-primary">스터디 생성</router-link>
</template>

<script>
import Header from './common/Header';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>