<template>
  <div class="confirmEditing">
    <div class="container">
      <div class="edit">
        <div class="lds-dual-ring" v-if="!postDetails"></div>
        <div v-if="postDetails">
          <i class="fas fa-times" @click="$store.state.openEditPost = false"></i>
          <div class="postHead">
            <img :src="userObject.imgURL" alt="">
            <div class="inside">
              <h5>{{userObject.nickname}}</h5>
              <p>{{postDetails.time | timeFormat}}</p>
            </div>
          </div>
          <div class="reTyping">
            <textarea name="" id="newPostContent" placeholder="Write Your Editing" :value='postDetails.content' @focus="focus"></textarea>
            <i class="far fa-grin-alt" @click="showAndHideEmojis"></i>
            <vEmojiPicker class="selectEmoji" @select="selectEmoji" id="emojiPicker2"/>
            <i class="far fa-image" v-if="!postDetails.postImage" @click="clicking"></i>
            <input type="file" id="addPhoto" @change="addNewPostPhoto" style="display: none">
          </div>
          <div class="lds-dual-ring" v-if="show && !newPostImage && !postDetails.postImage"></div>
          <div class="postImage" v-if="postDetails.postImage || newPostImage">
            <img :src="postDetails.postImage ? postDetails.postImage : newPostImage" alt="">
            <div class="changeImg">
              <i class="far fa-image"></i>
              <input type="file" id="changePhoto" @change="changePostPhoto" style="display: none">
              <span @click="clicking2"> change Photo</span>
            </div>
            <i class="fas fa-times" @click="deletePostImage"></i>
          </div>
          <div class="options">
            <button class="save" @click="savePostEditing">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
