<template>
  <div class="Page404">
    <div class="inside">
      <img src="../assets/404.svg" alt="">
      <h5>WHOOPS<span>!</span></h5>
      <p>Looks like you are lost! <span>Or</span> page not found!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE */
div.Page404 {
  height: 90vh;
  display: flex;
  justify-content: center;
  .inside {
    margin-top: 100px;
  }
  img {
    width: 40%;
    margin-bottom: 30px;
  }
  h5 {
    font-family: "Agency FB";
    font-size: 40px;
    color: $textcolor;
    span {
      color: $secondcolor;
      font-weight: bold;
    }
  }
  p {
  font-size: 18px;
    color: $textcolor;
    span {
      color: $secondcolor;
      font-weight: bold;
    }
  }
  @include sm {
    .inside {
      img {
        width: 33%;
      }
      h5 {
        font-size: 30px;
      }
      p {
        font-size: 15px;
      }
    }
  }
  @include mb {
    .inside {
      img {
        width: 40%;
        margin-bottom: 20px;
      }
      h5 {
        font-size: 25px;
      }
      p {
        font-size: 12px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE TITLE OF 404 PAGE
    document.title = '404 | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
  }
}
</script>