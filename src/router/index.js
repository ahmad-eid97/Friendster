import Vue from 'vue'
import VueRouter from 'vue-router'
import timeline from '../views/Timeline'
import login from '../views/Login'
import signup from '../views/Signup'
import profile from '../views/Profile'
import messenger from '../views/Messenger'
import Message from '../components/Message'
import startChating from '../components/startChating'
import settings from '../views/Settings'
import explorePages from '../views/ExplorePages'
import PostReview from '../components/PostReview'
import notifications from '../components/Notifications'
import Page404 from '../components/404Page'
import firebase from 'firebase'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'timeline',
      component: timeline,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messenger/:chatId',
      name: 'messenger',
      component: messenger,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sendMessage/:userId/:chatId',  // The pop-up you can send message from...
      name: 'sendMessage',
      component: Message,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/explorePages',
      name: 'explorePages',
      component: explorePages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messenger/startChating',
      name: 'startChating',
      component: startChating,
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: '/postreview/:postId',
      name: 'postreview',
      component: PostReview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: notifications,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/*',
      name: '404',
      component: Page404
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// IF USER AUTHENTICATED GO AND IF NOT STAY IN LOGIN PAGE
router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if(user) {
      next();
    } else {
      next({name: 'login'})
    }
  } else {
    next();
  }
})

// MANAGE NAVIGATING TO MESSENGER PAGE WITH CHAT ID BETWEEN TWO USERS
router.beforeEach((to, from, next) => {  // change messenger route after opening it => perfect idea
  if (from.name == "messenger" && to.fullPath == "/messenger") {
    return; // stop function when you are inside messenger page
  }
  if(to.path === '/messenger' && store.state.firstChatRoomId) {
    router.push(`/messenger/${store.state.firstChatRoomId}`)
    next();
  } else {
    // store.state.firstChatRoomId = 'startChating'
    // router.push(`/messenger/startChating`)
    next();
  }
})

export default router
