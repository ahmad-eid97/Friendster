<template>
  <form v-if="user" class="form-inline my-2 my-lg-0">
    <!-- INPUT FOR SEARCH -->
    <input type="search" class="mr-sm-2" placeholder="Search Friendster" aria-label="Search" v-model="searchTyping" @keydown="searchEngine" autocomplete="off">

    <!-- SHOWING SEARCH RESULTS AREA -->
    <div class="searchResults" :class="{hide: searchTyping == ''}">

      <!-- LOADER -->
      <div class="lds-dual-ring" v-if="searchTyping !== '' && searchResults.length <= 0 && !noResults"></div>

      <div class="searchResult" v-for="searchResult in searchResults" :key="searchResult.user_id" @click="$router.push({path: `/profile/${searchResult.user_id}`}) && hideSearch()">
        <div class="image">
          <img :src="searchResult.imgURL" alt="">
        </div>
        <div class="info">
          <h6>{{searchResult.nickname}}</h6>
          <span v-if="searchResult.user_id == userObject.user_id">That's you.</span>
          <span v-if="searchResult.bio && searchResult.user_id !== userObject.user_id">{{searchResult.bio.substring(0, 30) + '...'}}</span>
          <span class="visit" v-if="!searchResult.bio && searchResult.user_id !== userObject.user_id" @click="$router.push({path: `/profile/${searchResult.user_id}`}) && hideSearch()">visit profile</span>
        </div>
      </div>

      <!-- IF THERE IS NO SEARCH RESULTS -->
      <div class="noResults" v-if="searchTyping !== '' && searchResults.length <= 0 && noResults">
        <img src="../assets/searchNo.svg" alt="">
        <p>No Results Found</p>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '../css/variables.scss';
