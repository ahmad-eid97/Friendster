<template>
  <div class="container">
    <div class="profileFriends">
      <!-- LOADER -->
      <div class="loading" v-if="loadingFirends">
        <div class="lds-dual-ring"></div>
      </div>
      <!-- SHOWING FRIENDS AREA -->
      <h5 v-if="userFriends.length > 0"><i class="fas fa-users"></i> Friends</h5>
      <div class="row">
        <div class="col-lg-6" v-for="friend in userFriends" :key="friend.user_id" v-if="userFriends.length > 0">
          <div class="friend">
            <div class="img">
              <img :src="friend.imgURL" alt="">
            </div>
            <div class="userInfo">
              <p class="username">{{friend.nickname}}</p>
              <p v-if="friend.bio && friend.user_id !== myData.user_id">{{friend.bio}}</p>
              <p v-if="!friend.bio">NO BIO</p>
              <p v-if="friend.bio && friend.user_id == myData.user_id">That's You</p>
            </div>
            <div class="options">
              <i class="far fa-eye" @click="$router.push({path: `/profile/${friend.user_id}`})"></i>
              <i v-if="userObject.user_id == myId" class="fas fa-user-times" @click="openRemoveFriendMessage(friend.user_id, friend.nickname)"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-12" v-if="userFriends.length == 0 && !loadingFirends">
          <div class="noFriends">
            <img src="../assets/noFriends.svg" alt="">
            <p><span v-if="userObject">{{userObject.nickname.split(' ')[0]}}</span><label v-if="myData.user_id == userObject.user_id">, you</label> don't have any friends yet<label v-if="myData.user_id == userObject.user_id">, start making new ones</label></p>
          </div>
        </div>
      </div>
    </div>
    <removeFriend v-if="$store.state.openRemoveFriend == true" :friendId='friendId' :friendName='friendName'></removeFriend>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE */
.profileFriends {
  margin-top: 30px;
  background-color: #fff;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  padding: 10px 30px 20px 30px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  text-align: left;

  /* LOADER */
  .loading {
    display: flex;
    justify-content: center;
    .lds-dual-ring {
      display: flex;
      justify-content: center;
      width: 180px;
      height: 280px;
      z-index: 999999999999999999;
      background-color: #fff;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      align-self: center;
      width: 40px;
      height: 40px;
      margin: 8px;
      border-radius: 50%;
      border: 3px solid $maincolor;
      border-color: $maincolor transparent $maincolor transparent;
      animation: lds-dual-ring 1.2s linear infinite;
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* NO FRIENDS AREA */
  .noFriends {
    text-align: center;
    img {
      width: 35%;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    p {
      font-weight: 600;
      font-size: 17px;
      span {
        color: $secondcolor;
      }
    }
  }

  /* SHOW FRIENDS AREA */
  .friend {
    display: flex;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(236, 235, 235);
    justify-content: space-around;
    img {
      width: 80px;
      height: 80px;
      border-radius: 10%;
      margin-right: 10px;
      box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
    }
    .userInfo {
      align-self: center;
      text-align: center;
      p {
        margin-bottom: 0;
        font-size: 14px;
        color: $textcolor;
        &.username {
          font-weight: bold;
          font-size: 20px;
          color: #2c3e50;
          text-transform: capitalize;
        }
      }
    }
    .options {
      align-self: center;
      i {
        margin: 5px;
        background-color: #fff;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        &.fa-eye {
          &:hover {
            background-color: $maincolor;
            color: #fff;
          }
        }
        &.fa-user-times {
          &:hover {
            background-color: $secondcolor;
            color: #fff;
          }
        }
      }
    }
  }

  /* MOBILE SCREEN VIEW */
  @include mb {
    h5 {
      font-size: 16px;
      margin-top: 10px;
      margin-left: 10px;
    }
    .loading {
      .lds-dual-ring {
        width: 100px;
        height: 200px;
        z-index: 9999;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        align-self: center;
        width: 30px;
        height: 30px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid $maincolor;
        border-color: $maincolor transparent $maincolor transparent;
        animation: lds-dual-ring 1.2s linear infinite;
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .friend {
      margin-top: 10px;
      padding: 10px;
      img {
        width: 55px;
        height: 55px;
      }
      .userInfo {
        align-self: center;
        text-align: center;
        p {
          font-size: 11px;
          &.username {
            font-size: 16px;
          }
        }
      }
      .options {
        i {
          margin: 3px;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import removeFriend from '../components/removeFriend'
// import { setInterval } from 'timers';
export default {
  data() {
    return {
      userObject: '',
      userFriends: [],
      dataRecieved: false,
      loadingFirends: true,
      myId: firebase.auth().currentUser.uid,
      friendId: '',
      friendName: '',
      myData: '',
      myFriends: ''
    }
  },
  async created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0);
    
    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();
    
    // GET CURRENT USER DATA
    await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.myData = doc.data()
      this.myFriends = doc.data().friends;
    })
    await firebase.firestore().collection('users').doc(this.$route.params.userId).get().then(doc => {
      this.userObject = doc.data()
    })
    // GET FRIEND DATA

    // LISTENING FOR FRIENDS IF USER REMOVED ANY ONE
    firebase.firestore().collection('users').where('user_id', '==', this.$route.params.userId).onSnapshot(() => {
      var tempFriends = [];
      firebase.firestore().collection('users').doc(this.$route.params.userId).get().then(doc => {
        this.userObject = doc.data();
        if (doc.data().friends.length > 0) {
          doc.data().friends.forEach(async friend => {
            var user = await firebase.firestore().collection('users').doc(friend.userId).get();
            tempFriends.unshift(user.data())
            this.userFriends = tempFriends;
            this.dataRecieved = true;
          })
        } else {
            this.dataRecieved = true;
        }
        var interval = setInterval(() => {
          if (this.dataRecieved) {
            this.loadingFirends = false
            clearInterval(interval);
          }
        }, 10);
      })
    })

  },
  methods: {
    // OPEN REMOVE FRIEND COMPONENT
    async openRemoveFriendMessage(friendId, friendName) {
      this.friendId = await friendId
      this.friendName = await friendName
      this.$store.state.openRemoveFriend = true
    }
  },
  components: {
    removeFriend
  }
}
</script>