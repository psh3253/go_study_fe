<template>
  <div class="d-flex justify-content-end">
    <router-link :to="'/studies/' + study.id + '/posts/create'" class="btn btn-primary mb-3">
      게시글 작성
    </router-link>
  </div>
  <div v-if="!isSelectedPost" class="d-flex justify-content-center">
    <div class="w-100">
      <table class="table table-bordered table-hover">
        <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>
            <div class="d-flex justify-content-between" @click="getPost(post.id)">
              <div class="d-flex flex-column me-3">
                <p class="fw-bold h5">{{ post.title }}</p>
                <p>{{ post.creatorNickname }}</p>
              </div>
              <div class="d-flex">
                <div class="d-flex me-3 align-items-center">
                  <img v-if="post.image !== null" :src="api_url + '/images/post/' + post.image"
                       style="width: 64px; height: 64px">
                </div>
                <div class="me-3 bg-secondary rounded-pill">
                  <p class="text-center mx-3 mt-3 fw-bold">댓글</p>
                  <p class="text-center mx-3 mb-3 fw-bold">{{post.commentCount}}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="d-flex flex-column">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div class="d-flex mx-3">
          <img :src="api_url + '/images/post/' + post.image" alt="" width="64" height="64" class="rounded-circle">
        </div>
        <div class="d-flex flex-column">
          <p class="fw-bold">{{post.creatorNickname}}</p>
          <p>{{post.created_at}}</p>
        </div>
      </div>
      <div class="mx-3 my-3">
        <button type="button" class="btn btn-primary" @click="isSelectedPost=false">목록</button>
      </div>
    </div>
    <p class="fw-bold h3 mx-3 mb-3">{{post.title}}</p>
    <p class="mx-3 mb-3">{{post.content}}</p>
    <div class="mx-3 mb-3">
      <img :src="api_url + '/images/post/' + post.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyPost",
  props: ['posts', 'study'],
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      isSelectedPost: false,
      post: null
    }
  },
  methods: {
    getPost(post_id) {
      const vm = this;
      this.axios.get('/api/v1/studies/' + this.study.id + '/posts/' + post_id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function(response) {
        if(response.status === 200) {
          vm.post = response.data;
          vm.isSelectedPost = true;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>