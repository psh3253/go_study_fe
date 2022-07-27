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
      <div class="mb-3">
        <label for="nickname" class="form-label">닉네임</label>
        <input type="text" class="form-control" id="nickname" v-model="nickname" size="30">
      </div>
      <button type="button" @click="join" class="btn btn-primary me-3">회원가입</button>
    </form>
  </div>
</template>

<script>
import router from "@/router"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Join",
  data() {
    return {
      email: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    join() {
      this.axios.post('/api/v1/join', {
        'email': this.email,
        'password': this.password,
        'nickname': this.nickname
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if(response.status === 200) {
          router.push('/');
        }
      }).catch(function (error) {
        console.error(error);
        alert('회원가입에 실패하였습니다.')
      })
    }
  }
}
</script>

<style scoped>

</style>