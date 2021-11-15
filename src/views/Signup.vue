<template>
  <div class="signup">
    <div class="row">
      <div class="col-lg-6">
        <!-- LEFT SIDE SELCOME SENTENCE -->
        <div class="show">
          <h1>Welcome! signup with new account and enjoy social and exciting experience...</h1>
          <p class="loginIcon" @click="$router.push({path: '/login'})">Login</p>
          <p class="signupIcon" @click="$router.push({path: '/signup'})">Signup</p>
        </div>
      </div>

      <!-- SIGNUP FORM -->
      <div class="col-lg-6">
        <div class="container wrapper">
          <div class="form">
            <form @submit.prevent="signup" autocomplete="off">
              <h2>Signup with new account</h2>
              <div class="field">
                <label for="email"></label>
                <input type="text" placeholder="Type your email address..." v-model="$store.state.email" autocomplete="off">
                <i class="far fa-user"></i>
              </div>
              <div class="field">
                <input type="text" name="nickname" placeholder="Type your nickname" v-model="$store.state.nickname" maxlength="25" autocomplete="off">
                <i class="fas fa-signature"></i>
              </div>
              <div class="field">
                <label for="email"></label>
                <input type="password" placeholder="your password..." v-model="$store.state.password" autocomplete="new-password">
                <i class="fas fa-lock"></i>
              </div>
              <div class="field">
                <label for="email"></label>
                <input type="password" placeholder="Confirm password..." v-model="$store.state.repeatedPassword" autocomplete="off">
                <i class="fas fa-lock"></i>
              </div>
              <p style="color: #fa534e; margin-top: -10px" v-if="$store.state.feedback"><i class="fas fa-exclamation-triangle"></i> {{$store.state.feedback}}</p>
              <button>Signup</button>
            </form>
          </div>   
        </div> 
      </div>

    </div> 
  </div>  
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
.signup {
  background-color: #fff;

  /* LEFT SIDE WELCOME SENTENCE */
  .show {
    background-color: $maincolor;
    height: 95vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #fff;
      margin-top: -70px;
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      padding-right: 30px;
      padding-left: 30px;
      text-shadow: 4px 4px #0052d6, 8px 8px #0052d6;
    }
    p.loginIcon {
      position: absolute;
      top: 10%;
      right: -7%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: $maincolor;
      color: #fff;
      border: 8px solid #fff;
      line-height: 80px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease-in-out;
      z-index: 9999;
      &:hover {
        background-color: #fff;
        color: $maincolor;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      }
    }
    p.signupIcon {
      position: absolute;
      top: 68%;
      right: -7%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: $maincolor;
      color: #fff;
      border: 8px solid #fff;
      line-height: 80px;
      cursor: pointer;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease-in-out;
      z-index: 9999;
      &:hover {
        background-color: #fff;
        color: $maincolor;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }

  /* WRAPPER DIV */
  .wrapper {
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* SIGNUP FORM */ 
  .form {
    margin-top: -80px;
    h2 {
      margin-bottom: 30px;
    }
    form {
      .field {
        position: relative;
        width: 400px;
        height: 45px;
        margin: 0 auto 20px;
        input {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          background-color: #fff;
          border: 1px solid #ccc;
          padding-left: 35px;
          outline: none;
        }
        i {
          position: absolute;
          top: 30%;
          left: 3%;
          color: rgb(129, 129, 129);
        }
      }
      .options {
        transform: translateY(-10px);
        input {
          background-color: #fff;
          border: 1px solid #ccc;
        }
        label {
          margin-right: 10%;
          color: $textcolor;
          margin-left: 3px;
        }
        span {
          margin-left: 10%;
          color: $textcolor;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: #000;
          }
        }
      }
      button {
        width: 400px;
        height: 40px;
        border-radius: 10px;
        color: #fff;
        background-color: $secondcolor;
        border: none;
        outline: none;
        &:hover {
          background-color: rgb(212, 56, 56);
        }
      }
    }
  }

  /* MOBILE SCREEN VIEW */
  @include mb {
    .show {
      display: none;
    }
    .form {
      form {
        h2 {
          font-size: 25px;
          margin-bottom: 20px;
        }
        .field {
          width: 100%;
          height: 40px;
          input {
            font-size: 14px;
          }
          i {
            font-size: 14px;
            top: 35%;
            left: 5%;
          }
        }
        .options {
          input {
            margin-left: 2%;
          }
          label {
            font-size: 13px;
          }
          span {
            font-size: 13px;
          }
        }
        button {
          width: 100%;
        }
      }
    }
  }

  /* SMALL SCREEN VIEW */
  @include sm {
    .show {
      display: none;
    }
    .form {
      form {
        h2 {
          font-size: 35px;
          margin-bottom: 30px;
        }
        .field {
          width: 100%;
          height: 45px;
          input {
            font-size: 16px;
            padding-left: 40px;
          }
          i {
            font-size: 16px;
            top: 35%;
            left: 4%;
          }
        }
        .options {
          input {
            margin-left: 1%;
          }
          label {
            font-size: 15px;
          }
          span {
            font-size: 15px;
          }
        }
        button {
          width: 100%;
        }
      }
    }
  }

  /* MEDUIM SCREEN VIEW */
  @include md {
    .show {
      h1 {
        font-size: 35px;
      }
      p.loginIcon {
        top: 10%;
        right: -10%;
        width: 90px;
        height: 90px;
        line-height: 73px;
      }
      p.signupIcon {
        top: 68%;
        right: -10%;
        width: 90px;
        height: 90px;
        line-height: 73px;
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
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE SIGNUP PAGE TITLE
    document.title = 'Signup | Friendster'

    // EMPTY ERROR MESSAGE FEEDBACK IN AYTHENTICATION
    this.$store.state.feedback = ''

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // CHECK IF USER AUTHENTICATED
    if(firebase.auth().currentUser) {
      this.$router.push({path: '/'})
    }

  },
  methods: {
    // SIGNUP METHOD FROM 'VUEX'
    signup() {
      this.$store.dispatch('signup');
    }
  },
}
</script>