<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <div style="width: 80%">
      <img class="mb-3" :src="image_url" alt="" style="width: 100%; height: 500px">
      <div class="d-flex justify-content-between">
        <div class="d-flex mb-3">
          <label for="accessUrl" class="form-label"></label>
          <input type="url" id="accessUrl" class="me-1" :value="access_url" size="30"
                 disabled>
          <button type="button" class="btn btn-primary me-3" @click="copyAccessUrl">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard"
                 viewBox="0 0 16 16">
              <path
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path
                  d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>&nbsp;복사
          </button>
        </div>
        <div>
          <div class="d-flex mb-3" v-if="study.creatorEmail === user_email && study.isRecruiting">
            <button class="btn btn-success me-3" @click="closeStudy">스터디 마감</button>
            <router-link class="btn btn-primary me-3" :to="'/studies/' + study.id + '/update'">수정</router-link>
            <button class="btn btn-danger" @click="deleteStudy">삭제</button>
          </div>
          <div class="d-flex mb-3"
               v-else-if="study.creatorEmail !== user_email && study.isRecruiting && study.currentNumber < study.recruitmentNumber && !is_participant && !is_applicant">
            <div v-if="study.joinType === 'FREE'">
              <button class="btn btn-primary" @click="participateStudy">스터디 참석</button>
            </div>
            <div v-else>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#applicationModal">
                스터디 신청
              </button>
            </div>
          </div>
          <div class="d-flex mb-3" v-else>
            <div v-if="is_participant && study.creatorEmail !== user_email">
              <button type="button" class="btn btn-danger" @click="withdrawStudy">
                스터디 탈퇴
              </button>
            </div>
            <div v-else-if="is_applicant">
              <button type="button" class="btn btn-success" @click="cancelApplication">
                스터디 신청 취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="fw-bold h1 text-center mb-3">{{ study.name }}</p>
      <div class="d-flex justify-content-center fw-bold h5 mb-5">
        <div class="me-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
          </svg>
          <span v-if="study.type === 'OFFLINE'">&nbsp;{{ study.location }}</span>
          <span v-else>&nbsp;온라인</span>
        </div>
        <div class="me-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid"
               viewBox="0 0 16 16">
            <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
          </svg>
          <span>&nbsp;{{ study.categoryName }}</span>
        </div>
        <div class="me-3" v-if="study.joinType === 'APPROVAL'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-shield-fill-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"/>
          </svg>
          <span>&nbsp;승인 가입</span>
        </div>
        <div class="me-3" v-if="study.visibility === 'PRIVATE'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-incognito"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z"/>
          </svg>
          <span>&nbsp;비공개</span>
        </div>
        <div class="me-3" v-if="!study.isRecruiting">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill"
               viewBox="0 0 16 16">
            <path
                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
          </svg>
          <span>&nbsp;모집종료</span>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center">
        <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold h5" id="info-tab" data-bs-toggle="tab" data-bs-target="#info"
                    type="button" role="tab" aria-controls="info" aria-selected="true">정보
            </button>
          </li>
          <li v-if="is_participant" class="nav-item" role="presentation">
            <button class="nav-link fw-bold h5" id="post-tab" data-bs-toggle="tab" data-bs-target="#post"
                    type="button" role="tab" aria-controls="post" aria-selected="false">게시글
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent" style="width: 100%">
          <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
<!--            <StudyInfo id="info" :study="study" :participants="participants" :applicants="applicants"></StudyInfo>-->
            <div>
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
            </div>
          </div>
          <div class="tab-pane fade" id="post" role="tabpanel" aria-labelledby="post-tab">
            <StudyPost id="post" v-if="is_participant" :study="study"></StudyPost>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="applicationModal" tabindex="-1" aria-labelledby="applicationModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="applicationModalLabel">스터디 가입 신청</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="mx-3 my-3">
            <div class="mb-3">
              <label for="message" class="form-label">내용({{ message.length }}/50)</label>
              <textarea class="form-control" id="message" v-model="message" rows="3"
                        placeholder="스터디에 가입하기 위한 본인의 간단한 소개를 적어주세요."></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" @click="participateStudy">신청</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import StudyPost from "@/components/StudyPost";
import Header from "@/components/common/Header";

