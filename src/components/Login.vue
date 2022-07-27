<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="email" class="form-label">이메일</label>
        <input type="email" class="form-control" id="email" v-model="email" size="30">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">비밀번호</label>
        <input type="password" class="form-control" id="password" v-model="password" size="30">
      </div>
      <button type="button" @click="login" class="btn btn-primary me-3">로그인</button>
      <a :href=kakao_login_url><img src="./../assets/kakao_login_medium.png" alt=""></a>
    </form>
  </div>
</template>

<script>
import Header from './common/Header';
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: '',
      kakao_login_url: process.env.VUE_APP_API_URL + "/oauth2/authorization/kakao"
    }
  },
  methods: {
    login() {
      this.axios.post('/api/v1/login',
          {
            'email': this.email,
            'password': this.password
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
          })
          .then(function (response) {
            if (response.status === 200) {
              router.push('/');
            }
          })
          .catch(function (error) {
            console.error(error);
            alert("아이디와 비밀번호가 일치하지 않습니다.");
          })
    }
  }
}
</script>

<style scoped>

</style>