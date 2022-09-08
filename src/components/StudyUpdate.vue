<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="name" class="form-label">스터디명</label>
        <input type="text" class="form-control" id="name" v-model="name" size="50">
      </div>
      <div class="mb-3">
        <select class="form-select" aria-label="category" v-model="category">
          <option value="0" hidden disabled>카테고리</option>
          <option v-for="category in categories" :key=category.id :value=category.id>{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-3 d-flex">
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="type" id="online" checked v-model="type" value="ONLINE"
                 @click="is_location_disabled = true; location=null">
          <label class="form-check-label" for="online">
            온라인
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="type" id="offline" v-model="type" value="OFFLINE"
                 @click="is_location_disabled = false">
          <label class="form-check-label" for="offline">
            오프라인
          </label>
        </div>
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">장소</label>
        <input class="form-control" type="text" id="location" size="50" v-model="location"
               v-bind:disabled="is_location_disabled">
      </div>
      <div class="mb-3">
        <label for="recruitment-number" class="form-label">모집 인원</label>
        <input class="form-control" type="number" id="recruitment-number" v-model="recruitment_number">
      </div>
      <div class="mb-3 d-flex">
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="visibility" id="public" value="PUBLIC" checked v-model="visibility">
          <label class="form-check-label" for="public">
            공개
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="visibility" id="private" value="PRIVATE" v-model="visibility">
          <label class="form-check-label" for="private">
            비공개
          </label>
        </div>
      </div>
      <div class="mb-3 d-flex">
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="join-type" id="free" checked v-model="join_type"
                 value="FREE">
          <label class="form-check-label" for="free">
            자유 가입
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="join-type" id="approval" v-model="join_type"
                 value="APPROVAL">
          <label class="form-check-label" for="approval">
            승인 가입
          </label>
        </div>
      </div>
      <div class="mb-3">
        <label for="introduce" class="form-label">소개({{ introduce.length }}/50)</label>
        <textarea class="form-control" id="introduce" v-model="introduce" rows="3"></textarea>
      </div>
      <button type="button" @click="updateStudy" class="btn btn-primary me-3">수정</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import router from "@/router";

export default {
  name: "StudyUpdate",
  data() {
    return {
      is_location_disabled: false,
      id: null,
      categories: null,
      name: "",
      category: null,
      type: 'ONLINE',
      location: null,
      current_number: 0,
      recruitment_number: 0,
      visibility: 'PUBLIC',
      join_type: 'FREE',
      introduce: ""
    }
  },
  components: {
    Header
  },
  async created() {
    const vm = this;
    await this.axios.get('/api/v1/categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    })
        .then(function (response) {
          if (response.status === 200) {
            if(response.data.accessToken !== undefined)
              router.go();
            vm.categories = response.data
          }
        }).catch(function (error) {
      console.error(error);
    });

    await this.axios.get('/api/v1/studies/' + this.$route.params.id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    }).then(function (response) {
      if (response.status === 200) {
        const study = response.data;
        vm.id = study.id;
        vm.name = study.name;
        vm.category = study.categoryId;
        vm.type = study.type;
        vm.location = study.location;
        vm.current_number = study.currentNumber;
        vm.recruitment_number = study.recruitmentNumber
        vm.visibility = study.visibility;
        vm.join_type = study.joinType;
        vm.introduce = study.introduce;
        if (vm.type === 'ONLINE') {
          vm.location = null;
          vm.is_location_disabled = true;
        }
      }
    }).catch(function (error) {
      console.error(error);
    })
  },
  watch: {
    introduce: function () {
      this.introduce = this.introduce.substring(0, 50);
    }
  },
  methods: {
    async updateStudy() {
      const vm = this;
      if (this.recruitment_number < this.current_number) {
        alert('모집 인원은 현재 인원수인 ' + this.current_number + '명 이상 이여야 합니다.');
        return;
      } else if (this.name === '') {
        alert('스터디명을 입력해주세요.');
        return;
      } else if (this.introduce === '') {
        alert('소개를 입력해주세요.');
        return;
      } else if (this.type === 'OFFLINE' && this.location === '') {
        alert('장소를 입력해주세요.');
        return;
      }
      await this.axios.patch('/api/v1/studies/' + this.id + '/', {
        id: this.id,
        name: this.name,
        category_id: this.category,
        type: this.type,
        location: this.location,
        recruitment_number: this.recruitment_number,
        visibility: this.visibility,
        join_type: this.join_type,
        introduce: this.introduce
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(function(response) {
        if(response.status === 200) {
          if(response.data.accessToken !== undefined) {
            vm.updateStudy();
            return;
          }
          router.push('/studies/' + vm.id);
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