<template>
  <div class="editInfo">
    <div class="container">
      <div class="infoBody">
      <i class="fas fa-times" @click="$store.state.openEditProfileAbout = false"></i>
        <form>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="bio">YOUR BIO</label>
              <textarea style="resize: none" type="text" class="form-control" id="bio" placeholder="Your profile bio (75 characters)" maxlength="75" v-model="bio"></textarea>
            </div>
            <div class="form-group col-md-12">
              <label for="university">UNIVERSITY</label>
              <input type="text" class="form-control" id="university" placeholder="your university" maxlength="50" v-model="university">
            </div>
          </div>
          <div class="form-group">
            <label for="school">HIGH SCHOOL</label>
            <input type="text" class="form-control" id="school" placeholder="your high shool" maxlength="50" v-model="school">
          </div>
          <div class="form-group">
            <label for="live">LIVES IN</label>
            <input type="text" class="form-control" id="live" placeholder="The city you lives in" maxlength="40" v-model="livesIn">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="phone">PHONE</label>
              <input type="number" class="form-control" id="phone" placeholder="phone number" v-model="phone">
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">REALATIONSHIP</label>
              <select id="inputState" class="form-control" @change="relationshipFunc($event)" aria-placeholder="knfc">
                <option disabled selected>select option</option>
                <option>In a realationship</option>
                <option>Complicated</option>
                <option>Married</option>
                <option>Single</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary" @click="updateInfo">Update Profile Info</button>
        </form>
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
.editInfo {
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  z-index: 9999999999;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  align-items: center;
  &.animation {
    .infoBody {
      transform: scale(0);
      animation: show 0.4s ease-out forwards;
    }
  }
  
  .infoBody {
    background-color: rgb(231, 231, 231);
    width: 45%;
    margin-left: auto;
    margin-right: auto;
    padding: 30px 35px;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    .fa-times {
      position: absolute;
      top: -20px;
      right: -20px;
      color: #fff;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid #fff;
      line-height: 45px;
      font-size: 18px;
      background-color: rgba(0, 0, 0, 0.9);
      cursor: pointer;
      &:hover {
        background-color: rgb(231, 231, 231);
        color: #454545;
      }
    }
    form {
      .form-group {
        text-align: left;
        resize: none;
        label {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
        }
      }
      button {
        width: 80%;
        border: none;
        background-color: $maincolor;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        outline: none;
        &:hover {
          background-color: #0353d3;
          box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
@include sm {
  .editInfo {
    .infoBody {
      width: 65%;
      .fa-times {
        top: -15px;
        right: -15px;
        width: 35px;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
      }
      form {
        .form-group {
          text-align: left;
          label {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 2px;
          }
          input, textarea {
            font-size: 14px;
          }
        }
        button {
          width: 80%;
          border: none;
          background-color: $maincolor;
          height: 35px;
          color: #fff;
          border-radius: 5px;
          outline: none;
          font-size: 14px;
          &:hover {
            background-color: #0353d3;
            box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
}
@include mb {
  .editInfo {
    .infoBody {
      width: 90%;
      .fa-times {
        top: -15px;
        right: -15px;
        width: 33px;
        height: 33px;
        line-height: 33px;
        font-size: 13px;
      }
      form {
        .form-group {
          text-align: left;
          padding: 0;
          label {
            font-size: 10px;
            font-weight: 600;
            margin-bottom: 2px;
          }
          input, textarea {
            font-size: 12px;
          }
        }
        button {
          width: 80%;
          border: none;
          background-color: $maincolor;
          height: 30px;
          color: #fff;
          border-radius: 5px;
          outline: none;
          font-size: 12px;
          &:hover {
            background-color: #0353d3;
            box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
}
@include md {
  .editInfo {
    .infoBody {
      width: 50%;
      .fa-times {
        top: -20px;
        right: -20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
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
      userObject: '',
      bio: '',
      university: '',
      school: '',
      livesIn: '',
      phone: '',
      relationship: ''
    }
  },
  async created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // EDIT USER DATA
    await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.userObject = doc.data()
      this.bio = this.userObject.bio
      this.university = this.userObject.university
      this.school = this.userObject.school
      this.livesIn = this.userObject.livesIn
      this.phone = this.userObject.phone
      this.relationship = this.userObject.relationship
    })
    console.log(this.realationship)
  }, 
  mounted () {
    document.querySelector(".editInfo").classList.add("animation")
  },
  methods: {
    relationshipFunc(e) {
      this.relationship = e.target.value;
    },
    updateInfo(e) {
      e.preventDefault();
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        bio: this.bio,
        university: this.university,
        school: this.school,
        livesIn: this.livesIn,
        phone: this.phone,
        relationship: this.relationship
      })
      this.$store.state.openEditProfileAbout = false;
    }
  }
}
</script>