export default {
  name: "StudyDetails",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header, StudyPost
  },
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      domain_url: process.env.VUE_APP_DOMAIN_URL,
      access_url: null,
      isLogin: this.$cookies.get('IsLogin'),
      study: null,
      participants: null,
      applicants: null,
      posts: null,
      image_url: null,
      user_email: this.$cookies.get('UserEmail'),
      message: '',
      is_participant: false,
      is_applicant: false
    }
  },
  created() {
    const vm = this;
    if (this.isLogin === null || this.isLogin === 'false') {
      window.location.href = '/login';
      return;
    }
    this.axios.get('/api/v1/studies/' + this.$route.params.id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    })
        .then(function (response) {
          if (response.status === 200) {
            vm.study = response.data;
            vm.image_url = vm.api_url + '/images/study/' + vm.study.filename;
            vm.access_url = vm.domain_url + '/' + vm.study.accessUrl;
          }
        }).catch(function (error) {
      console.error(error);
    });

    this.axios.get('/api/v1/studies/' + this.$route.params.id + '/participants', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    })
        .then(function (response) {
          if (response.status === 200) {
            vm.participants = response.data;
            if (vm.participants.filter(participant => participant.email === vm.user_email).length > 0)
              vm.is_participant = true;
          }
        }).catch(function (error) {
      console.error(error);
    });

    this.axios.get('/api/v1/studies/' + this.$route.params.id + '/applicants', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    }).then(function (response) {
      if (response.status === 200) {
        vm.applicants = response.data;
        if (vm.applicants.filter(applicant => applicant.email === vm.user_email).length > 0)
          vm.is_applicant = true;
      }
    });
  },
  watch: {
    message: function () {
      this.message = this.message.substring(0, 50);
    }
  },
  methods: {
    closeStudy() {
      if (!confirm("스터디가 마감되면 더 이상 모집, 수정, 삭제할 수 없습니다. 마감하시겠습니까?"))
        return;
      this.axios.post('/api/v1/studies/' + this.study.id + '/close', {}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert('스터디가 마감되었습니다.');
          router.go();
        }
      }).catch(function (error) {
        console.error(error);
      })
    },

    deleteStudy() {
      if (!confirm("스터디를 삭제하시겠습니까?"))
        return;
      this.axios.delete('/api/v1/studies/' + this.study.id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert('스터디가 삭제되었습니다.');
          router.replace('/');
        }
      }).catch(function (error) {
        console.error(error);
      })
    },

    participateStudy() {
      if (this.study.joinType === 'FREE') {
        if (!confirm("스터디를 가입하시겠습니까?"))
          return;
        this.axios.post('/api/v1/studies/' + this.study.id + '/participants', {}, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true
        })
            .then(function (response) {
              if (response.status === 200) {
                alert('스터디 가입이 완료되었습니다.');
                router.go();
              }
            }).catch(function (error) {
          console.error(error);
        });
      } else {
        if (!confirm("스터디를 신청하시겠습니까?"))
          return;
        this.axios.post('/api/v1/studies/' + this.study.id + '/participants', {
          message: this.message
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true
        })
            .then(function (response) {
              if (response.status === 200) {
                alert('스터디 가입 신청이 완료되었습니다.');
                router.go();
              }
            }).catch(function (error) {
          console.error(error);
        });
      }
    },

    cancelApplication() {
      if (!confirm('신청을 취소하시겠습니까?'))
        return;
      this.axios.post('/api/v1/studies/' + this.study.id + '/cancel', {}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert('신청이 취소되었습니다.');
          router.go();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },

    withdrawStudy() {
      if (!confirm('스터디를 정말 탈퇴하시겠습니까?'))
        return;
      this.axios.post('/api/v1/studies/' + this.study.id + '/withdraw', {}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert('탈퇴가 완료되었습니다.');
          router.go();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },

    copyToClipboard(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    },

    copyAccessUrl() {
      this.copyToClipboard(this.domain_url + '/' + this.study.accessUrl);
      alert('링크가 복사되었습니다.');
    },

    kickOutParticipant(id, nickname) {
      if (!confirm(nickname + '님을 스터디에서 내보내시겠습니까?'))
        return;
      this.axios.delete('/api/v1/studies/' + this.study.id + '/participants/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          alert(nickname + '님을 스터디에서 내보냈습니다.');
          router.go();
        }
      }).catch(function (error) {
        console.error(error);
      });
    },

    acceptApplicant(id) {
      this.axios.post('/api/v1/studies/' + this.study.id + '/applicants/' + id, {}, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          router.go();
        }
      }).catch(function (error) {
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
      }).then(function (response) {
        if (response.status === 200) {
          router.go();
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>

</style>