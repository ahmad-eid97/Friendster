<template>
  <!-- EXPLORE PAGE HEAD -->
  <div class="pages">
    <div class="container">
      <div class="head">
        <h3>Explore Pages</h3>
        <input type="text" placeholder="Search for pages..">
      </div>
    </div>
    <!-- EXPLORE PAGE SECTIONS -->
    <div class="container">
      <div class="sections">
        <div class="row">
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/app.svg" alt="">
            <h6>Feed</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5" @click="$router.push({path: '/messenger'})">
            <img src="../assets/images/pages/comment.svg" alt="">
            <h6>Messenger</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/question.svg" alt="">
            <h6>News</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/love.svg" alt="">
            <h6>Comming soon</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/product.svg" alt="">
            <h6>Shopping</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/team.svg" alt="">
            <h6>Team</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/youtube.svg" alt="">
            <h6>Videos</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5" @click="$router.push({path: '/'})">
            <img src="../assets/images/pages/stay-at-home.svg" alt="">
            <h6>Timeline</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/birthday.svg" alt="">
            <h6>Gifts</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5" @click="$router.push({path: `/profile/${myData.user_id}`})">
            <img src="../assets/images/pages/review.svg" alt="">
            <h6>Profile</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5">
            <img src="../assets/images/pages/questions.svg" alt="">
            <h6>Question</h6>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5" @click="$router.push({path: '/settings'})">
            <img src="../assets/images/pages/settings.svg" alt="">
            <h6>Settings</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE */
.pages {
  margin-top: -50px;
  background-color: #fff;
}

/* EXPLORE PAGE HEAD */
.head {
  padding-top: 100px;
  h3 {
    display: inline-block;
    margin-right: 35%;
  }
  input {
    width: 250px;
    height: 35px;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-left: 15px;
    outline: none;
    &:focus {
      box-shadow: 2px 2px 10px rgb(230, 230, 230);
    }
  }
}

/* EXPLORE PAGE MAIN CONTET */
.sections {
  margin-top: 10%;
  .col-lg-2 {
    margin-bottom: 30px;
    padding: 30px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: 2px 2px 10px rgb(224, 224, 224);
    }
  }
  img {
    width: 90px;
    height: 90px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 50%;
  }
  h6 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
  }
}

/* MOBILE SCREEN VIEW */
@include mb {
  .head {
    padding-top: 100px;
    h3 {
      font-size: 16px;
      margin-right: 10%;
    }
    input {
      width: 120px;
      height: 30px;
      font-size: 11px;
      padding-left: 10px;
    }
  }
  .sections {
    margin-top: 30px;
    .col-lg-2 {
      padding: 20px;
      width: 51%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      &:hover {
        box-shadow: 2px 2px 10px rgb(224, 224, 224);
      }
    }
    img {
      width: 80px;
      height: 80px;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 50%;
    }
    h6 {
      font-size: 15px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
}

/* SMALL SCREEN VIEW */
@include sm {
  .head {
    padding-top: 100px;
    h3 {
      font-size: 20px;
      margin-right: 20%;
    }
    input {
      width: 200px;
      height: 35px;
      font-size: 15px;
      padding-left: 10px;
    }
  }
  .sections {
    margin-top: 30px;
    .col-lg-2 {
      padding: 20px;
      width: 51%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      &:hover {
        box-shadow: 2px 2px 10px rgb(224, 224, 224);
      }
    }
    img {
      width: 80px;
      height: 80px;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 50%;
    }
    h6 {
      font-size: 15px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
}
</style>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      myData: ''
    }
  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE TITLE FOR EXPLORE PAGE
    document.title = 'Explore | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.myData = doc.data();
    })
  }
}
</script>