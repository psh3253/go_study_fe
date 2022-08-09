<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="current-password" class="form-label">현재 비밀번호</label>
        <input type="password" class="form-control" id="current-password" v-model="current_password" size="30">
      </div>
      <div class="mb-3">
        <label for="new-password" class="form-label">새 비밀번호</label>
        <input type="password" class="form-control" id="new-password" v-model="new_password" size="30">
      </div>
      <div class="mb-3">
        <label for="confirm-new-password" class="form-label">새 비밀번호 확인</label>
        <input type="password" class="form-control" id="confirm-new-password" v-model="confirm_new_password" size="30">
      </div>
      <button type="button" @click="changePassword" class="btn btn-primary me-3">변경</button>
    </form>
  </div>

</template>

<script>
import Header from "@/components/common/Header";
import router from "@/router";

export default {
  name: "PasswordChange",
  components: {
    Header
  },
  data() {
    return {
      current_password: null,
      new_password: null,
      confirm_new_password: null
    }
  },
  methods: {
    changePassword() {
      if (this.current_password === '') {
        alert('현재 비밀번호를 입력해주세요.');
        return;
      } else if (this.new_password === '') {
        alert('새 비밀번호를 입력해주세요.');
        return;
      } else if (this.confirm_new_password === '') {
        alert('새 비밀번호 확인을 입력해주세요.');
        return;
      }
      this.axios.post('/api/v1/change-password', {
        current_password: this.current_password,
        new_password: this.new_password
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert('비밀번호가 변경되었습니다.');
          router.push('/profile');
        }
      }).catch(function (error) {
        alert('비밀번호가 일치하지 않습니다.');
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>

</style>