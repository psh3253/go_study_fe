<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">GoStudy</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </router-link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" v-if="isLogin === 'false' || isLogin === null">
            <router-link class="btn btn-outline-primary me-3" to="/login">로그인</router-link>
            <router-link class="btn btn-outline-primary" to="/join">회원가입</router-link>
          </form>
          <form class="d-flex" v-else>
            <button class="btn btn-outline-primary" @click=logout>로그아웃</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
//import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      isLogin: this.$cookies.get('IsLogin'),
    }
  },
  methods: {
    logout() {
      this.axios.post("/logout", {}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
      })
      .then(function (response) {
        if(response.status === 200) {
          localStorage.setItem('isLogin', 'false');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>