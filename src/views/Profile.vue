<template>
  <div class="profile">

    <!-- COVER AND PROFILE PHOTO AREA -->
    <div class="coverSection">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="cover">
              <img :src="userData.coverURL" alt="" v-if="userData.coverURL">
              <div class="lds-dual-ring" v-if="!userData.coverURL"></div>
              <span class="upcover" v-if="$route.params.userId == userObject.user_id">
                <i class="fas fa-camera"></i>
                <span class="info" @click="clicking2">upload cover photo</span>
                <input type="file" @change="coverPhoto" ref="uploadCover" style="display: none">
              </span>
              <div class="prief dropdown">
                <i class="dropdown-toggle fas fa-ellipsis-v" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul class="list-unstyled">
                    <li @click="choosedComponent = 'profilePosts'"><i class="fas fa-stream"></i>Posts</li>
                    <li @click="choosedComponent = 'profileAbout'"><i class="far fa-address-card"></i>About</li>
                    <li @click="choosedComponent = 'profileFriends'"><i class="fas fa-users"></i>Friends</li>
                    <li v-if="userObject.user_id != userData.user_id" @click="$store.state.openMessage = true"><i class="fas fa-comment-dots"></i>send message</li>
                  </ul>
                </div>
              </div>
              <div class="add" v-if="userObject.user_id != userData.user_id">
                <button class="add" @click="sendFriendRequest" v-if="!yesMyFriend && !sentRequest && !recievedRequest"><i class="fas fa-user-plus"></i> Add Friend</button>
                <button class="cancel" @click="cancelFriendRequest" v-if="sentRequest && !yesMyFriend && !recievedRequest"><i class="fas fa-ban"></i> Cancel Request</button>
                <button class="unfriend" @click="unfriend" v-if="yesMyFriend"><i class="fas fa-user-times"></i> Unfriend</button>
                <button class="accept" @click="acceptFriendRequest" v-if="recievedRequest"><i class="far fa-check-circle"></i> Accept Request</button>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-4">
                <div class="leftBtns">
                  <button @click="choosedComponent = 'profilePosts'" :class="{active: choosedComponent == 'profilePosts'}">Posts</button>
                  <button @click="choosedComponent = 'profileAbout'" :class="{active: choosedComponent == 'profileAbout'}">About</button>
                </div>
                <div class="friendsCount">
                  <p><i class="fas fa-users"></i> {{friendsNumber}}</p>
                  <p class="bla">friends</p>
                </div>
              </div>

              <!-- PROFILE AND NAME AREA -->
              <div class="col-lg-4 col-md-4">
                <div class="profilePicture">
                  <div class="profImg">
                    <img v-if="userData.imgURL" :src='userData.imgURL' alt="">
                    <div class="lds-dual-ring" v-if="!userData.imgURL"></div>
                    <i class="fas fa-plus" @click="clicking" v-if="$route.params.userId == userObject.user_id"></i>
                    <input type="file" ref="chooseButton" style="display: none" @change="getProfilePicture">
                  </div>
                  <div>
                    <h5>{{userData.nickname}}</h5>
                    <p>{{userData.bio}}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <div class="rightBtns">
                  <button @click="choosedComponent = 'profileFriends'" :class="{active: choosedComponent == 'profileFriends'}">Friends</button>
                  <button v-if="userObject.user_id != userData.user_id" @click="$store.state.openMessage = true"><i class="fas fa-comment-dots"></i> message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CHOOSE COMPONENT FROM FRIENDS, POSTS OR ABOUT COMPONENTS -->
    <component :is="choosedComponent"></component>
    
    <!-- TO MESSAGE COMPONENT -->
    <Message v-if="$store.state.openMessage" :userId = 'userId' :chatId='chatId'></Message>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE STYLING */
.profile {
  margin-top: 30px;
  min-height: 100vh;
}

