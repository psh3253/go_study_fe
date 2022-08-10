<template>
<Header></Header>
  <div class="d-flex justify-content-center">
  <form class="mx-3 my-3">
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" class="form-control" id="title" v-model="title" size="30">
    </div>
    <div class="mb-3">
      <label for="image" class="form-label">이미지 업로드</label>
      <input class="form-control" type="file" id="image" ref="image" @change="selectImage" accept="image/*">
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea class="form-control" id="content" v-model="content" rows="5"></textarea>
    </div>
    <button type="button" @click="savePost" class="btn btn-primary me-3">저장</button>
  </form>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import router from "@/router";

export default {
  name: "PostCreate",
  components: {
    Header
  },
  data() {
    return {
      title: null,
      content: null,
      image: null,
    }
  },
  methods: {
    savePost() {
      const vm = this;
      if(this.title === '') {
        alert('제목을 입력해주세요');
        return;
      } else if(this.content === '') {
        alert('내용을 입력해주세요');
        return;
      }
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      if (this.image !== null)
        formData.append('image', this.image[0]);
      this.axios.post('/api/v1/studies/' + this.$route.params.id + '/posts', formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }).then(function (response) {
        if(response.status === 200) {
          router.push('/studies/' + vm.$route.params.id);
        }
      }).catch(function(error) {
        console.error(error);
      });
    },
    selectImage() {
      this.image = this.$refs.image.files;
    },
  }
}
</script>

<style scoped>

</style>