<template>
  .
</template>

<script>
import router from "@/router";

export default {
  name: "StudyRedirect",
  data() {
    return {
      is_login: this.$cookies.get('IsLogin')
    }
  },

  async created() {
    if (this.is_login === 'false' || this.is_login === null) {
      router.push('/login');
      return;
    }
    await this.axios.get('/api/v1/access-url/' + this.$route.params.accessUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true
    }).then(function (response) {
      if(response.status === 200) {
        if(response.data.accessToken !== undefined)
          router.go();
        router.replace('/studies/' + response.data);
      }
    }).catch(function (error) {
      console.error(error);
    })
  }
}
</script>

<style scoped>

</style>