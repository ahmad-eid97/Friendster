import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/bootstrap.min.css'
import 'bootstrap'
import 'jquery'
import 'popper.js'
import firebase from 'firebase'
import vueChatScroll from 'vue-chat-scroll'

Vue.use(vueChatScroll)
var firebaseConfig = {
  apiKey: "AIzaSyAgtG4EnAdYrZLqoSia0rmzeKtiSPif16o",
  authDomain: "posts-com.firebaseapp.com",
  databaseURL: "https://posts-com.firebaseio.com",
  projectId: "posts-com",
  storageBucket: "posts-com.appspot.com",
  messagingSenderId: "270509650153",
  appId: "1:270509650153:web:e731b6d3deb834c1550078",
  measurementId: "G-GY97TCB3GV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebase.firestore().collection('chats').get().then(docs => {
  docs.forEach(doc => {
    if(doc.data().deleted[firebase.auth().currentUser.uid] == false && (doc.data().users[0] == firebase.auth().currentUser.uid || doc.data().users[1] == firebase.auth().currentUser.uid)) {
      store.state.chats.push(doc.data())
    }
  })
}).then(() => {
  store.state.firstChatRoomId = store.state.chats[0].chatId
  console.log(store.state.chats)
  console.log(store.state.chats[0].chatId)
})


Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})