/* COVER AND PROFILE PHOTO AREA */
.coverSection {
  .cover {
    height: 320px;
    background-color: rgb(230, 228, 228);
    border-radius: 5px;
    position: relative;
    &:hover {
      img {
        filter: brightness(0.6);
      }
    }
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-in-out;
      border-radius: 5px;
    }
    .lds-dual-ring {
      display: inline-block;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: transparent;
      position: absolute;
      top: 0%;
      left: 0%;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 40px;
      height: 40px;
      margin: 8px;
      position: absolute;
      top: 40%;
      left: 47%;
      border-radius: 50%;
      border: 3px solid $textcolor;
      border-color: $maincolor transparent #ccc transparent;
      animation: lds-dual-ring 1.2s linear infinite;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .upcover {
      border: none;
      background-color: transparent;
      position: absolute;
      top: 5px;
      left: 1%;
      padding: 3px 10px;
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      border: 1px solid transparent;
      cursor: pointer;
      i {
        font-size: 20px;
        color: #fff;
        margin-right: 8px;
        transition: all 0.2s ease-in-out;
      }
      span.info {
        margin-bottom: 3px;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        color: #fff;
        position: relative;
        top: -1.5px;
      }
    }
    &:hover {
      .upcover {
        border: 1px dashed #fff;
        background-color: rgb(68, 68, 68);
        i {
          font-size: 20px;
        }
        span.info {
          opacity: 1;
        }
      }
    }
    .prief {
      display: none;
    }
    .add {
      position: absolute;
      bottom: 5%;
      right: 2%;
      button {
        height: 40px;
        font-size: 15px;
        min-width: 150px;
        padding-right: 20px;
        padding-left: 20px;
        text-align: center;
        transition: 0.5s;
        background-size: 200% auto;
        color: #FFF;
        box-shadow: 0 0 20px #eee;
        border-radius: 30px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        cursor: pointer;
        display: inline-block;
        border: none;
        font-weight: 600;
        outline: none;
        &.add {
          background-image: linear-gradient(to right, #129fc2 0%, #6190d3 51%, $maincolor 100%);
          &:hover {
            background-position: right center;
          }
        }
        &.cancel {
          background-image: linear-gradient(to right, #129fc2 0%, #b1b392 51%, #2BC0E4 100%);
          &:hover {
            background-position: right center;
          }
        }
        &.unfriend {
          background-image: linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%);
          &:hover {
            background-position: right center;
          }
        }
        &.accept {
          background-image: linear-gradient(to right, #1f8d40 0%, #78d2d8 51%, #42b49b 100%);
          &:hover {
            background-position: right center;
          }
        }
      }
    }
  }
  .leftBtns {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    button {
      width: 120px;
      height: 40px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #ccc;
      color: $textcolor;
      margin-right: 10px;
      outline: none;
      font-size: 15px;
      &.active {
        background-color: $maincolor;
        color: #fff;
        border-color: $maincolor;
      }
    }
  }
  .friendsCount {
    text-align: left;
    p {
      font-size: 30px;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 0;
      font-family: 'Montserrat', sans-serif;
      i {
        font-size: 20px;
      }
      &:last-of-type {
        font-size: 15px;
        color: $textcolor;
        margin-top: -5px;
      }
    }
  }
  .profilePicture {
    .profImg {
      width: 140px;
      height: 140px;
      background-color: rgb(230, 228, 228);
      border-radius: 50%;
      margin: auto;
      transform: translateY(-75px);
      box-shadow: 10px 15px 15px rgba(0, 0, 0, 0.2);
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .lds-dual-ring {
      display: inline-block;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: rgb(230, 228, 228);
      position: absolute;
      top: 0%;
      left: 0%;
      border-radius: 50%;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 35px;
      height: 35px;
      margin: 8px;
      position: absolute;
      top: 33%;
      left: 33%;
      border-radius: 50%;
      border: 3px solid $textcolor;
      border-color: $maincolor transparent #ccc transparent;
      animation: lds-dual-ring 1.2s linear infinite;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    i {
      color: #fff;
      background-color: #fa534e;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      line-height: 38px;
      position: absolute;
      bottom: -2%;
      right: 0;
      z-index: 99999999;
      cursor: pointer;
      &:hover {
        background-color: #f86c67;
      }
    }
    h5 {
      margin-top: -60px;
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 0;
      text-transform: capitalize;
    }
    p {
      color: $textcolor;
      letter-spacing: 0.5px;
    }
  }
  .rightBtns {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      width: 120px;
      height: 40px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #ccc;
      color: $textcolor;
      margin-left: 10px;
      outline: none;
      font-size: 15px;
      &.active {
        background-color: $maincolor;
        color: #fff;
        border-color: $maincolor;
      }
    }
  }
  /* start media query of section 1 */
  @include sm {
    .cover {
      height: 270px;
      .upcover {
        top: 5px;
        left: 1%;
        i {
          font-size: 18px;
        }
        span.info {
          font-size: 15px;
        }
      }
      &:hover {
        .upcover {
          i {
            font-size: 18px;
          }
        }
      }
      .add {
        button {
          font-size: 13px;
          min-width: 130px;
        }
      }
    }
    .leftBtns {
      margin-top: 5px;
      button {
        width: 80px;
        height: 32px;
        margin-right: 8px;
        outline: none;
        font-size: 12px;
      }
    }
    .friendsCount {
      p {
        font-size: 28px;
        &:last-of-type {
          font-size: 12px;
        }
      }
    }
    .profilePicture {
      .profImg {
        width: 110px;
        height: 110px;
        background-color: rgb(230, 228, 228);
        border-radius: 50%;
        margin: auto;
        transform: translateY(-55px);
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        margin-bottom: 15px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 28px;
        height: 28px;
        margin: 8px;
        position: absolute;
        top: 33%;
        left: 31%;
        border-radius: 50%;
        border: 3px solid $textcolor;
        border-color: $maincolor transparent #ccc transparent;
        animation: lds-dual-ring 1.2s linear infinite;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      i {
        color: #fff;
        background-color: #fa534e;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        line-height: 35px;
        position: absolute;
        bottom: -2%;
        right: 0;
        font-size: 13px;
        cursor: pointer;
        &:hover {
          background-color: #f86c67;
        }
      }
      h5 {
        margin-top: -50px;
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 0;
      }
      p {
        color: $textcolor;
        letter-spacing: 0.5px;
        font-size: 13px;
      }
   }
    .rightBtns {
      margin-top: 5px;
      button {
        width: 80px;
        height: 32px;
        margin-left: 8px;
        outline: none;
        font-size: 12px;
      }
    }
    .add {
      margin-top: 10px;
      button {
        min-width: 80px;
        height: 33px;
        outline: none;
        font-size: 12px;
        padding-right: 5px;
        padding-left: 5px;
      }
    }
  }
  @include mb {
    .cover {
      height: 200px;
      .lds-dual-ring:after {
      content: " ";
        width: 35px;
        height: 35px;
        top: 40%;
        left: 43%;
      }
      .upcover {
        top: 5px;
        left: 1%;
        padding: 0 10px;
        i {
          font-size: 15px;
        }
        span.info {
          font-size: 12px;
          line-height: 0px;
          top: -2px;
        }
      }
      &:hover {
        .upcover {
          i {
            font-size: 15px;
          }
        }
      }
      .prief {
        display: inline-block;
        color: #fff;
        position: absolute;
        top: 2%;
        right: 2%;
        background-color: transparent;
        font-size: 15px;
        i.fa-ellipsis-v {
          width: 30px;
          height: 30px;
          line-height: 29px;
          border: 1px solid #fff;
          border-radius: 50%;
          cursor: pointer;
          &::after {
            content: none;
          }
          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
        ul {
          li {
            padding-left: 15px;
            padding-top: 3px;
            padding-bottom: 3px;
            cursor: pointer;
            color: $textcolor;
            font-size: 15px;
            &:hover {
              background-color: rgb(231, 231, 231);
            }
            i {
              margin-right: 5px;
            }
          }
        }
        .dropdown-menu {
          left: -300%;
          min-width: 150px;
          padding-bottom: 0;
        }
      }
      .add {
        button {
          min-width: 90px;
          font-size: 10px;
          padding: 5px 10px;
          height: 30px;
        }
      }
    }
    .leftBtns {
      display: none;
    }
    .friendsCount {
      display: none;
    }
    .profilePicture {
      .profImg {
        width: 90px;
        height: 90px;
        background-color: rgb(230, 228, 228);
        border-radius: 50%;
        margin: auto;
        transform: translateY(-50px);
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 25px;
        height: 25px;
        margin: 8px;
        position: absolute;
        top: 30%;
        left: 29%;
        border-radius: 50%;
        border: 3px solid $textcolor;
        border-color: $maincolor transparent #ccc transparent;
        animation: lds-dual-ring 1.2s linear infinite;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
      i {
        color: #fff;
        background-color: #fa534e;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        line-height: 28px;
        position: absolute;
        bottom: -2%;
        right: 0;
        font-size: 10px;
        cursor: pointer;
        &:hover {
          background-color: #f86c67;
        }
      }
      h5 {
        margin-top: -30px;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 0;
      }
      p {
        color: $textcolor;
        letter-spacing: 0.5px;
        font-size: 12px;
      }
    }
    .rightBtns {
      display: none;
    }
  }
  /* end media query of section 1 */
}

</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
import Message from '../components/Message'
import profilePosts from '../components/profilePosts'
import profileAbout from '../components/profileAbout'
import profileFriends from '../components/profileFriends'
export default {
  data() {
    return {
      userData: {},
      userObject: '',
      friendsNumber: '',
      commentInfo: '',
      postIdForReactsList: '',
      userId: this.$route.params.userId,
      chatId: '',
      commentImg: '',
      postIdForDeleting: '',
      postIdForEditing: '',
      userIdForEditingPost: '',
      choosedComponent: 'profilePosts',
      yesMyFriend: Boolean,
      recievedRequest: Boolean,
      sentRequest: Boolean,
    }
  },
  watch: {
    /* لو كنت ف صفحة البروفايل بتاعتك وعاوز تروح صفحة بروفايل حد تاني لازم تعمل ريلود علشان تاخد الصفحه الجديده بيانات اليوزر التاني
    بدل ما البيانات تتغير قدامك ويبقي شكلها وحش  */
    async '$route' () {
      await location.reload()
    }
  },
  methods: {
    // CLICK INPUT FILE TO CHANGE PROFILE PICTURE
    clicking() {
      this.$refs['chooseButton'].click();
    },

    // ADD PROFILE PICTURE
    getProfilePicture(e) {
      this.userData.imgURL = ''
      let image = e.target.files[0];
      firebase.storage().ref('profilePictures/' + image.name).put(image)
      .then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('profilePictures/' + image.name).getDownloadURL().then(URL => {
            this.userData.imgURL = URL;
            console.log(this.userData)
            let curUser = firebase.auth().currentUser.uid;
            firebase.firestore().collection('users').doc(curUser).update({
              imgURL: URL
            })
          })
        }
      })
    },

    // CLICK INPUT FILE TO CHANGE COVER PICTURE
    clicking2() {
      this.$refs['uploadCover'].click();
    },

    // ADD COVER PHOTO
    coverPhoto(e) {
      this.userData.coverURL = '';
      let coverImage = e.target.files[0];
      firebase.storage().ref('coverPhotos/' + coverImage.name).put(coverImage).then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('coverPhotos/' + coverImage.name).getDownloadURL().then(URL => {
            this.userData.coverURL = URL
            console.log(this.userData);
            let currentUserUID = firebase.auth().currentUser.uid;
            firebase.firestore().collection('users').doc(currentUserUID).update({
              coverURL: URL
            })
          })
        }
      })
    },

    // SEND FRIEND REQUEST
    sendFriendRequest() {
      firebase.firestore().collection('users').doc(this.$route.params.userId).update({
        requests: admin.firestore.FieldValue.arrayUnion({
          userId: firebase.auth().currentUser.uid
        })
      })
    },

    // CANCEL FRIEND REQUEST
    cancelFriendRequest() {
      firebase.firestore().collection('users').doc(this.$route.params.userId).update({
        requests: admin.firestore.FieldValue.arrayRemove({
          userId: firebase.auth().currentUser.uid
        })
      })
    },

    // UN FRIEND A FRIEND
    unfriend() {
      firebase.firestore().collection('users').doc(this.$route.params.userId).update({
        friends: admin.firestore.FieldValue.arrayRemove({
          userId: firebase.auth().currentUser.uid
        })
      })
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        friends: admin.firestore.FieldValue.arrayRemove({
          userId: this.$route.params.userId
        })
      })
    },

    // ACCEPT FRIEND REQUEST METHOD
    acceptFriendRequest() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        friends: admin.firestore.FieldValue.arrayUnion({
          userId: this.$route.params.userId
        })
      })
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        requests: admin.firestore.FieldValue.arrayRemove({
          userId: this.$route.params.userId
        })
      })
      firebase.firestore().collection('users').doc(this.$route.params.userId).update({
        friends: admin.firestore.FieldValue.arrayUnion({
          userId: firebase.auth().currentUser.uid
        })
      })
    },

    createChat() {    // delete this function if you are sure about message component works very well
      firebase.firestore().collection('chats').get().then(docs => {
        if(!docs.empty) {
          let test = docs.docs.find(doc => {
            return doc.data().users[0] == this.$route.params.userId && doc.data().users[1] == firebase.auth().currentUser.uid || doc.data().users[1] == this.$route.params.userId && doc.data().users[0] == firebase.auth().currentUser.uid;
          })
          if(test) {
            this.chatId = test.data().chatId
          } else {
            this.chatId = 'a' + Math.random() * 10000000;
          }
        } else {
          this.chatId = 'a' + Math.random() * 10000000;
        }
      })
    },

    // CHECK IF USER ALEARDY SENT A FRIEND REQUEST TO THIS USER HE IS IN HIS PROFILE
    sentRequestFunc() {
      firebase.firestore().collection('users').doc(this.userData.user_id).get().then(doc => {
        if(doc.data().requests.length > 0) {
          doc.data().requests.forEach(one => {
            if(one.userId == firebase.auth().currentUser.uid) {
              this.sentRequest = true;
            } else {
              this.sentRequest = false;
            }
          })
        } else {
          this.sentRequest = false;
        }
      })
    },

    // CHECK IF THIS USER IS A FRIEND WITH THE PROFILE OWNER
    yesMyFriendFunc() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
        if(doc.data().friends.length > 0) {
          var exist = false;
          for (var i = 0; i < doc.data().friends.length; i++) {
            if(doc.data().friends[i].userId == this.userData.user_id) {
              exist = true;
              break;
            }
          }
          if (exist) {
            this.yesMyFriend = true;
          } else {
            this.yesMyFriend = false;
          }
        } else {
          this.yesMyFriend = false;
        }
      })
    },

    // CHECK IF THIS USER RECIEVED A FRIEND REQUEST FROM THE PROFILE OWNER
    recievedRequestFunc() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
        if(doc.data().requests.length > 0) {
          doc.data().requests.forEach(request => {
            if(request.userId == this.userData.user_id) {
              this.recievedRequest = true;
            } else {
              this.recievedRequest = false;
            }
          })
        } else {
          this.recievedRequest = false;
        }
      })
    },

  },
  async created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE PROFILE PAGE TITLE
    document.title = 'Profile | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeReview();

    // EMPTY FRIENDS LIST FOR LISTENING TO REMOVING FRIENDS FROM USER'S FRIENDS LIST
    this.$store.state.userFriends = await []
    // GETTING USER DATA FOR THIS PROFILE
    var data = firebase.firestore().collection('users').doc(this.$route.params.userId);
    await data.get().then(doc => {
      this.userData = doc.data()
      this.friendsNumber = doc.data().friends.length
    })
    // GETTING CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.userObject = doc.data()
    })
    // LISTEN FOR SENDING AND RECIEVING FRIEND REQUESTS
    firebase.firestore().collection('users').onSnapshot(docs => {
      // console.log(change.docs)
      docs.forEach(doc => {
        console.log(doc.data())
        // CHECK IF THIS USER IS MY FRIEND
        this.yesMyFriendFunc();
        // CHECK IF THE USER SENT ME A FRIEND REQUEST
        this.recievedRequestFunc();
        // CHECK IF THIS USER DID NOT ACCEPT MY FRIEND REQUEST
        this.sentRequestFunc();
      })
    })
    // CHECK IF THIS USER IS MY FRIEND
    await this.yesMyFriendFunc();

    // CHECK IF THE USER SENT ME A FRIEND REQUEST
    await this.recievedRequestFunc();

    // CHECK IF THIS USER DID NOT ACCEPT MY FRIEND REQUEST
    await this.sentRequestFunc();


    // GENERATE CHATID FOR NEW CHAT ROOM BETWEEN TWO USERS
    firebase.firestore().collection('chats').get().then(docs => {
      if(!docs.empty) {
        let test = docs.docs.find(doc => {
          return doc.data().users[0] == this.$route.params.userId && doc.data().users[1] == firebase.auth().currentUser.uid || doc.data().users[1] == this.$route.params.userId && doc.data().users[0] == firebase.auth().currentUser.uid;
        })
        if(test) {
          this.chatId = test.data().chatId
        } else {
          this.chatId = 'a' + Math.random() * 10000000;
        }
      } else {
        this.chatId = 'a' + Math.random() * 10000000;
      }
      console.log(this.chatId)
    })

  },
  components: {
    Message,
    profilePosts,
    profileAbout,
    profileFriends,
  },
}
</script>