<template>
  <Header></Header>
  <div class="d-flex justify-content-end">
    <router-link v-if="isLogin === 'true'" to="/studies/create" class="btn btn-primary mx-3 mt-3">스터디 생성</router-link>
  </div>
  <div class="my-3 mx-2">
    <div class="row row-cols-4">
      <div class="col" v-for="study in studies" :key="study.id">
        <router-link to='#' class="card mx-1 my-1 text-decoration-none text-black" @click="goStudyInfo(study.id)">
          <div class="carousel" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="api_url + '/images/study/' + study.filename" class="card-img-top" alt="">
                <div class="carousel-caption">
                  <div class="opacity-75 bg-white rounded-pill text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    <span v-if="study.type === 'OFFLINE'" class="fw-bold">&nbsp;{{ study.location }}</span>
                    <span v-else class="fw-bold">&nbsp;온라인</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ study.name }}</h5>
            <p class="card-text h-6">{{ study.categoryName }}</p>
            <p style="height: 40%; overflow: hidden;	text-overflow: ellipsis;	display: -webkit-box;	-webkit-line-clamp: 4;	-webkit-box-orient: vertical;	word-wrap:break-word;">
              {{ study.introduce }}</p>
            <div class="d-flex justify-content-end">
              <div class="mb-3">
                <svg v-if="study.joinType === 'APPROVAL'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"/>
                </svg>
                <span v-if="study.joinType === 'APPROVAL'">&nbsp;</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fill-rule="evenodd"
                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                </svg>
                <span>&nbsp;{{ study.currentNumber }}&nbsp;/&nbsp;</span>
                <span>{{ study.recruitmentNumber }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Header from "@/components/common/Header";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {
    Header
  },
  data() {
    return {
      studies: null,
      api_url: process.env.VUE_APP_API_URL,
      isLogin: this.$cookies.get('IsLogin')
    }
  },
  async created() {
    const vm = this;
    await this.axios.get('/api/v1/studies', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    })
        .then(function (response) {
          if (response.status === 200) {
            vm.studies = response.data
          }
        }).catch(function (error) {
      console.error(error);
    });
  },
  methods: {
    goStudyInfo(study_id) {
      if(this.isLogin === null || this.isLogin === 'false') {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }
      router.push('/studies/' + study_id);
    }
  }
}
</script>

<style scoped>
.carousel-caption {
  bottom: 0;
  top: auto;
}

.card {
  height: 500px;
}

</style>