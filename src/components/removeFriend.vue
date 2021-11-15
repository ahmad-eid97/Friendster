<template>
  <div class="removeFriend">
    <div class="container">
      <div class="removeMessage">
        <h5><i class="fas fa-info-circle"></i> Are you sure you want to remove <span>{{friendName}}</span> from your friends !?</h5>
        <button @click="$store.state.openRemoveFriend = false" class="btn btn-secondary">Cancel</button>
        <button class="btn btn-danger" @click="unfriend(friendId)"><i class="fas fa-user-times"></i> Remove</button>
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
.removeFriend {
  position: fixed;
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
  justify-content: center;
  &.animation {
    .removeMessage {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  .removeMessage {
    background-color: rgb(231, 231, 231);
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    h5 {
      margin-top: 5px;
      font-size: 22px;
      margin-bottom: 20px;
      span {
        text-shadow: 1px 1px #dfa2a2;
        text-transform: capitalize;
      }
    }
    .fa-info-circle {
      color: #dc3545;
    }
    p {
      padding: 5px 10px 5px 10px;
      margin: 0;
      span {
        font-weight: 500;
        text-shadow: 1px 1px #dfa2a2; 
      }
    }
    button {
      margin: 5px 10px 0px 10px;
    }
  }
}

/* MOBILE SCREEN VIEW */ 
@include mb {
  .removeFriend {
    .removeMessage {
      width: 75%;
      padding: 20px;
      h5 {
        font-size: 15px;
      }
      p {
        font-size: 12px;
      }
      .fa-info-circle {
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
  .removeFriend {
    .removeMessage {
      width: 65%;
      padding: 20px;
      h5 {
        font-size: 20px;
      }
      p {
        font-size: 15px;
      }
      .fa-info-circle {
        color: #dc3545;
      }
      button {
        margin: 10px;
        font-size: 13px;
      }
    }
  }
}

/* MEDUIM SCREEN VIEW */ 
@include md {
  .removeFriend {
    .removeMessage {
      width: 50%;
      padding: 20px;
      h3 {
        font-size: 25px;
      }
      .fa-info-circle {
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
import admin from 'firebase'
export default {
  data() {
    return {
      userObject: ''
    }
  },
  created() {
    // CURRENT USER DATA
    firebase.firestore().collection('users').doc(this.friendId).get().then(doc => {
        this.userObject = doc.data()
    })
  },
  mounted () {
    // ANIMATION FOR SHOWING THIS COMPONENT
    document.querySelector(".removeFriend").classList.add("animation")
  },
  methods: {
    // UNFRIEND THIS USER
    unfriend(friendId) {
      this.$store.state.openRemoveFriend = false;
      firebase.firestore().collection('users').doc(friendId).update({
        friends: admin.firestore.FieldValue.arrayRemove({
          userId: firebase.auth().currentUser.uid
        })
      })
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        friends: admin.firestore.FieldValue.arrayRemove({
          userId: friendId
        })
      })
    }
  },
  // PROPS FROM THE PROFILE PAGE TO REMOVE THE USER
  props: ['friendId', 'friendName']
}
</script>