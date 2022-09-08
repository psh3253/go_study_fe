<template>
  <div class="d-flex justify-content-end mb-3">
    <button type="button" class="btn btn-primary me-3" @click="updatePosts">목록</button>
    <button type="button" class="btn btn-primary" @click="openCreatePostPage">
      게시글 작성
    </button>
  </div>
  <div v-if="mode === 0" class="d-flex justify-content-center">
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
                <div class="me-3 bg-light rounded-pill">
                  <p class="text-center mx-3 mt-3 fw-bold">댓글</p>
                  <p class="text-center mx-3 mb-3 fw-bold">{{ post.commentCount }}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="mode === 1" class="d-flex flex-column">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div class="d-flex mx-3">
          <img v-if="!post.creatorImage.startsWith('http')" :src="api_url + '/images/profile/' + post.creatorImage"
               alt="" width="64" height="64" class="rounded-circle">
          <img v-else :src="post.creatorImage" alt="" width="64" height="64" class="rounded-circle">
        </div>
        <div class="d-flex flex-column">
          <p class="fw-bold">{{ post.creatorNickname }}</p>
          <p>{{ post.created_at }}</p>
        </div>
      </div>
      <div class="mx-3 my-3">
        <button v-if="post.creatorEmail === user_email" type="button" class="btn btn-primary me-3"
                @click="openUpdatePostPage">수정
        </button>
        <button v-if="post.creatorEmail === user_email" type="button" class="btn btn-danger me-3"
                @click="deletePost(post.id)">삭제
        </button>
      </div>
    </div>
    <p class="fw-bold h3 mx-3 mb-3">{{ post.title }}</p>
    <p class="mx-3 mb-3">{{ post.content }}</p>
    <div class="mx-3 mb-3">
      <img v-if="post.image" :src="api_url + '/images/post/' + post.image" alt="">
    </div>
    <p class="fw-bold h4 mx-3 mb-3">댓글</p>
    <div v-for="comment in comments" :key=comment.key class="d-flex flex-column">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="d-flex mx-3">
            <img v-if="!comment.creatorImage.startsWith('http')" :src="api_url + '/images/profile/' + comment.creatorImage"
                 alt="" width="48" height="48" class="rounded-circle">
            <img v-else :src="comment.creatorImage" alt="" width="48" height="48" class="rounded-circle">
          </div>
          <div class="d-flex flex-column">
            <p class="fw-bold">{{ comment.creatorNickname }}</p>
            <p>{{ comment.createdAt }}</p>
          </div>
        </div>
        <button v-if="comment.creatorEmail === user_email" type="button" class="btn btn-danger" style="height: min-content" @click="deleteComment(comment.id)">삭제</button>
      </div>
      <p class="mx-3 mb-3">{{comment.content}}</p>
    </div>
    <div class="mx-3 mb-3 d-flex">
      <label for="comment" class="form-label"></label>
      <input type="text" class="form-control me-3" id="comment" v-model="comment">
      <button type="button" class="btn btn-primary" @click="createComment">전송</button>
    </div>
  </div>
  <PostCreate v-else-if="mode === 2" v-on:updatePosts="updatePosts" :study="study"></PostCreate>
  <PostUpdate v-else-if="mode === 3" v-on:updatePosts="updatePosts" :post="post" :study="study"></PostUpdate>
</template>

<script>

import PostUpdate from "@/components/PostUpdate";
import PostCreate from "@/components/PostCreate";
import router from "@/router";

export default {
  name: "StudyPost",
  components: {
    PostUpdate, PostCreate
  },
  props: ['study'],
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      mode: 0,
      post: null,
      posts: null,
      user_email: this.$cookies.get("UserEmail"),
      key: 0,
      comments: null,
      comment: null
    }
  },
  async created() {
    const vm = this;
    await this.axios.get('/api/v1/studies/' + this.$route.params.id + '/posts', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    }).then(function (response) {
      if (response.status === 200) {
        if(response.data.accessToken !== undefined)
          router.go();
        vm.posts = response.data;
      }
    });
  },
  methods: {
    async updatePosts() {
      const vm = this;
      await this.axios.get('/api/v1/studies/' + this.$route.params.id + '/posts', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.updatePosts();
            return;
          }
          vm.posts = response.data;
          vm.mode = 0;
        }
      });
    },
    async updateComments() {
      const vm = this;
      await this.axios.get('/api/v1/studies/' + this.study.id + '/posts/' + this.post.id + '/comments', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.updateComments();
            return;
          }
          vm.comments = response.data;
          vm.mode = 1;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    async getPost(post_id) {
      const vm = this;
      await this.axios.get('/api/v1/studies/' + this.study.id + '/posts/' + post_id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.getPost(post_id);
            return;
          }
          vm.post = response.data;
          vm.mode = 1;
        }
      }).catch(function (error) {
        console.error(error);
      });

      await this.axios.get('/api/v1/studies/' + this.study.id + '/posts/' + post_id + '/comments', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.getPost(post_id);
            return;
          }
          vm.comments = response.data;
          vm.mode = 1;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    async deletePost(post_id) {
      const vm = this;
      if (!confirm('게시글을 삭제하시겠습니까?'))
        return;
      await this.axios.delete('/api/v1/studies/' + this.study.id + '/posts/' + post_id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.deletePost(post_id);
            return;
          }
          alert('게시글이 삭제되었습니다.');
          vm.updatePosts();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    async createComment() {
      const vm = this;
      console.log(this.post.id);
      await this.axios.post('/api/v1/studies/' + this.study.id + '/posts/' + this.post.id + '/comments', {
        content: this.comment
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.createComment();
            return;
          }
          vm.comment = '';
          vm.updateComments();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    async deleteComment(comment_id) {
      if(!confirm('댓글을 삭제하시겠습니까?'))
        return;
      const vm = this;
      await this.axios.delete('/api/v1/studies/' + this.study.id + '/posts/' + this.post.id + '/comments/' + comment_id,
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
          }).then(function (response) {
        if (response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.deleteComment(comment_id);
            return;
          }
          alert('댓글이 삭제되었습니다.');
          vm.updateComments();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    openCreatePostPage() {
      this.mode = 2;
    },
    openUpdatePostPage() {
      this.mode = 3;
    }
  }
}
</script>

<style scoped>

</style>