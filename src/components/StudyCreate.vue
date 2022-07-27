<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <form class="mx-3 my-3">
      <div class="mb-3">
        <label for="email" class="form-label">제목</label>
        <input type="email" class="form-control" id="email" v-model="email" size="50">
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">이미지 파일 업로드</label>
        <input class="form-control" type="file" id="image">
      </div>
      <div class="mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected disabled>카테고리</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select></div>
    </form>
  </div>
</template>

<script>
import Header from "@/components/common/Header";

export default {
  name: "StudyCreate",
  components: {
    Header
  },
  data() {
    return {

    }
  },
  created() {
    this.axios.get('/api/v1/categories', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
        .then(function(response) {
          if(response.status === 200) {
            console.log(response);
          }
        }).catch(function(error) {
      console.error(error);
    });
  }
}
</script>

<style scoped>

</style>