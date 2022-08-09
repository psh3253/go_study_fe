<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="name" class="form-label">스터디명</label>
        <input type="text" class="form-control" id="name" v-model="name" size="50">
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
        <select class="form-select" aria-label="category" v-model="category">
          <option value="0" disabled hidden>카테고리</option>
          <option v-for="category in categories" :key=category.id :value=category.id>{{ category.name }}</option>
        </select>
      </div>
      <div class="mb-3 d-flex">
        <div class="form-check me-3">
          <input class="form-check-input" type="radio" name="type" id="online" checked v-model="type" value="ONLINE"
                 @click="is_location_disabled = true; location = null;">
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
          <input class="form-check-input" type="radio" name="visibility" id="public" value="PUBLIC" checked
                 v-model="visibility">
          <label class="form-check-label" for="public">
            공개
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="visibility" id="private" value="PRIVATE"
                 v-model="visibility">
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
      <button type="button" @click="createStudy" class="btn btn-primary me-3">생성</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import router from "@/router";

export default {
  name: "StudyCreate",
  components: {
    Header
  },
  data() {
    return {
      is_image_disabled: false,
      is_location_disabled: true,
      categories: null,
      name: "",
      image: null,
      category: 0,
      type: 'ONLINE',
      location: null,
      recruitment_number: 0,
      visibility: 'PUBLIC',
      join_type: 'FREE',
      introduce: ""
    }
  },
  created() {
    const vm = this;
    this.axios.get('/api/v1/categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    })
        .then(function (response) {
          if (response.status === 200) {
            vm.categories = response.data
          }
        }).catch(function (error) {
      console.error(error);
    });
  },
  methods: {
    createStudy() {
      if (this.category === 0) {
        alert('카테고리를 선택해주세요.');
        return;
      } else if (this.recruitment_number < 1) {
        alert('모집 인원은 최소 1명 이여야 합니다.');
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
      } else if (!this.is_image_disabled && this.image === null) {
        alert('기본 이미지를 선택하거나 이미지를 업로드 해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('name', this.name);
      if (this.image !== null)
        formData.append('image', this.image[0]);
      formData.append('categoryId', this.category);
      formData.append('type', this.type);
      formData.append('location', this.location);
      formData.append('recruitmentNumber', this.recruitment_number);
      formData.append('visibility', this.visibility);
      formData.append('joinType', this.join_type);
      formData.append('introduce', this.introduce);
      this.axios.post('/api/v1/studies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.status === 200) {
          router.push('/');
        }
      }).catch(function (error) {
        console.error(error);
      })
    },
    selectImage() {
      this.image = this.$refs.image.files;
    },
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