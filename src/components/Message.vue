<template>
  <div class="message">
    <!-- TYPE NEW MESSAGE AREA -->
    <div class="messageArea">
      <i class="fas fa-times" @click="$store.state.openMessage = false"></i>
      <div class="userPhoto">
        <img class="userPhoto" :src="userObject.imgURL" alt="" v-if="userObject.imgURL">
        <div class="lds-dual-ring" v-if="!userObject.imgURL"></div>
      </div>
      <div class="sender">
        <div class="textArea">
          <textarea name="" id="chatField" placeholder="Type Your Message" v-model="message" @focus="focus"></textarea>
          <i class="far fa-grin-alt" @click="showAndHideEmojis"></i>
          <vEmojiPicker class="selectEmoji" @select="selectEmoji" id="emojiPicker"/>
        </div>
        <div class="imageReview hide" id="imageReview">
          <i class="fas fa-times cancelImage" @click="cancelSendingChatImage"></i>
          <img :src="chatImageURL" alt="">
          <div class="lds-dual-ring" v-if="!chatImageURL"></div>
        </div>
        <div class="lds-dual-ring" v-if="!chatImageURL"></div>
        <input type="file" id="sendImageMessage" style="display: none" ref="sendImageMessage" @change="sendImage">
        <button class="media2"  @click="clicking"><i class="fas fa-camera"></i></button>
        <button @click="sendMessage">send message</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../css/mixins.scss';
