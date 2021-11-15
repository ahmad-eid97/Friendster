<template>
  <div class="confirmDeleting">
    <div class="container">
      <div class="delete">
        <h3><i class="fas fa-exclamation-triangle"></i> Delete This Chat!</h3>
        <button @click="$store.state.deleteChat = false" class="btn btn-secondary"> Cancel</button>
        <button @click="deleteChat" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
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
/* MAIN PAGE */
.confirmDeleting {
  position: absolute;
  top: 0%;
  left: 0%;
  margin: auto;
  z-index: 9999999999;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  align-items: center;
  &.animation {
    .delete {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  .delete {
    background-color: rgb(231, 231, 231);
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    .fa-exclamation-triangle {
      color: #dc3545;
    }
    button {
      margin: 10px;
    }
  }
}

/* MOBILE SCREEN VIEW */
@include mb {
  .confirmDeleting {
    .delete {
      width: 65%;
      padding: 20px;
      h3 {
        font-size: 15px;
      }
      .fa-exclamation-triangle {
        color: #dc3545;
      }
      button {
        margin: 10px;
        font-size: 11px;
        margin: 10px 5px;
      }
    }
  }
}

/* SMALL SCREEN VIEW */
@include sm {
  .confirmDeleting {
    .delete {
      width: 45%;
      padding: 20px;
      h3 {
        font-size: 25px;
      }
      .fa-exclamation-triangle {
        color: #dc3545;
      }
      button {
        margin: 10px;
        font-size: 15px;
      }
    }
  }
}

/* MEDUIM SCREEN VIEW */
@include md {
  .confirmDeleting {
    .delete {
      width: 40%;
      padding: 20px;
      h3 {
        font-size: 25px;
      }
      .fa-exclamation-triangle {
        color: #dc3545;
      }
      button {
        margin: 10px;
        font-size: 15px;
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

    }
  },
  methods: {
    // DELETE CHAT METHOD
    deleteChat() {
      firebase.firestore().collection('chats').doc(this.chatid).get().then(doc => {
        let messages = doc.data().messages
        firebase.firestore().collection('chats').doc(this.chatid).update({
          deleted: {
            ...doc.data().deleted,
            [firebase.auth().currentUser.uid]: true
          },
          messages: messages.filter(message => message.deleteMsg[firebase.auth().currentUser.uid] = true)
        })
      }).then(() => {
        this.$store.state.deleteChat = false;
        // this.$store.state.firstChatRoomId = this.$store.state.chats[0].chatId
        // this.$router.push(`/messenger/${this.$store.state.firstChatRoomId}`)
        firebase.firestore().collection('chats').get().then(docs => {
          docs.forEach(async doc => {
            if(doc.data().deleted[firebase.auth().currentUser.uid] == false && (doc.data().users[0] == firebase.auth().currentUser.uid || doc.data().users[1] == firebase.auth().currentUser.uid)) {
              this.$router.push(`/messenger/${doc.data().chatId}`)
              location.reload();
            } else {
              this.$router.push('/messenger/startChating')
              location.reload();
            }
          })
        })
      })
    }
  },
  props: ['chatid'],
  created() {
    console.log(this.chatid)
  },
  mounted () {
    document.querySelector(".confirmDeleting").classList.add("animation")
  }
}
</script>