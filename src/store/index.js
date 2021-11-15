import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userFound: null,
    email: '',
    password: '',
    repeatedPassword: '',
    nickname: '',
    user_id: '',
    feedback: '',
    posts: [],
    chats: [],
    showLikesList: false,
    showLovesList: false,
    firstChatRoomId: 'startChating',
    deleteChat: false,
    openChatInfo: false,
    openHelp: false,
    openHelpTimeline: false,
    openHelpSettings: false,
    openHelpNot: false,
    openDeletePost: false,
    openEditPost: false,
    openMessage: false,
    openRemoveFriend: false,
    userFriends: [],
    openEditProfileAbout: false,
    signedUp: false,
    unsubscribe: function () {
      console.log("sad")
    },
    unsubscribeProfile: function () {
      console.log("sad")
    },
    unsubscribeReview: function() {
      console.log("sad")
    }
  },
  mutations: {
    changeUnsubscribe(state, unsubscribe) {
      state.unsubscribe = unsubscribe;
    },
    changeUnsubscribeProfile(state, unsubscribe) {
      state.unsubscribeProfile = unsubscribe;
    },
    changeUnsubscribeReview(state, unsubscribe) {
      state.unsubscribeReview = unsubscribe;
    },
    signup(state) {
      if(state.email && state.password && state.nickname) {
        if(state.password.match(state.repeatedPassword) && state.password.length == state.repeatedPassword.length && state.repeatedPassword) {
          firebase.auth().createUserWithEmailAndPassword(state.email, state.password).then(async (cred) => {
            state.user_id = cred.user.uid
            await firebase.firestore().collection('users').doc(state.user_id).set({
              email: state.email,
              nickname: state.nickname,
              user_id: state.user_id,
              imgURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
              coverURL: 'https://tokystorage.s3.amazonaws.com/images/default-cover.png',
              city: '',
              country: '',
              livesIn: '',
              phone: '',
              relationship: '',
              bio: '',
              university: '',
              school: '',
              requests: [],
              friends: [],
              notifications: [],
              status: ''
            })
            state.email = state.password = state.repeatedPassword = state.nickname = state.feedback = state.feedback = null;
            window.location.reload();
          }).catch(error => {
            state.feedback = error.message;
          })
        } else {
          state.feedback = "password doesn't match"
        }
      } else {
        state.feedback = 'please fill all fields'
      }
    },
    login(state) {
      if(state.email && state.password) {
        firebase.auth().signInWithEmailAndPassword(state.email, state.password).then(() => {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
            status: {
              state: 'Online',
              lastChanged: ''
            }
          }).then(() => {
            location.reload()
          })
          state.email = state.password = state.repeatedPassword = state.nickname = state.feedback = null;
        }).catch(error => {
          error.message = 'invalid username or password';
          state.feedback = error.message;
        })
      } else {
        state.feedback = 'please fill all fields!'
      }
    },
    async logOut(state) {
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        status: {
          state: 'Offline',
          lastChanged: Date.now()
        }
      })
      firebase.auth().signOut().then(() => {
        router.push({path: '/login'})
        location.reload();
        state.posts = []
        state.email = state.password = state.repeatedPassword = state.nickname = state.feedback = null;
      })
    },
  },
  actions: {
    signup({commit}) {
      commit('signup');
    },
    logOut({commit}) {
      commit('logOut')
    },
    login({commit}) {
      commit('login')
    }
  },
  getters: {
    getChats() {
      return firebase.firestore().collection('chats').get().then(docs => {
        docs.forEach(doc => {
          return doc.data()
        })
      })
    }
  },
  modules: {
  }
})
