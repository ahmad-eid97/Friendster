<template>
  <div class="profileAbout">
    <div class="container">
      <!-- GET USER ABOUT DATA -->
      <div class="info">
        <div class="row">
          <div class="col-lg-6">
            <div class="inside">
              <div class="bio">
                <div class="main">
                  <h6>PROFILE BIO:</h6>
                  <p v-if="myData.bio">{{myData.bio}}</p>
                  <p v-if="!myData.bio">No Profile BIO!</p>
                </div>
                <i class="fas fa-atlas"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="inside">
              <div class="uni">
                <div class="main">
                  <h6>UNIVERSITY:</h6>
                  <p v-if="myData.university">{{myData.university}}</p>
                  <p v-if="!myData.university">Not Joined Yet!</p>
                </div>
                <i class="fas fa-graduation-cap"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="inside">
              <div class="school">
                <div class="main">
                  <h6>HIGH SCHOOL:</h6>
                  <p v-if="myData.school">{{myData.school}}</p>
                  <p v-if="!myData.school">Not Mentioned Yet!</p>
                </div>
                <i class="fas fa-school"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="inside">
              <div class="relationship">
                <div class="main">
                  <h6>RELATIONSHIP:</h6>
                  <p v-if="myData.relationship">{{myData.relationship}}</p>
                  <p v-if="!myData.relationship">Not Mentioned Yet!</p>
                </div>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="inside">
              <div class="live">
                <div class="main">
                  <h6>LIVES IN:</h6>
                  <p v-if="myData.livesIn">{{myData.livesIn}}</p>
                  <p v-if="!myData.livesIn">Not Mentioned Yet!</p>
                </div>
                <i class="fas fa-map-marker-alt"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="inside">
              <div class="phone">
                <div class="main">
                  <h6>PHONE:</h6>
                  <p v-if="myData.phone">{{myData.phone}}</p>
                  <p v-if="!myData.phone">Not Linked</p>
                </div>
                <i class="fas fa-mobile-alt"></i>
              </div>
            </div>
          </div>
        </div>
        <button v-if="$route.params.userId == current.user_id" @click="$store.state.openEditProfileAbout = true">Edit Profile Info</button>
      </div>
    </div>
    <editProfileAbout v-if="$store.state.openEditProfileAbout == true"></editProfileAbout>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
.profileAbout {
  margin-top: 30px;

  /* USER DATA AREA */
  .info {
    background-color: #fff;
    padding: 20px;
    border: 1px solid rgb(223, 221, 221);
    border-radius: 10px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    .inside {
      border: 1px solid rgb(223, 221, 221);
      padding: 15px 20px;
      border-radius: 10px;
      margin-bottom: 15px;
      text-align: left;
      .uni, .bio, .relationship, .school, .live, .phone {
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          color: $textcolor;
          font-size: 20px;
        }
        h6 {
          font-size: 15px;
          margin-bottom: 5px;
        }
        p {
          color: $textcolor;
          margin-bottom: 0px;
          font-size: 15px;
        }
      }
    }
    button {
      width: 50%;
      border: none;
      background-color: $maincolor;
      height: 40px;
      color: #fff;
      border-radius: 5px;
      outline: none;
      &:hover {
        background-color: #0353d3;
        box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  /* MOBILE SCREEN VIEW */
  @include mb {
    .info {
      width: 90%;
      margin-bottom: 20px;
      .inside {
        .uni, .bio, .relationship, .school, .live, .phone {
          h6 {
            font-size: 12px;
          }
          p {
            font-size: 13px;
          }
          i {
            font-size: 18px;
          }
        }
      }
      button {
        font-size: 13px;
        height: 35px;
      }
    }
  }

  /* SMALL SCREEN VIEW */
  @include sm {
    .info {
      .inside {
        .uni, .bio, .relationship, .school, .live, .phone {
          h6 {
            font-size: 14px;
          }
          p {
            font-size: 15px;
            width: 100%;
          }
          i {
            font-size: 19px;
          }
        }
      }
      button {
        font-size: 15px;
        height: 35px;
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import editProfileAbout from '../components/editProfileAbout'
export default {
  data() {
    return {
      myData: '',
      current: ''
    }
  },
  async created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();
    
    // EMPTY FRIENDS LIST FOR LISTENING TO REMOVING FRIENDS FROM USER'S FRIENDS LIST
    this.$store.state.userFriends = [];
    // GET CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.current = doc.data()
    })
    await firebase.firestore().collection('users').onSnapshot(docs => {
      docs.forEach(doc => {
        if(doc.data().user_id == this.$route.params.userId) {
          this.myData = doc.data()
        }
      })
    })
  },
  components: {
    editProfileAbout
  }
}
</script>