@import '../css/variables.scss';
@keyframes show {
  0% {transform: scale(0.5)}
  50% {transform: scale(1.2)}
  100% {transform: scale(1)}
}
/* MAIN PAGE STYLING */
.message {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;

  /* ANIMATION FOR THE COMPONENT */
  &.animation {
    .messageArea {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }

  /* MESSAGE AREA */
  .messageArea {
    background-color: rgb(231, 231, 231);
    margin: auto;
    padding: 30px 20px 0px 20px;
    position: relative;
    width: 35%;
    border-radius: 5px;
    display: flex;
    i.fa-times {
      position: absolute;
      top: -15px;
      right: -15px;
      background-color: rgba(0, 0, 0, 0.9);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 29px;
      color: #fff;
      cursor: pointer;
      border: 1px solid #fff;
      font: {
        size: 13px;
      }
    }
    .userPhoto {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: -20px;
      left: -15px;
      z-index: 999;
      img.userPhoto {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgb(231, 231, 231);
        padding: 5px;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
      }
      .lds-dual-ring {
        display: inline-block;
        width: 100%;
        height: 100%;
        z-index: 9999999;
        position: absolute;
        top: -20px;
        left: -15px;
        background-color: rgb(231, 231, 231);
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 25px;
        height: 25px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid $textcolor;
        position: absolute;
        top: 24%;
        left: 24%;
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
    }
    .sender {
      text-align: left;
      width: 90%;
      .textArea {
        width: 100%;
        height: 100px;
        margin-bottom: 7px;
        margin-left: 5%;
        position: relative;
        textarea {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          padding: 5px 30px 10px 10px;
          outline: none;
          border: 1px solid #ccc;
          box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
          resize: none;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 10%;
          right: 3%;
          font-size: 20px;
          border: none;
          box-shadow: none;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
            background-color: transparent;
          }
        }
        .selectEmoji {
          position: absolute;
          top: 10%;
          right: 0%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          transform: scale(0.9);
          &.show {
            display: block;
          }
        }
      }
      .imageReview {
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        width: 30%;
        margin: 20px auto 30px;
        border-radius: 10px;
        width: 170px;
        height: 150px;
        text-align: center;
        display: flex;
        align-content: center;
        align-items: center;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        .cancelImage {
          position: absolute;
          top: -5%;
          right: -5%;
          background-color: rgba(0, 0, 0, 0.8);
          width: 20px;
          height: 20px;
          font-size: 11px;
          line-height: 18px;
          border-radius: 20%;
        }
        i.fa-times {
          color: #fff;
          cursor: pointer;
        }
        img {
          width: auto;
          height: auto;
          max-width: 140px;
          max-height: 130px;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          margin: auto;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 150px;
          height: 150px;
          z-index: 9999999;
          position: absolute;
          top: 35%;
          left: 37%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 35px;
          height: 35px;
          margin: 8px;
          border-radius: 50%;
          border: 3px solid $textcolor;
          border-color: #868686 transparent #ccc transparent;
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
        &.hide {
          display: none;
        }
      }
      button {
        width: 250px;
        height: 30px;
        font-size: 17px;
        border-radius: 10px;
        background-color: $maincolor;
        color: #fff;
        border: none;
        outline: none;
        margin-right: 10px;
        margin-bottom: 30px;
        box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
        &:hover {
          background-color: #0157e0;
        }
        &.media2 {
          width: 50px;
          height: 30px;
          border-radius: 10px;
          border: none;
          background-color: #fff;
          box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
          color: rgb(100, 100, 100);
          margin-left: 5%;
          &:hover {
            background-color: $secondcolor;
            color: rgb(224, 223, 223);
          }
        }
      }
    }
  }

  /* MOBILE SCREEN VIEW */
  @include md {
    .messageArea {
      padding: 30px 20px 0px 20px;
      width: 40%;
      i.fa-times {
        top: -15px;
        right: -15px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 29px;
        font: {
          size: 12px;
        }
      }
      .userPhoto {
        width: 75px;
        height: 75px;
        top: -20px;
        left: -15px;
        img.userPhoto {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 5px;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 100%;
          height: 100%;
          z-index: 9999999;
          position: absolute;
          top: -20px;
          left: -15px;
          background-color: rgb(231, 231, 231);
          box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 25px;
          height: 25px;
          margin: 8px;
          border-radius: 50%;
          border: 3px solid $textcolor;
          position: absolute;
          top: 24%;
          left: 24%;
          border-color: $maincolor transparent #ccc transparent;
          animation: lds-dual-ring 1.2s linear infinite;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
      }
      .sender {
        text-align: left;
        width: 90%;
        .textArea {
          width: 100%;
          height: 100px;
          margin-bottom: 7px;
          margin-left: 5%;
          textarea {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding: 5px 30px 10px 10px;
            outline: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
            font-size: 15px;
          }
          i.fa-grin-alt {
            top: 10%;
            right: 3%;
            font-size: 18px;
          }
          .selectEmoji {
            top: -10%;
            right: -4%;
            padding-bottom: 5px;
            transform: scale(0.8);
            &.show {
              display: block;
            }
          }
        }
        .imageReview {
          padding: 10px;
          width: 30%;
          margin: 20px auto 30px;
          border-radius: 10px;
          width: 160px;
          height: 140px;
          .cancelImage {
            top: -5%;
            right: -5%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            line-height: 18px;
            border-radius: 20%;
          }
          i.fa-times {
            color: #fff;
            cursor: pointer;
          }
          img {
            max-width: 130px;
            max-height: 120px;
          }
          .lds-dual-ring {
            width: 150px;
            height: 150px;
            top: 35%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 32px;
            height: 32px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        button {
          width: 200px;
          height: 30px;
          font-size: 16px;
          border-radius: 10px;
          margin-right: 10px;
          margin-bottom: 30px;
          &.media2 {
            width: 45px;
            height: 30px;
            border-radius: 10px;
            margin-left: 5%;
            font-size: 16px;
          }
        }
      }
    }
  }

  /* SMALL SCREEN VIEW */
  @include sm {
    .messageArea {
      padding: 30px 20px 0px 20px;
      width: 50%;
      i.fa-times {
        top: -15px;
        right: -15px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 29px;
        font: {
          size: 12px;
        }
      }
      .userPhoto {
        width: 75px;
        height: 75px;
        top: -20px;
        left: -15px;
        img.userPhoto {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 5px;
        }
      }
      .sender {
        text-align: left;
        width: 90%;
        .textArea {
          width: 100%;
          height: 100px;
          margin-bottom: 7px;
          margin-left: 5%;
          textarea {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding: 5px 30px 10px 10px;
            outline: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
            font-size: 15px;
          }
          i.fa-grin-alt {
            top: 10%;
            right: 3%;
            font-size: 18px;
          }
          .selectEmoji {
            top: -10%;
            right: -4%;
            padding-bottom: 5px;
            transform: scale(0.8);
            &.show {
              display: block;
            }
          }
        }
        .imageReview {
          padding: 10px;
          width: 30%;
          margin: 20px auto 30px;
          border-radius: 10px;
          width: 160px;
          height: 140px;
          .cancelImage {
            top: -5%;
            right: -5%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            line-height: 18px;
            border-radius: 20%;
          }
          i.fa-times {
            color: #fff;
            cursor: pointer;
          }
          img {
            max-width: 130px;
            max-height: 120px;
          }
          .lds-dual-ring {
            width: 150px;
            height: 150px;
            top: 35%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 32px;
            height: 32px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        button {
          width: 200px;
          height: 30px;
          font-size: 16px;
          border-radius: 10px;
          margin-right: 10px;
          margin-bottom: 30px;
          &.media2 {
            width: 45px;
            height: 30px;
            border-radius: 10px;
            margin-left: 5%;
            font-size: 16px;
          }
        }
      }
    }
  }

  /* MEDUIM SCREEN VIEW */
  @include mb {
    .messageArea {
      padding: 30px 20px 0px 20px;
      width: 80%;
      i.fa-times {
        top: -12px;
        right: -12px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        line-height: 23px;
        font: {
          size: 10px;
        }
      }
      .userPhoto {
        width: 65px;
        height: 65px;
        top: -15px;
        left: -12px;
        img.userPhoto {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 4px;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 100%;
          height: 100%;
          z-index: 9999999;
          position: absolute;
          top: -15px;
          left: -12px;
          background-color: rgb(231, 231, 231);
          box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 22px;
          height: 22px;
          margin: 8px;
          border-radius: 50%;
          border: 3px solid $textcolor;
          position: absolute;
          top: 22%;
          left: 22%;
          border-color: $maincolor transparent #ccc transparent;
          animation: lds-dual-ring 1.2s linear infinite;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
      }
      .sender {
        text-align: left;
        width: 100%;
        .textArea {
          width: 100%;
          height: 100px;
          margin-bottom: 7px;
          margin-left: 0%;
          textarea {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding: 5px 30px 10px 10px;
            outline: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
            font-size: 11px;
          }
          i.fa-grin-alt {
            top: 8%;
            right: 3%;
            font-size: 14px;
          }
          .selectEmoji {
            top: -60px;
            right: -50px;
            padding-bottom: 5px;
            transform: scale(0.6);
            &.show {
              display: block;
            }
          }
        }
        .imageReview {
          padding: 10px;
          width: 30%;
          margin: 20px auto 30px;
          border-radius: 10px;
          width: 130px;
          height: 110px;
          .cancelImage {
            top: -5%;
            right: -5%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            line-height: 18px;
            border-radius: 20%;
          }
          i.fa-times {
            color: #fff;
            cursor: pointer;
          }
          img {
            max-width: 100px;
            max-height: 90px;
          }
          .lds-dual-ring {
            width: 150px;
            height: 150px;
            top: 30%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 28px;
            height: 28px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        button {
          width: 60%;
          height: 30px;
          font-size: 11px;
          border-radius: 10px;
          margin-right: 10px;
          margin-bottom: 30px;
          &.media2 {
            width: 35px;
            height: 30px;
            border-radius: 10px;
            margin-left: 0%;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
import vEmojiPicker from 'v-emoji-picker'
export default {
  data() {
    return {
      userObject: '',
      message: '',
      chatImageURL: '',
      chatImageName: '',
      msgId: Math.floor(Math.random() * 10000000000),
      chatExists: false
    }
  },
  methods: {
    // SEND MESSAGE
    sendMessage() {
      if(this.message || this.chatImageURL) {
        const chatId = this.chatId;
        const userId = this.userId;
        var lastSeen = {};
        lastSeen[userId] = ''
        lastSeen[firebase.auth().currentUser.uid] = this.msgId
        var deleted = {};
        deleted[firebase.auth().currentUser.uid] = false;
        deleted[userId] = false
        firebase.firestore().collection('chats').get().then(docs => {
          if(!docs.empty) {
            docs.forEach(doc => {
              if (doc.data().chatId == this.chatId) {
                this.chatExists = true;
                let deleteMsg = {};
                deleteMsg[firebase.auth().currentUser.uid] = false;
                deleteMsg[userId] = false
                firebase.firestore().collection('chats').doc(this.chatId).update({
                  messages: admin.firestore.FieldValue.arrayUnion({
                    chatImage: this.chatImageURL,
                    content: this.message,
                    userId: firebase.auth().currentUser.uid,
                    msgId: this.msgId,
                    sentAt: Date.now(),
                    deleteMsg
                  }),
                  lastSeen: {
                    ...doc.data().lastSeen,
                    [firebase.auth().currentUser.uid]: this.msgId
                  },
                  lastUpdated: Date.now(),
                  deleted: {
                    [userId]: false,
                    [firebase.auth().currentUser.uid]: false
                  }
                }).then(() => {
                    this.message = '';
                    this.chatImageURL = '';
                    // this.$router.go(-1);
                    this.$store.state.openMessage = false
                })
              }

            })
            if (!this.chatExists) {
              firebase.firestore().collection('chats').doc(chatId).set({
                chatId,
                messages: [],
                users: [firebase.auth().currentUser.uid, userId],
                type: 'CHAT',
                lastSeen,
                lastUpdated: Date.now(),
                deleted
              }).then(() => {
                this.SendTheFirstMessage()
              })
            }
          } else {
            firebase.firestore().collection('chats').doc(chatId).set({
              chatId,
              messages: [],
              users: [firebase.auth().currentUser.uid, userId],
              type: 'CHAT',
              lastSeen,
              lastUpdated: Date.now(),
              deleted
            }).then(() => {
              this.SendTheFirstMessage()
            })
          }
        })
        console.log(this.chatImageURL)
      }








      // if(this.message || this.chatImageURL) {
      //   const chatId = this.$route.params.chatId;
      //   const userId = this.$route.params.userId;
      //   var lastSeen = {};
      //   lastSeen[userId] = ''
      //   lastSeen[firebase.auth().currentUser.uid] = this.msgId
      //   var deleted = {};
      //   deleted[firebase.auth().currentUser.uid] = false;
      //   deleted[userId] = false
      //   firebase.firestore().collection('chats').get().then(docs => {
      //     if(!docs.empty) {
      //       docs.forEach(doc => {
      //         if (doc.data().chatId == this.$route.params.chatId) {
      //           this.chatExists = true;
      //           let deleteMsg = {};
      //           deleteMsg[firebase.auth().currentUser.uid] = false;
      //           deleteMsg[userId] = false
      //           firebase.firestore().collection('chats').doc(this.$route.params.chatId).update({
      //             messages: admin.firestore.FieldValue.arrayUnion({
      //               chatImage: this.chatImageURL,
      //               content: this.message,
      //               userId: firebase.auth().currentUser.uid,
      //               msgId: this.msgId,
      //               sentAt: Date.now(),
      //               deleteMsg
      //             }),
      //             lastSeen: {
      //               ...doc.data().lastSeen,
      //               [firebase.auth().currentUser.uid]: this.msgId
      //             },
      //             lastUpdated: Date.now(),
      //             deleted: {
      //               [userId]: false,
      //               [firebase.auth().currentUser.uid]: false
      //             }
      //           }).then(() => {
      //               this.message = '';
      //               this.chatImageURL = '';
      //               this.$router.go(-1);
      //           })
      //         }

      //       })
      //       if (!this.chatExists) {
      //         firebase.firestore().collection('chats').doc(chatId).set({
      //           chatId,
      //           messages: [],
      //           users: [firebase.auth().currentUser.uid, userId],
      //           type: 'CHAT',
      //           lastSeen,
      //           lastUpdated: Date.now(),
      //           deleted
      //         }).then(() => {
      //           this.SendTheFirstMessage()
      //         })
      //       }
      //     } else {
      //       firebase.firestore().collection('chats').doc(chatId).set({
      //         chatId,
      //         messages: [],
      //         users: [firebase.auth().currentUser.uid, userId],
      //         type: 'CHAT',
      //         lastSeen,
      //         lastUpdated: Date.now(),
      //         deleted
      //       }).then(() => {
      //         this.SendTheFirstMessage()
      //       })
      //     }
      //   })
      //   console.log(this.chatImageURL)
      // }
    },

    // SEND THE FIRST MESSAGE TO THIS USER
    SendTheFirstMessage () {
      const chatId = this.chatId;
      const userId = this.userId;
      let deleteMsg = {};
      deleteMsg[firebase.auth().currentUser.uid] = false;
      deleteMsg[userId] = false;
      firebase.firestore().collection('chats').doc(chatId).update({
        messages: admin.firestore.FieldValue.arrayUnion({
          userId: firebase.auth().currentUser.uid,
          content: this.message,
          chatImage: this.chatImageURL,
          msgId: this.msgId,
          sentAt: Date.now(),
          deleteMsg
        })
      }).then(() => {
        this.message = '';
        this.chatImageURL = '';
        this.$store.state.openMessage = false
        location.reload();
      }) 



      // const chatId = this.$route.params.chatId;
      // const userId = this.$route.params.userId;
      // let deleteMsg = {};
      // deleteMsg[firebase.auth().currentUser.uid] = false;
      // deleteMsg[userId] = false;
      // firebase.firestore().collection('chats').doc(chatId).update({
      //   messages: admin.firestore.FieldValue.arrayUnion({
      //     userId: firebase.auth().currentUser.uid,
      //     content: this.message,
      //     chatImage: this.chatImageURL,
      //     msgId: this.msgId,
      //     sentAt: Date.now(),
      //     deleteMsg
      //   })
      // }).then(() => {
      //   this.message = '';
      //   this.chatImageURL = '';
      //   // this.$store.state.firstChatRoomId = this.$route.params.chatId;
      //   this.$router.push(`/profile/${this.$route.params.userId}`)
      //   location.reload();
      //   // this.$router.go(-1);
      // }) 
    },

    // CLICK THE INPUT FILE
    clicking() {
      this.$refs.sendImageMessage.click();
    },

    // SEND IMAGE TO CHAT
    sendImage(e) {
      document.getElementById('imageReview').classList.remove('hide');
      var image = e.target.files[0];
      let imageName = (+new Date()) + '-' + image.name
      var uploadChatImage = firebase.storage().ref('chatImages/' + imageName).put(image);
      uploadChatImage.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('chatImages/' + imageName).getDownloadURL().then(URL => {
            this.chatImageURL = URL;
            this.chatImageName = imageName
          })
        }
      })
    },

    // CANCEL SENDING COMMENT IMAGE SO IT WILL NOT BE SAVED IN FIREBASE
    cancelSendingChatImage() {
      document.getElementById('imageReview').classList.add('hide');
      document.getElementById('sendImageMessage').value = ''
      document.getElementById('chatField').focus();
      firebase.storage().ref('chatImages/' + this.chatImageName).delete();
      this.chatImageURL = '';
      this.chatImageName = '';
    },

    // SELECT EMOJI
    selectEmoji(emoji) {
      var ourTextArea = document.getElementById('chatField');
      var emojis = emoji.data
      ourTextArea.value += emojis
      this.message = ourTextArea.value
    },

    // CLICK TO SHOW OR HIDE EMOJI
    showAndHideEmojis() {
      document.getElementById('emojiPicker').classList.toggle('show')
    },

    // FOCUS ON INPUT FIELD
    focus() {
      document.getElementById('emojiPicker').classList.remove('show')
    }
  },
  created() {
    // CURRENT USER DATA
    firebase.firestore().collection('users').doc(this.userId).get().then(user => {
      this.userObject = user.data();
    })
    console.log(this.userId, this.chatId)
  },
  mounted () {
    // ANIMATION OF THE COMPONENT
    document.querySelector(".message").classList.add("animation")
  },

  // DATA FROM PROFILE PAGE TO SEND MESSAGE TO THIS USER
  props: ['userId', 'chatId'],
  
  components: {
    vEmojiPicker
  }
}
</script>