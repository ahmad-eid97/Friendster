<template>
  <div class="infoSection">
    <div class="container">
      <div class="infoBody">
        <h5><i class="fas fa-info-circle"></i> Have questions about messenger !?</h5>
        <p>Hello, iam <span>Ahmad Eid</span>. the designer and programmer of this site and CEO of the Company, iam here to answer your questions and get your feedback. currently we can't recieve any questions or feedback as we have some technical issues, we are really sorry for this..</p>
        <button @click="$store.state.openChatInfo = false" class="btn btn-success"><i class="fas fa-check-circle"></i> Got It!</button>
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
.infoSection {
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
  justify-content: center;
  &.animation {
    .infoBody {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  .infoBody {
    background-color: rgb(231, 231, 231);
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    h5 {
      margin-top: 5px;
      font-size: 22px;
      text-shadow: 1px 1px #dfa2a2;
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
  .infoSection {
    .infoBody {
      width: 85%;
      padding: 15px 5px 10px 5px;
      h5 {
        font-size: 16px;
        margin-bottom: 0;
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
  .infoSection {
    .infoBody {
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
  .infoSection {
    .infoBody {
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
export default {
  data() {
    return {

    }
  },
  mounted () {
    document.querySelector(".infoSection").classList.add("animation")
  }
}
</script>