<template>
  <div class="confirmDeleting">
    <div class="container">
      <div class="delete">
        <h3><i class="fas fa-exclamation-triangle"></i> Are You sure you want to delete this post!</h3>
        <button @click="$store.state.openDeletePost = false" class="btn btn-secondary"> Cancel</button>
        <button @click="deletePost" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
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
  text-align: center;
  display: flex;
  justify-content: center;
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
    h3 {
      font: {
          size: 20px;
      }
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
      width: 50%;
      padding: 20px;
      h3 {
        font-size: 18px;
      }
      .fa-exclamation-triangle {
        color: #dc3545;
      }
      button {
        margin: 10px;
        font-size: 14px;
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
        font-size: 20px;
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
    // DELETE POST METHOD
    deletePost() {
      firebase.firestore().collection('posts').doc(this.postIdForDeleting).delete().then(() => {
          location.reload();
      })
    }
  },
  created() {
    console.log(this.postIdForDeleting)
  },
  mounted () {
    document.querySelector(".confirmDeleting").classList.add("animation")
  },
  props: ['postIdForDeleting']
}
</script>