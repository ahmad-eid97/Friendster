<template>
  <div class="mainDiv">
    <div class="wrapper">
      <img src="../assets/images/messenger/photo.jpg" alt="">
      <h2>Hi <span>{{userObject.nickname.split(' ')[0]}}</span>, You don't have any chats yet, start making new friends and have chats with them...</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/variables.scss';
@import '../css/mixins.scss';
.mainDiv {
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  div.wrapper {
    margin-top: -100px;
    img {
      width: 50%;
    }
    h2 {
      width: 50%;
      margin: auto;
      color: $textcolor;
      font-size: 21px;
      span {
        color: $secondcolor;
      }
    }
  }

  /* MOBILE SCREEN VIEW */ 
  @include mb {
    .wrapper {
      img {
        width: 70%;
      }
      h2 {
        font-size: 15px !important;
      }
    }
  }

  /* SMALL SCREEN VIEW */ 
  @include sm {
    .wrapper {
      img {
        width: 60%;
      }
      h2 {
        font-size: 17px !important;
      }
    }
  }

  /* MEDIUM SCREEN VIEW */ 
  @include md {
    .wrapper {
      img {
        width: 70%;
      }
      h2 {
        font-size: 18px !important;
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      userObject: ''
    }
  },
  created() {
    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.userObject = doc.data()
    })
  }
}
</script>