@keyframes show {
  0% {transform: scale(0.5)}
  50% {transform: scale(1.2)}
  100% {transform: scale(1)}
}
.confirmEditing {
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  z-index: 9999999999;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  align-items: center;
  &.animation {
    .edit {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  .edit {
    background-color: rgb(231, 231, 231);
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    text-align: center;
    .lds-dual-ring {
      display: inline-block;
      width: 150px;
      height: 150px;
      background-color: rgb(231, 231, 231);
      z-index: 9999999;
      position: relative;
      left: 8%;
      margin-top: 19%;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 40px;
      height: 40px;
      margin: 8px;
      border-radius: 50%;
      border: 3px solid $textcolor;
      border-color: $maincolor transparent rgb(212, 212, 212) transparent;
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
    .fa-times {
      position: absolute;
      top: 25px;
      right: 25px;
      background-color: rgb(216, 215, 215);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      cursor: pointer;
      &:hover {
        background-color: rgb(196, 194, 194);
      }
    }
    .postHead {
        text-align: left;
        display: flex;
        margin-bottom: 20px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
        padding: 2px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        border: 1px solid rgb(221, 220, 220);
      }
      .inside {
        h5 {
          margin-top: 10px;
          margin-bottom: 0;
          font-size: 17px;
          text-transform: capitalize;
        }
        p {
          font: {
            size: 13px;
          }
          color: $textcolor;
        }
      }
    }
    .reTyping {
      position: relative;
      textarea {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 10px;
        padding: 0 50px 0 5px;
        outline: none;
        line-height: 40px;
        background-color: rgb(231, 231, 231);
        margin-bottom: 5px;
      }
      i.fa-grin-alt {
        background-color: transparent;
        color: rgb(138, 136, 136);
        position: absolute;
        top: 25%;
        right: 3%;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: $secondcolor;
        }
      }
      .selectEmoji {
        position: absolute;
        top: 30%;
        right: 2%;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        padding-bottom: 5px;
        background-color: #f4f4f4;
        transform: scale(0.9);
        height: 400px;
        display: none;
        z-index: 99999999999;
        &.show {
          display: block;
        }
      }
      .fa-image {
        position: absolute;
        top: 25%;
        right: 8%;
        color: rgb(138, 136, 136);
        cursor: pointer;
        font: {
          size: 18px;
        }
        &:hover {
          color: $secondcolor;
        }
      }
    }
    .postImage {
      max-height: 400px;
      position: relative;
      img {
        width: 100%;
        max-height: inherit;
        border-radius: 5px;
        margin-bottom: 10px;
      }
      .lds-dual-ring {
        display: inline-block;
        width: 150px;
        height: 150px;
        background-color: rgb(231, 231, 231);
        z-index: 9999999;
        position: relative;
        left: 0%;
        margin-top: 0%;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid $textcolor;
        border-color: $maincolor transparent rgb(212, 212, 212) transparent;
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
      .changeImg {
        position: absolute;
        top: 3%;
        left: 1%;
        background-color: rgb(231, 231, 231);
        border-radius: 3px;
        padding: 2px 7px;
        display: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .fa-times {
        position: absolute;
        top: 3%;
        right: 3%;
        width: 25px;
        height: 25px;
        line-height: 26px;
        font-size: 13px;
        display: none;
      }
      &:hover {
        .changeImg {
          display: block;
        }
        .fa-times {
          display: block;
        }
      }
    }
    .options {
      button {
        display: block;
        width: 100%;
        margin-top: 5px;
        border-radius: 5px;
        border: none;
        color: #fff;
        padding: 5px;
        outline: none;
        background-color: $maincolor;
        &:hover {
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          background-color: #0651c9;
        }
      }
    }
  }
}
@include mb {
  .confirmEditing {
    .edit {
      width: 90%;
      .fa-times {
        width: 22px;
        height: 22px;
        line-height: 22px;
        font-size: 12px;
      }
      .postHead {
        text-align: left;
        display: flex;
        margin-bottom: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          padding: 2px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid rgb(221, 220, 220);
        }
        .inside {
          h5 {
            margin-top: 8px;
            font-size: 14px;
          }
          p {
            font: {
              size: 10px;
            }
            color: $textcolor;
          }
        }
      }
      .reTyping {
        textarea {
          height: 35px;
          padding: 0 20% 0 5px;
          outline: none;
          line-height: 35px;
          background-color: rgb(231, 231, 231);
          margin-bottom: 5px;
          font-size: 13px;
          resize: none;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 25%;
          right: 1%;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
          }
        }
        .selectEmoji {
          top: -110%;
          right: -20%;
          background-color: #f4f4f4;
          transform: scale(0.6);
          height: 400px;
        }
        .fa-image {
          position: absolute;
          top: 25%;
          right: 8%;
          font: {
            size: 14px;
          }
        }
      }
      .lds-dual-ring {
        left: 17%;
        height: 100px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
      }
      .postImage {
        img {
          width: 100%;
          max-height: inherit;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 150px;
          height: 150px;
          background-color: rgb(231, 231, 231);
          z-index: 9999999;
          position: relative;
          left: 0%;
          margin-top: 0%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 30px;
          height: 30px;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .changeImg {
          font-size: 12px;
        }
        .fa-times {
          width: 18px;
          height: 18px;
          line-height: 18px;
          font-size: 10px;
        }
      }
      .options {
        button {
          padding: 4px;
          font-size: 13px;
        }
      }
    }
  }
}
@include sm {
  .confirmEditing {
    .edit {
      .fa-times {
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
      }
      .postHead {
        text-align: left;
        display: flex;
        margin-bottom: 10px;
        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          margin-right: 10px;
          padding: 2px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid rgb(221, 220, 220);
        }
        .inside {
          h5 {
            margin-top: 10px;
            font-size: 15px;
          }
          p {
            font: {
              size: 11px;
            }
            color: $textcolor;
          }
        }
      }
      .reTyping {
        textarea {
          height: 40px;
          padding: 0 20px 0 5px;
          outline: none;
          line-height: 40px;
          background-color: rgb(231, 231, 231);
          margin-bottom: 5px;
          font-size: 15px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 25%;
          right: 3%;
          font-size: 15px;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
          }
        }
        .selectEmoji {
          top: -55%;
          right: -12%;
          background-color: #f4f4f4;
          transform: scale(0.7);
          height: 400px;
        }
        .fa-image {
          position: absolute;
          top: 25%;
          right: 8%;
          font: {
            size: 15px;
          }
          &:hover {
            color: $secondcolor;
          }
        }
      }
      .lds-dual-ring {
        left: 15%;
        height: 120px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
      }
      .postImage {
        img {
          width: 100%;
          max-height: inherit;
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 150px;
          height: 150px;
          background-color: rgb(231, 231, 231);
          z-index: 9999999;
          position: relative;
          left: 0%;
          margin-top: 0%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 30px;
          height: 30px;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .changeImg {
          font-size: 13px;
        }
        .fa-times {
          width: 20px;
          height: 20px;
          line-height: 20px;
          font-size: 11px;
        }
      }
      .options {
        button {
          padding: 3px;
        }
      }
    }
  }
}
@include md {
 .confirmEditing {
   .edit {
     .postHead {
        text-align: left;
        display: flex;
        margin-bottom: 10px;
      img {
        width: 60px;
        height: 60px;
      }
      .inside {
        h5 {
          margin-top: 8px;
          margin-bottom: 0;
          font: {
            size: 18px;
          }
        }
        p {
          font: {
            size: 12px;
          }
          color: $textcolor;
        }
      }
    }
   }
 }
}
</style>

<script>
import firebase from 'firebase'
import vEmojiPicker from 'v-emoji-picker'
import moment from 'moment'
export default {
  data() {
    return {
      userObject: '',
      postDetails: '',
      newPostImage: '',
      show: false
    }
  },
  methods: {
    selectEmoji(emoji) {
      var ourTextArea = document.getElementById('newPostContent');
      var emojis = emoji.data
      ourTextArea.value += emojis
      this.postDetails.content = ourTextArea.value
    },
    showAndHideEmojis() {
      document.getElementById('emojiPicker2').classList.toggle('show');
    },
    clicking() {
      document.getElementById('addPhoto').click();
    },
    clicking2() {
      document.getElementById('changePhoto').click();
    },
    deletePostImage() {
      this.postDetails.postImage = '';
      this.postDetails.content = document.getElementById('newPostContent').value;
    },
    addNewPostPhoto(e) {
      this.show = true
      this.postDetails.content = document.getElementById('newPostContent').value;
      var newPhoto = e.target.files[0];
      var newPhotoName = (+new Date()) + '-' + newPhoto.name;
      var uploadPostPhoto = firebase.storage().ref('postImages/' + newPhotoName).put(newPhoto);
      uploadPostPhoto.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('postImages/' + newPhotoName).getDownloadURL().then(URL => {
            this.newPostImage = URL;
            this.postDetails.postImage = URL;
          })
        }
      })
    },
    changePostPhoto(e) {
      this.postDetails.postImage = ''
      this.show = true
      this.postDetails.content = document.getElementById('newPostContent').value;
      var newPhoto = e.target.files[0];
      var newPhotoName = (+new Date()) + '-' + newPhoto.name;
      var uploadPostPhoto = firebase.storage().ref('postImages/' + newPhotoName).put(newPhoto);
      uploadPostPhoto.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('postImages/' + newPhotoName).getDownloadURL().then(URL => {
            this.newPostImage = URL;
            this.postDetails.postImage = URL;
          })
        }
      })
    },
    savePostEditing() {
      this.postDetails.content = document.getElementById('newPostContent').value;
      this.postDetails.postImage = this.newPostImage
      firebase.firestore().collection('posts').doc(this.postDetails.postId).update({
        ...this.postDetails
      })
      this.$store.state.posts.forEach(post => {
        if(post.postId == this.postDetails.postId) {
          post.content = document.getElementById('newPostContent').value;
          post.postImage = this.newPostImage;
        }
      })
      this.$store.state.openEditPost = false
    },
    focus() {
      document.getElementById('emojiPicker2').classList.remove('show')
    }
  },
  created() {
    console.log(this.postIdForEditing);
    // GET POST DETAILS
    firebase.firestore().collection('posts').doc(this.postIdForEditing).get().then(doc => {
      this.postDetails = doc.data();
      // this.newPostImage = doc.data().postImage;
    })
    // GET POST OWNER DATA
    firebase.firestore().collection('users').doc(this.userIdForEditingPost).get().then(doc => {
        this.userObject = doc.data();
    })
  },
  mounted () {
    document.querySelector(".confirmEditing").classList.add("animation")
  },
  props: ['postIdForEditing', 'userIdForEditingPost'],
  components: {
    vEmojiPicker
  },
  filters: {
    timeFormat(time) {
      return moment(time).fromNow();
    }
  }
}
</script>