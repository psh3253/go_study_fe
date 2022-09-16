<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GoStudy</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        </ul>
        <form class="d-flex" v-if="isLogin === 'false' || isLogin === null">
          <router-link class="btn btn-outline-primary me-3" to="/login">로그인</router-link>
          <router-link class="btn btn-outline-primary" to="/join">회원가입</router-link>
        </form>
        <form class="d-flex" v-else>
          <router-link class="btn btn-outline-primary me-3" to='/profile'>프로필</router-link>
          <button class="btn btn-outline-primary" @click=logout>로그아웃</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      isLogin: this.$cookies.get('IsLogin'),
    }
  },
  methods: {
    async logout() {
      const vm = this;
      await this.axios.post("/logout", {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
      })
          .then(function (response) {
            if (response.status === 200) {
              if(response.data.accessToken !== undefined)
              {
                vm.logout();
                return;
              }
              window.location.href = '/';
            }
          }).catch(function (error) {
        console.error(error);
      })
    }
  }
}
</script>

<style scoped>

</style>