@import '../css/mixins.scss';
form {
  input {
    width: 280px;
    height: 35px;
    background-color: rgb(243, 243, 243);
    border-radius: 20px;
    border: 1px solid #ccc;
    padding-left: 15px;
    outline: none;
    &:focus {
        background-color: #fff;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    }
  }
  .searchResults {
    width: 400px;
    height: auto;
    max-height: 500px;
    background-color: #fff;
    border: 1px solid rgb(230, 229, 229);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 110%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 5px;
    right: 5%;
    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: rgb(167, 167, 167);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgb(139, 139, 139);
    }
    .lds-dual-ring {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
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
    .searchResult {
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 10px;
        &:hover {
        background-color: rgb(236, 235, 235);
        }
        .image {
        margin-right: 10px;
        img {
            width: 55px;
            height: 55px;
            border-radius: 50%;
        }
        }
        .info {
          text-align: left;
          h6 {
            margin-bottom: 0;
            font-weight: bold;
            text-transform: capitalize;
        }
        span {
          font-size: 14px;
          color: $textcolor;
          &.visit {
            color: #0052d6;
            font-size: 13px;
            font-weight: bold;
          &:hover {
                text-decoration: underline;
            }
          }
        }
        }
    }
    .noResults {
      padding: 40px;
      img {
        width: 90%;
        height: 200px;    
      }
      p {
        margin-top: 15px;
        font: {
          weight: bold;
        }
      }
    }
    &.hide {
        display: none;
    }
  }
  @include mb{
    margin: 0 0 0 0 !important;
    input {
      width: 220px;
      height: 30px;
      padding-right: 10px;
      background-color: rgb(243, 243, 243);
      border-radius: 20px;
      border: 1px solid #ccc;
      padding-left: 15px;
      outline: none;
      font-size: 12px;
      &:focus {
        background-color: #fff;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      }
    }
    .searchResults {
        width: 300px;
        height: auto;
        max-height: 350px;
        background-color: #fff;
        border: 1px solid rgb(230, 229, 229);
        border-radius: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 105%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 5px;
        right: 15%;
        @media (min-width: 550px) and (max-width: 620px) {
          right: 20%;
        }
        @media (min-width: 620px) and (max-width: 768px) {
          right: 25%;
        }
        .lds-dual-ring {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 25px;
            height: 25px;
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
        .searchResult {
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-radius: 10px;
            &:hover {
            background-color: rgb(236, 235, 235);
            }
            .image {
            margin-right: 10px;
            img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
            }
            .info {
            text-align: left;
            h6 {
                font-size: 12px;
                margin-bottom: 0;
                font-weight: bold;
            }
            span {
            font-size: 10px;
            color: $textcolor;
            &.visit {
                color: #0052d6;
                font-size: 10px;
                font-weight: bold;
            &:hover {
                    text-decoration: underline;
                }
            }
            }
            }
        }
        &.hide {
            display: none;
        }
    }
    .noResults {
      padding: 20px !important;
      img {
        width: 90%;
        height: 130px !important; 
      }
      p {
        margin-top: 15px;
        font: {
          weight: bold;
          size: 12px;
        }
      }
    }
  }
  @include sm {
    margin: 0 0 0 0 !important;
    input {
      width: 320px;
      height: 33px;
      padding-right: 10px;
      background-color: rgb(243, 243, 243);
      border-radius: 20px;
      border: 1px solid #ccc;
      padding-left: 15px;
      outline: none;
      font-size: 14px;
      &:focus {
        background-color: #fff;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      }
    }
    .searchResults {
        width: 350px;
        height: auto;
        max-height: 450px;
        background-color: #fff;
        border: 1px solid rgb(230, 229, 229);
        border-radius: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 105%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 5px;
        right: 25%;
        @media (min-width: 830px) and (max-width: 920px) {
          right: 27%;
        }
        @media (min-width: 920px) and (max-width: 992px) {
          right: 29%;
        }
        .lds-dual-ring {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 28px;
            height: 28px;
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
        .searchResult {
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-radius: 10px;
            &:hover {
            background-color: rgb(236, 235, 235);
            }
            .image {
            margin-right: 10px;
            img {
                width: 47px;
                height: 47px;
                border-radius: 50%;
            }
            }
            .info {
            text-align: left;
            h6 {
                font-size: 13px;
                margin-bottom: 0;
                font-weight: bold;
            }
            span {
            font-size: 11px;
            color: $textcolor;
            &.visit {
                color: #0052d6;
                font-size: 11px;
                font-weight: bold;
            &:hover {
                    text-decoration: underline;
                }
            }
            }
            }
        }
        &.hide {
            display: none;
        }
    }
    .noResults {
      padding: 30px;
      img {
        width: 90%;
        height: 150px !important; 
      }
      p {
        margin-top: 15px;
        font: {
          weight: bold;
          size: 14px;
        }
      }
    }
  }
  @include md {
    margin-right: 20px;
    input {
      height: 33px;
      padding-right: 10px;
      background-color: rgb(243, 243, 243);
      border-radius: 20px;
      border: 1px solid #ccc;
      padding-left: 15px;
      outline: none;
      font-size: 14px;
      &:focus {
        background-color: #fff;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      }
    }
    .searchResults {
        width: 330px;
        height: auto;
        max-height: 350px;
        background-color: #fff;
        border: 1px solid rgb(230, 229, 229);
        border-radius: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 105%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 5px;
        right: 3%;
        @media (min-width: 550px) and (max-width: 620px) {
          right: 20%;
        }
        @media (min-width: 620px) and (max-width: 768px) {
          right: 25%;
        }
        .lds-dual-ring {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 30px;
            height: 30px;
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
        .searchResult {
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-radius: 10px;
            &:hover {
            background-color: rgb(236, 235, 235);
            }
            .image {
            margin-right: 10px;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            }
            .info {
            text-align: left;
            h6 {
                font-size: 14px;
                margin-bottom: 0;
                font-weight: bold;
            }
            span {
            font-size: 12px;
            color: $textcolor;
            &.visit {
                color: #0052d6;
                font-size: 12px;
                font-weight: bold;
            &:hover {
                    text-decoration: underline;
                }
            }
            }
            }
        }
        &.hide {
            display: none;
        }
    }
    .noResults {
      padding: 30px;
      img {
        width: 90%;
        height: 150px !important; 
      }
      p {
        margin-top: 15px;
        font: {
          weight: bold;
          size: 14px;
        }
      }
    }
  }
  @include lg {
    margin-right: 40px;
    input {
      padding-right: 10px;
    }
    .searchResults {
        right: 2%;
    }
  }
}
</style>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      user: '',
      userObject: '',
      searchTyping: '',
      searchResults: [],
      showSearch: '',
      noResults: Boolean
    }
  },
  methods: {
    // SEARCH IN DATABASE IF THERE IS USERS NICKNAME STARTS WITH LETTERS USER TYPED
    searchEngine() {
      if(this.searchTyping == '') {
        this.searchResults = []
      }
      this.noResults = false
      firebase.firestore().collection('users').get().then(users => {
        users.forEach(user => {
          if(user.data().nickname.toLowerCase().startsWith(this.searchTyping.toLowerCase())) {
            if(!this.searchResults.find(User => User.user_id == user.data().user_id)) {
              this.searchResults.unshift(user.data());
            }
            this.noResults = false
          } else if(!user.data().nickname.toLowerCase().startsWith(this.searchTyping.toLowerCase()) && this.searchResults.find(User => User.user_id == user.data().user_id)) {
            var element = this.searchResults.indexOf(user.data())
            this.searchResults.splice(element, 1)
            this.noResults = false
          } else {
            this.noResults = true
          }
        })
      })
    },

    // IF USER DELETE WHAT HE TYPED THEN HIDE SEARCH RESULTS
    hideSearch() {
      this.searchTyping = '';
      this.searchResults = []
      document.querySelector('.searchResults').classList.add('hide');
    }
    
  },
  created() {
    // IDENTIFY IF THE USER LOGGED IN OR NOT
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
        let currentUserInfo = firebase.auth().currentUser.uid;
        firebase.firestore().collection('users').doc(currentUserInfo).get().then(doc => {
          this.userObject = doc.data();
        })
      } else {
        this.user = null
      }
    });
    // GET CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
        this.userObject = doc.data();
    })
  }
}
</script>