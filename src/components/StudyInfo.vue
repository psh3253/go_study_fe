<template>
  <p class="fw-bold h3 text-center mb-3">스터디 소개</p>
  <p class="mb-5" style="word-break: break-all">{{ study.introduce }}</p>
  <p class="fw-bold h3 text-center mb-3">스터디
    멤버({{ study.currentNumber }}&nbsp;/&nbsp;{{ study.recruitmentNumber }})</p>
  <div class="row row-cols-5 mb-4">
    <div class="col" v-for="participant in participants" :key="participant.id">
      <div class="card mx-1 my-1">
        <div class="d-flex justify-content-end me-3 mt-3" style="height: 16px">
          <router-link to='#' class="text-black"
                       @click="kickOutParticipant(participant.id, participant.nickname)">
            <svg v-if="participant.email !== study.creatorEmail && study.creatorEmail === user_email"
                 xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </router-link>
        </div>
        <div class="d-flex justify-content-center">
          <img v-if="participant.image.startsWith('http')" :src="participant.image"
               class="card-img-top rounded-circle mx-5 my-3" style="width: 50%; height: 50%" alt="">
          <img v-else :src="api_url + '/images/profile/' + participant.image"
               class="card-img-top rounded-circle mx-5 my-3" style="width: 50%; height: 50%" alt="">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">
            <svg v-if="participant.email === study.creatorEmail" xmlns="http://www.w3.org/2000/svg" width="16"
                 height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path style="fill: gold"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>&nbsp;{{ participant.nickname }}
          </h5>
          <p class="card-text"
             style="height: 100px; overflow: hidden;	text-overflow: ellipsis;	display: -webkit-box;	-webkit-line-clamp: 4;	-webkit-box-orient: vertical;	word-wrap:break-word;">
            {{ participant.introduce }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="study.creatorEmail === user_email && applicants.length !== 0">
    <p class="fw-bold h3 text-center mb-3">스터디 가입 신청자</p>
    <div class="row row-cols-5 mb-4">
      <div class="col" v-for="applicant in applicants" :key="applicant.id">
        <div class="card mx-1 my-1">
          <div class="d-flex justify-content-center">
            <img v-if="applicant.image.startsWith('http')" :src="applicant.image"
                 class="card-img-top rounded-circle mx-5 my-3" style="width: 50%; height: 50%" alt="">
            <img v-else :src="api_url + '/images/profile/' + applicant.image"
                 class="card-img-top rounded-circle mx-5 my-3" style="width: 50%; height: 50%" alt="">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">
              {{ applicant.nickname }}
            </h5>
            <p class="card-text mb-3"
               style="height: 100px; overflow: hidden;	text-overflow: ellipsis;	display: -webkit-box;	-webkit-line-clamp: 4;	-webkit-box-orient: vertical;	word-wrap:break-word;">
              {{ applicant.message }}</p>
            <div class="d-flex justify-content-center mb-3">
              <button type="button" class="btn btn-success me-3" @click="acceptApplicant(applicant.id)">수락
              </button>
              <button type="button" class="btn btn-danger" @click="refuseApplicant(applicant.id)">거절</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "StudyInfo",
  props: ['study', 'participants', 'applicants'],
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      domain_url: process.env.VUE_APP_DOMAIN_URL,
      user_email: this.$cookies.get('UserEmail'),
    }
  },
  methods: {
    kickOutParticipant(id, nickname) {
      if(!confirm(nickname + '님을 스터디에서 내보내시겠습니까?'))
        return;
      this.axios.delete('/api/v1/studies/' + this.study.id + '/participants/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function(response) {
        if(response.status === 200) {
          alert(nickname + '님을 스터디에서 내보냈습니다.');
          router.go();
        }
      }).catch(function(error) {
        console.error(error);
      });
    },

    acceptApplicant(id) {
      this.axios.post('/api/v1/studies/' + this.study.id +'/applicants/' + id, {}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function(response) {
        if(response.status === 200) {
          router.go();
        }
      }).catch(function(error) {
        alert('모집 인원을 초과할 수 업습니다.');
        console.error(error);
      });
    },

    refuseApplicant(id) {
      this.axios.delete('/api/v1/studies/' + this.study.id + '/applicants/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function(response) {
        if(response.status === 200) {
          router.go();
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