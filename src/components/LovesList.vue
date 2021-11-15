<template>
  <div class="lovesComponent">
    <div class="container">
      <!-- LOVES LIST AREA -->
      <div class="lovesList">
        <i class="fas fa-times" @click="$store.state.showLovesList = false"></i>
        <div class="head">
          <i class="fas fa-heart"></i> <span>{{lovesArray.length}}</span><h5>people reacted love</h5>
        </div>
        <div class="dropdown-divider"></div>
        <div class="noLoves" v-if="userObject && lovesArray.length == 0">
          <img src="../assets/noLoves.svg" alt="">
          <p>No one reacted <span>love</span> to this post yet!</p>
        </div>
        <div class="whoLoved" v-for="love in lovesArray" :key="love.id">
          <div class="whoLovedImg">
            <i class="fas fa-heart"></i>
            <img :src="love.imgURL" alt="">
          </div>
          <div class="whoLovedDetails">
            <h6 @click="navigate(love.user_id)">{{love.nickname}}</h6>
            <p>{{love.time | formatSentAt}}</p>
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
/* LOVES LIST AREA */
.lovesComponent {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.animation {
    .lovesList {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  .lovesList {
    position: relative;
    height: 500px;
    max-height: 500px;
    width: 450px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(231, 231, 231);
    border-radius: 10px;
    text-align: left;
    padding: 20px;
    i.fa-times {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgb(207, 207, 207);
      width: 40px;
      height: 40px;
      font-size: 18px;
      line-height: 40px;
      border-radius: 50%;
      color: #454545;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        color: #000;
      }
    }
    .head {
      i {
        color: #fff;
        width: 30px;
        height: 30px;
        background-color: $secondcolor;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
      }
      span {
        font-weight: bold;
        margin-right: 20px;
      }
      h5 {
        padding-bottom: 4px;
        display: inline-block;
      }
    }
    .noLoves {
      text-align: center;
      margin-top: 10%;
      p {
        font-weight: 600;
        margin-top: 10px;
        span {
          color: $secondcolor;
        }
      }
      img {
        width: 60%;
      }
    }
    .whoLoved {
      display: flex;
      margin-top: 20px;
      .whoLovedImg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        i {
          position: absolute;
          top: 70%;
          right: 0%;
          z-index: 2;
          color: #fff;
          width: 23px;
          height: 23px;
          background-color: $secondcolor;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .whoLovedDetails {
        margin-top: 5px;
        h6 {
          margin-bottom: 0;
          font-size: 18px;
          cursor: pointer;
          text-transform: capitalize;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          color: $textcolor;
        }
      }
    }
  }
  @include mb {
    .lovesList {
      width: 90%;
      height: 400px;
      i.fa-times {
        width: 30px;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
      }
      .head {
        margin-left: -10px;
        i {
          color: #fff;
          width: 25px;
          height: 25px;
          line-height: 27px;
          font-size: 13px;
        }
        span {
          margin-right: 10px;
          font-size: 15px;
        }
        h5 {
          font-size: 15px;
        }
      }
      .noLoves {
        p {
          font-weight: 600;
          margin-top: 10px;
          font-size: 12px;
        }
      }
      .whoLoved {
        display: flex;
        margin-top: 20px;
        .whoLovedImg {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
          position: relative;
          i {
            position: absolute;
            top: 70%;
            right: 0%;
            z-index: 2;
            color: #fff;
            width: 17px;
            height: 17px;
            background-color: $secondcolor;
            border-radius: 50%;
            text-align: center;
            line-height: 18px;
            font-size: 8px;
          }
        }
        .whoLovedDetails {
          margin-top: 2px;
          h6 {
            margin-bottom: 0;
            font-size: 16px;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
  @include sm {
    .lovesList {
      width: 60%;
      i.fa-times {
        width: 35px;
        height: 35px;
        font-size: 19px;
        line-height: 35px;
      }
      .head {
        margin-left: -10px;
        i {
          color: #fff;
          width: 25px;
          height: 25px;
          line-height: 27px;
          font-size: 13px;
        }
        span {
          margin-right: 10px;
          font-size: 15px;
        }
        h5 {
          font-size: 16px;
        }
      }
      .whoLoved {
        display: flex;
        margin-top: 20px;
        .whoLovedImg {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          position: relative;
          i {
            position: absolute;
            top: 70%;
            right: 0%;
            z-index: 2;
            color: #fff;
            width: 19px;
            height: 19px;
            background-color: $secondcolor;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            font-size: 9px;
          }
        }
        .whoLovedDetails {
          margin-top: 2px;
          h6 {
            margin-bottom: 0;
            font-size: 16px;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import moment from 'moment'
export default {
  data() {
    return {
      userObject: '',
      lovesArray: []
    }
  },
  created() {
    // GET LOVES MADE ON THSIS POST
    firebase.firestore().collection('posts').doc(this.postIdForReactsList).get().then(doc => {
      this.userObject = doc.data()
      doc.data().loves.forEach(async ({userId, time}, index) => { // userId => is the data inside the likes object..
        let user = await firebase.firestore().collection('users').doc(userId).get() // user (userId) to get user object.
        doc.data().loves[index] = user.data(); // this idea you get user object's data not some data...
        var userData = {
          time,
          ...user.data()
        }
        this.lovesArray.push(userData)
      })
    })
  },
  mounted () {
    // ANIMATION ON COMPONENT
    document.querySelector(".lovesComponent").classList.add("animation")
  },
  methods: {
    navigate(userId) {
      this.$router.push(`/profile/${userId}`);
      this.$store.state.showLovesList = false
    }
  },
  props: ['postIdForReactsList'],
  filters: {
    // TIME FORMAT
    formatSentAt (time) {
      return moment(time).fromNow()
    }
  }
}
</script>