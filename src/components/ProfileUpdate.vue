<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="nickname" class="form-label">닉네임</label>
        <input type="text" class="form-control" id="nickname" v-model="nickname" size="30">
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">이미지 업로드</label>
        <input class="form-control" type="file" id="image" ref="image" @change="selectImage" accept="image/*"
               v-bind:disabled="is_image_disabled">
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="use-default-image" v-model="is_image_disabled">
          <label class="form-check-label" for="use-default-image">
            기본 이미지 사용
          </label>
        </div>
      </div>
      <div class="mb-3">
        <label for="introduce" class="form-label">소개({{ introduce.length }}/50)</label>
        <textarea class="form-control" id="introduce" v-model="introduce" rows="3"></textarea>
      </div>
      <button type="button" @click="saveProfile" class="btn btn-primary me-3">저장</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import router from "@/router";

export default {
  name: "ProfileUpdate",
  components: {
    Header
  },
  data() {
    return {
      is_image_disabled: false,
      nickname: null,
      introduce: "",
      isLogin: this.$cookies.get('IsLogin')
    }
  },
  async created() {
    const vm = this;
    if (this.isLogin === null || this.isLogin === 'false') {
      window.location.href = '/login';
      return;
    }
    await this.axios.get('/api/v1/my-profile', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    }).then(function (response) {
      if (response.status === 200) {
        if(response.data.accessToken !== undefined)
          router.go();
        const profile = response.data;
        vm.nickname = profile.nickname;
        if(profile.introduce != null)
          vm.introduce = profile.introduce;
      }
    }).catch(function(error) {
      console.error(error);
    });
  },
  methods: {
    selectImage() {
      this.image = this.$refs.image.files;
    },
    async saveProfile() {
      const vm = this;
      if (this.nickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
      } else if (!this.is_image_disabled && this.image === null) {
        alert('기본 이미지를 선택하거나 이미지를 업로드 해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('nickname', this.nickname);
      formData.append('setDefaultImage', this.is_image_disabled);
      if (this.image !== null)
        formData.append('image', this.image[0]);
      formData.append('introduce', this.introduce);
      await this.axios.patch('/api/v1/profile', formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.saveProfile();
            return;
          }
          router.push('/profile');
        }
      }).catch(function (error) {
        console.error(error);
      })
    }
  },
  watch: {
    introduce: function () {
        this.introduce = this.introduce.substring(0, 50);
    },
    is_image_disabled: function () {
      if (this.is_image_disabled === true) {
        this.image = null;
        document.getElementById('image').value = '';
      }
    }
  }
}
</script>

<style scoped>

</style>