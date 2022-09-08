<template>
<div>
  <form class="mx-3 my-3">
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" class="form-control" id="title" v-model="title" size="30">
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea class="form-control" id="content" v-model="content" rows="5"></textarea>
    </div>
    <button type="button" @click="updatePost" class="btn btn-primary me-3">수정</button>
  </form>
</div>
</template>

<script>

export default {
  name: "PostUpdate",
  props: ['study', 'post'],
  data() {
    return {
      id: null,
      title: null,
      content: null
    }
  },
  created() {
    this.title = this.post.title;
    this.content = this.post.content;
    this.id = this.post.id;
  },
  methods: {
    async updatePost() {
      const vm = this;
      if(this.title === '') {
        alert('제목을 입력해주세요');
        return;
      } else if(this.content === '') {
        alert('내용을 입력해주세요.');
      }
      await this.axios.patch('/api/v1/studies/' + this.study.id + '/posts/' + this.post.id, {
        id: this.id,
        title: this.title,
        content: this.content
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(function (response) {
        if(response.status === 200) {
          if(response.data.accessToken !== undefined)
          {
            vm.updatePost();
            return;
          }
          vm.$emit('updatePosts');
        }
      }).catch(function(error) {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>

</style>