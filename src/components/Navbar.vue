<template>
  <div class="nav">
    <nav class="navbar navbar-expand-lg fixed-top">
        <!-- NAVBAR BRAND -->
        <a class="navbar-brand" href="" @click="$router.push({path: '/'}) && navBrand($event)">
          <i class="fas fa-share-alt"></i>
        </a>

        <!-- SEARCH ENGINE FOR SMALL AND MOBILE SCREENS -->
        <div class="smallScreenSearch">
          <searchEngine></searchEngine>
        </div>

        <!-- BUTTON FOR DROPDOWN DIV IN SMALL AND MOBILE SCREENS -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="outline: none">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- THE MAIN NAVBAR OF THE WEBSITE -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <router-link v-if="user" :to='`/profile/${userObject.user_id}`' tag="li" active-class="active" exact><i class="far fa-user"></i></router-link>
              <div class="dropdown notification" v-if="user">
                <p class="notifSeen" v-if="thereIsNotifications || requests.length > 0"></p>
                <i class="dropdown-toggle far fa-bell" @click="readNotifications" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div class="over">
                    <span>notifications</span>
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="not" v-for="request in requests" :key="request.id">
                    <img :src="request.imgURL" alt="">
                    <div class="notInfo">
                      <p><span class="name">{{request.nickname}}</span>sent you a friend request. <span class="visit" @click="$router.push({path: `/profile/${request.user_id}`})">visit profile</span></p>
                      <i class="fas fa-user-check accept" @click="acceptFriendRequest(request.user_id)"></i>
                      <i class="fas fa-trash-alt refuse" @click="refuseFriendRequest(request.user_id)"></i>
                    </div>
                  </div>
                  <div class="nots" v-for="not in notifications" :key="not.id">
                    <div v-if="not" class="notificationContainer" @click="$router.push({path: `/postreview/${not.postId}`})">
                      <img :src="not.user.imgURL" alt="">
                      <div class="notInfo">
                        <p><span class="nickname">{{not.user.nickname}}</span>
                          <span v-if="not.notifType === 'like' || not.notifType === 'love'"> reacted 
                            <span v-if="not.notifType == 'like'">like</span>
                            <span v-if="not.notifType == 'love'">love</span> to your post.
                          </span>
                          <span v-if="not.notifType == 'comment'"> commented on your post</span>
                        </p>
                        <i v-if="not.notifType === 'like'" class="fas fa-thumbs-up"></i> 
                        <i v-if="not.notifType === 'love'" class="fas fa-heart"></i>
                        <i v-if="not.notifType === 'comment'" class="far fa-comment-dots"></i>
                        <p class="notifTime">{{not.notifTime | fromNowFilterTime}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mainAlt" v-if="!foundNotifications && requests.length == 0">
                    <img class="noNotifications" src="../assets/wait.svg" alt="">
                    <p class="alt">You have no notifications yet, Get ones by having new friends and react to each other</p>
                  </div>
                  <div class="lds-dual-ring" v-if="foundNotifications && notifications.length == 0 && requests.length == 0"></div>
                </div>
              </div>
              <router-link v-if="user" to="/" tag="li" active-class="active" exact class="bigMainHome"><i class="fas fa-home bigHome"></i></router-link>
              <router-link v-if="user" :to='`/messenger`' tag="li" active-class="active" style="position: relative"><i class="far fa-envelope"></i>
                <p class="seen" v-if="!ChatSeen"></p>
              </router-link>
              <router-link v-if="user" to="/explorePages" tag="li" active-class="active" exact><i class="fas fa-ellipsis-v"></i></router-link>
              <router-link v-if="!user" class="special" to="/login" tag="li" active-class="active" exact>Login</router-link>
              <router-link v-if="!user" to="/signup" tag="li" active-class="active" exact>Signup</router-link>
            </ul>

            <!-- SECONDARY NAVBAR FOR SMALL AND MOBILE SCREEN -->
            <ul class="navbar-nav num2 mr-auto" @click="close()">
              <div class="me" v-if="user" @click="$router.push({path: `/profile/${userObject.user_id}`}) && close()">
                <img :src="userObject.imgURL" alt="">
                <div class="myInfo">
                  <h6>{{userObject.nickname}}</h6>
                  <p>see your profile</p>
                </div>
              </div>
              <div class="dropdown-divider" v-if="user"></div>
              <router-link v-if="user" to="/" tag="li" active-class="active" exact><img src="../assets/icons/home.svg" alt=""> Home</router-link>
              <router-link v-if="user" :to='`/profile/${userObject.user_id}`' tag="li" active-class="active" exact><img src="../assets/icons/account.svg" alt="">Profile</router-link>
              <router-link v-if="user" :to='`/messenger`' tag="li" active-class="active">
                <span class="iCont">
                  <img src="../assets/icons/email.svg" alt=""> Messenger <p class="seen" v-if="!ChatSeen"></p>
                </span>
              </router-link>
              <router-link v-if="user" to="/notifications" tag="li" active-class="active" exact>
                <span class="iCont">
                  <img src="../assets/icons/bell.svg" alt=""> Notifications <p class="notifSeen" v-if="thereIsNotifications || requests.length > 0"></p>
                </span>
              </router-link>
              <router-link v-if="user" to="/explorePages" tag="li" active-class="active" exact><img src="../assets/icons/explore.svg" alt=""> Explore</router-link>
              <router-link v-if="user" to="/settings" tag="li" active-class="active" exact><img src="../assets/icons/helm.svg" alt=""> Settings</router-link>
              <router-link v-if="!user" to="/Login" tag="li" active-class="active" exact><i class="fas fa-sign-in-alt"></i> Login</router-link>
              <router-link v-if="!user" to="/signup" tag="li" active-class="active" exact><i class="fas fa-user-alt"></i> Signup</router-link>
              <li @click="logOut" v-if="user"><img src="../assets/icons/logout.svg" alt=""> Log out</li>
            </ul>

            <!-- SEARCH ENGINE FOR LARGE SCREENS AND IN THE MAIN NAVEBAR -->
            <div class="largeScreenSearch">
              <searchEngine></searchEngine>
            </div>

            <!-- USER SMALL PHOTO IN THE RIGHT SIDE OF THE MAIN NAVEBAR -->
            <div class="user dropdown" v-if="user">
              <img :src="userObject.imgURL" class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="infoo">
                  <span>{{userObject.nickname}}</span>
                  <span class="link" @click="$router.push({path: `/profile/${userObject.user_id}`})">PROFILE</span>
                </div>
                <div class="dropdown-divider"></div>
                <div class="profile" @click="$router.push({path: `/profile/${userObject.user_id}`})">
                  <img class="profImage" :src="userObject.imgURL" alt="">
                  <div class="profileInfo">
                    <h6>{{userObject.nickname}}</h6>
                    <p>see your profile</p>
                    <i class="fas fa-check"></i>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <div class="option" @click="$router.push({path: '/settings'})">
                  <img src="../assets/icons/helm.svg" alt="">
                  <div class="optionInfo">
                    <h6>Settings</h6>
                    <p>acsess your account settings</p>
                  </div>
                </div>
                <div class="option" @click="$store.state.openHelp = true">
                  <img src="../assets/icons/help.svg" alt="">
                  <div class="optionInfo">
                    <h6>Help!</h6>
                    <p>have an issue!?</p>
                  </div>
                </div>
                <div class="option" @click="logOut">
                  <img src="../assets/icons/logout.svg" alt="">
                  <div class="optionInfo">
                    <h6>Log out</h6>
                    <p>log out from your account!?</p>
                  </div>
                </div>
              </div>
            </div>

        </div>

        <!-- TO HELP COMPONENT -->
        <help v-if="$store.state.openHelp == true"></help>

    </nav>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
.nav {
  nav.navbar {
    background-color: #fff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    height: 55px;

    /* SEARCH ENGINE FOR SMALL AND MOBILE SCREENS */
    .smallScreenSearch {
      width: auto;
      height: auto;
      display: block;
      @media (min-width: 992px) {
        display: none;
      }
    }

    /* NAVBAR BRAND */
    a.navbar-brand {
      margin-right: 40px;
      color: $maincolor;
      border: 1px solid rgb(154, 154, 245);
      width: 40px;
      height: 40px;
      line-height: 28px;
      border-radius: 10px;
      font-weight: bold;
      font-size: 22px;
      i {
        color: $maincolor;
        font-size: 22px;
      }
      &:hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      }
    }

    /* BUTTON FOR DROPDOWN DIV IN SMALL AND MOBILE SCREENS */
    button.navbar-toggler {
      border-color: #fff;
      padding: 2px 6px;
      span {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(150,150,150)' stroke-width='1' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
        border-color: #000;
      }
    }

    /* MAIN AND SECONDARY NAVBARS */
    #navbarSupportedContent {
      /* HIDE SECONDARY NAVBAR ON THE LARGE AND MEDIUM SCREEN */
      ul.num2 {
        display: none;
        h6 {
          text-transform: capitalize;
        }
      }

       /* MAIN NAVBAR FOR LARGE SCREENS */ 
      ul:not(.num2) {
        li {
          margin-right: 8%;
          cursor: pointer;
          font-weight: bold;
          &.special {
            margin-right: 30px;
          }
          i {
            width: 40px;
            height: 40px;
            background-color: #fff;
            border-radius: 50%;
            line-height: 40px;
            color: rgb(155, 154, 154);
            position: relative;
            top: 4px;
            &:hover {
              background-color: $secondcolor;
              color: #fff;
            }
            &.bigHome {
              width: 50px;
              height: 50px;
              font-size: 25px;
              line-height: 48px;
              position: relative;
              top: -1px;
              border: 1px solid rgb(190, 190, 190);
              box-shadow: 2px 2px 10px rgb(219, 219, 219);
              &:hover {
                background-color: $secondcolor;
                color: #fff;
                border: 1px solid $secondcolor;
              }
            }
          }
          &.active {
              color: $secondcolor;
            i {
              background-color: $maincolor;
              color: #fff;
              width: 40px;
              height: 40px;
              line-height: 40px;
              font-size: 20px;
              box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
            }
          }
          &.bigMainHome {
            &.active {
              color: $secondcolor;
              i {
                background-color: $maincolor;
                color: #fff;
                width: 50px;
                height: 50px;
                line-height: 48px;
                font-size: 25px;
                box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
                border: 1px solid $maincolor;
              }
            }
          }
          p.seen {
            width: 14px;
            height: 14px;
            background-color: $secondcolor;
            border-radius: 50%;
            position: absolute;
            top: 5%;
            right: 0%;
            border: 2px solid #fff;
          }
        }
      }

      /* SEARCH ENGINE FOR LARGE SCREENS (MAIN NAVBAR) */
      .largeScreenSearch {
        @media (max-width: 992px) {
          display: none;
        }
      }

      /* NOTIFICATIONS DROPDOWN */
      div.notification {
        color: rgb(122, 122, 122);
        font-size: 17px;
        cursor: pointer;
        margin-right: 10%;
        .notifSeen {
          width: 14px;
          height: 14px;
          background-color: $secondcolor;
          border-radius: 50%;
          position: absolute;
          top: 4%;
          right: 0%;
          border: 2px solid #fff;
          z-index: 9999999;
        }
        i {
          width: 35px;
          height: 35px;
          background-color: #fff;
          border-radius: 50%;
          line-height: 35px;
          color: rgb(155, 154, 154);
          position: relative;
          top: 7px;
          &:hover {
            background-color: $secondcolor;
            color: #fff;
          }
          &.opened {
            background-color: $secondcolor;
            color: #fff;
          }
          &::after {
            content: none;
          }
        }
        .dropdown-menu {
          left: -100%;
          top: 105%;
          width: 380px;
          min-height: 200px;
          max-height: 450px;
          overflow-y: scroll;
          padding: 5px;
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
          .over {
            padding: 0 10px;
            position: relative;
            top: -8px;
            span {
              font-size: 13px;
              margin-right: 30%;
              background-color: #fff;
              border: none;
              color: #000;
              font-weight: bold;
              outline: none;
            }
          }
          .dropdown-divider {
            margin: -6px 0 10px 0;
            padding: 0;
          }
          .not {
            display: flex;
            padding: 10px 65px 0px 10px;
            margin-bottom: 0px;
            border-radius: 10px;
            &:hover {
              background-color: #f1f1f1;
            }
            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              margin-right: 5px;
            }
            .notInfo {
              position: relative;
              p {
                font-size: 15px;
              }
              span {
                font-size: 15px;
                font-weight: bold;
                margin-right: 5px;
              }
              span.visit {
                font-size: 12px;
                margin-left: 5%;
                color: $maincolor;
                text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
                &:hover {
                  text-decoration: underline;
                }
              }
              i.accept {
                position: absolute;
                top: 7px;
                right: -7%;
                font-size: 14px;
                text-align: center;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                border: 1px solid rgb(226, 226, 226);
                &:hover {
                  border: none;
                  background-color: $maincolor;
                }
              }
              i.refuse {
                position: absolute;
                top: 7px;
                right: -25%;
                font-size: 14px;
                text-align: center;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                border: 1px solid rgb(226, 226, 226);
                &:hover {
                  border: none;
                  background-color: $secondcolor;
                }
              }
            }
          }
          .nots {
            .notificationContainer {
              display: flex;
              padding: 10px 65px 0px 10px;
              margin-bottom: 2px;
              border-radius: 10px;
              &:hover {
                background-color: #f1f1f1;
              }
              img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                margin-right: 5px;
              }
              .notInfo {
                margin-top: 0px;
                position: relative;
                p {
                  font-size: 15px;
                  margin-bottom: 0;
                }
                span.nickname {
                  font-size: 15px;
                  font-weight: bold;
                  margin-right: 2px;
                }
                i.fa-thumbs-up {
                  position: absolute;
                  top: 10%;
                  right: -20%;
                  color: #fff;
                  width: 30px;
                  height: 30px;
                  background-color: $maincolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 29px;
                  font-size: 15px;
                }
                i.fa-heart {
                  position: absolute;
                  top: 10%;
                  right: -20%;
                  color: #fff;
                  width: 30px;
                  height: 30px;
                  background-color: $secondcolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 31px;
                  font-size: 15px;
                }
                i.fa-comment-dots {   
                  position: absolute;
                  top: 10%;
                  right: -20%;
                  color: #fff;
                  width: 30px;
                  height: 30px;
                  background-color: #50677e;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 31px;
                  font-size: 15px;
                }
                p.notifTime {
                  display: block;
                  color: $textcolor;
                  font-weight: 500;
                  font-size: 12px;
                  padding-bottom: 5px;
                }
              }
              @keyframes fadeOut {
                from {background-color: rgb(62, 62, 202)}
                to{background-color: #fff}
              }
              &.unRead {
                background-color: rgb(62, 62, 202);
                animation: fadeOut 2s ease-in-out forwards;
              }
            }
          }
          div.mainAlt {
            img.noNotifications {
              width: 95%;
              height: 200px;
            }
            p.alt {
              text-align: center;
              margin-top: 15px;
              padding: 0 5px 0 5px;
              font: {
                weight: 500;
                size: 14px;
              }
              span.alt2 {
                color: $secondcolor;
              }
            }
          }
          .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
            position: absolute;
            top: 40%;
            left: 40%;
            z-index: 999999999999999999;
            background-color: #fff;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 40px;
            height: 40px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $maincolor;
            border-color: $maincolor transparent #fff transparent;
            animation: lds-dual-ring 1.2s linear infinite;
            box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
          }
          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }

    }

    /* USER SMALL PHOTO IN THE RIGHT OF THE MAIN NAVBAR */
    .user {
      width: 35px;
      height: 35px;
      background-color: #ccc;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &::after {
          content: '' !important;
          border-top: 0;
        }
      }
      .dropdown-menu {
        left: -750%;
        top: 130%;
        width: 300px;
        .infoo {
          padding: 5px 10px 0 10px;
          span {
            font-size: 13px;
            font-weight: bold;
          }
          span.link {
            font-size: 11px;
            line-height: 20px;
            margin-right: 0;
            color: blue;
            font-weight: 500;
            float: right;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .dropdown-divider {
          margin: 0;
        }
        .profile {
          display: flex;
          padding: 15px 10px 10px 10px;
          position: relative;
          img.profImage {
            width: 45px;
            height: 45px;
            margin-right: 10px;
            background-color: #ccc;
          }
          .profileInfo {
            margin-top: 4px;
            h6 {
              font-size: 15px;
              font-weight: bold;
              margin-bottom: 0;
              text-transform: capitalize;
            }
            p {
              font-size: 12px;
              color: $textcolor;
            }
            i {
              position: absolute;
              top: 35%;
              right: 10%;
              color: rgb(151, 151, 151);
            }
          }
          &:hover {
            background-color: rgb(231, 230, 230);
          }
        }
        .option {
          display: flex;
          padding: 10px 10px 0 20px;
          &:hover {
            background-color: rgb(245, 245, 245);
          }
          img {
            width: 25px;
            height: 25px;
            border-radius: 0;
            margin-right: 10px;
          }
          .optionInfo {
            h6 {
              font-size: 15px;
              margin-bottom: 0;
            }
            p {
              font-size: 11px;
              color: $textcolor;
            }
          }
        }
      }
    }

    /* MOBILE SCREEN VIEW */
    @include mb {
      a.navbar-brand {
        margin-right: 0px;
        width: 35px;
        height: 35px;
        line-height: 22px;
        i {
          font-size: 18px;
        }
      }
      #navbarSupportedContent {
        background-color: #fff;
        text-align: left;
        border: 1px solid rgb(230, 227, 227);
        border-top: none;
        margin-top: 8px;
        border-radius: 0 0 5px 5px;
        ul {
          display: none;
        }
        ul.num2 {
          display: block;
          margin-top: 30px;
          margin-bottom: 20px;
          padding: 0 20px;
          position: relative;
          li {
            margin-top: 10px;
            text-align: left;
            color: $textcolor;
            cursor: pointer;
            position: relative;
            font-size: 13px;
            img {
              width: 17px;
              height: 17px;
              margin-right: 2px;
            }
            &:hover {
              color: $secondcolor;
            }
            &.active {
              color: $maincolor;
              font-weight: bold;
            }
            i {
              margin-right: 8px;
            }
            span.iCont {
              display: inline-block !important;
              text-align: center;
              position: relative;
              i {
                margin-right: 5px;
              }
              p.notifSeen {
                width: 7px;
                height: 7px;
                background-color: $secondcolor;
                border-radius: 50%;
                position: absolute;
                top: 1%;
                left: 10%;
              }
              p.seen {
                width: 7px;
                height: 7px;
                background-color: $secondcolor;
                border-radius: 50%;
                position: absolute;
                top: 1%;
                left: 15%;
              }
            }

          }
        }
        .me {
          display: flex;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .myInfo {
            h6 {
              margin-top: 2px;
              font-size: 15px;
              font-weight: bold;
              margin-bottom: 0;
            }
            p {
              color: $textcolor;
              font-size: 11px;
            }
          }
        }
      }
      div.cart {
        display: none;
      }
      .user {
        display: none;
      }
    }

    /* SMALL SCREEN VIEW */
    @include sm {
      #navbarSupportedContent {
        background-color: #fff;
        text-align: left;
        border: 1px solid rgb(230, 227, 227);
        border-top: none;
        margin-top: 7px;
        border-radius: 0 0 5px 5px;
        ul {
          display: none;
        }
        ul.num2 {
          display: block;
          margin-top: 30px;
          margin-bottom: 20px;
          padding: 0 20px;
          li {
            margin-top: 10px;
            text-align: left;
            color: $textcolor;
            cursor: pointer;
            img {
              width: 20px;
              height: 20px;
              margin-right: 2px;
            }
            span.iCont {
              position: relative;
              i {
                margin-right: 5px;
              }
              p.notifSeen {
                width: 8px;
                height: 8px;
                background-color: $secondcolor;
                border-radius: 50%;
                position: absolute;
                top: 0%;
                left: 11%;
              }
              p.seen {
                width: 8px;
                height: 8px;
                background-color: $secondcolor;
                border-radius: 50%;
                position: absolute;
                top: -5%;
                left: 15%;
              }
            }
            &:hover {
              color: $secondcolor;
            }
            &.active {
              color: $maincolor;
              font-weight: bold;
            }
            i {
              margin-right: 5px;
            }
          }
        }
        div.notification {
          color: rgb(122, 122, 122);
          font-size: 17px;
          cursor: pointer;
          margin-right: 10%;
          .notifSeen {
            width: 14px;
            height: 14px;
            background-color: $secondcolor;
            border-radius: 50%;
            position: absolute;
            top: 4%;
            right: 0%;
            border: 2px solid #fff;
            z-index: 9999999;
          }
          i {
            width: 35px;
            height: 35px;
            background-color: #fff;
            border-radius: 50%;
            line-height: 35px;
            color: rgb(155, 154, 154);
            position: relative;
            top: 7px;
            &:hover {
              background-color: $secondcolor;
              color: #fff;
            }
            &.opened {
              background-color: $secondcolor;
              color: #fff;
            }
            &::after {
              content: none;
            }
          }
          .dropdown-menu {
            left: -100%;
            top: 105%;
            width: 300px !important;
            min-height: 200px;
            max-height: 450px;
            overflow-y: scroll;
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
            .over {
              padding: 0 10px;
              position: relative;
              top: -8px;
              span {
                font-size: 13px;
                margin-right: 30%;
                background-color: #fff;
                border: none;
                color: #000;
                font-weight: bold;
                outline: none;
              }
            }
            .dropdown-divider {
              margin: -6px 0 10px 0;
              padding: 0;
            }
            .not {
              display: flex;
              padding: 10px 65px 0px 10px;
              margin-bottom: 0px;
              &:hover {
                background-color: #f4f4f4;
              }
              img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                margin-right: 5px;
              }
              .notInfo {
                position: relative;
                p {
                  font-size: 15px;
                }
                span {
                  font-size: 15px;
                  font-weight: bold;
                  margin-right: 5px;
                }
                i.accept {
                  position: absolute;
                  top: 7px;
                  right: -7%;
                  text-align: center;
                }
                i.refuse {
                  position: absolute;
                  top: 7px;
                  right: -25%;
                  text-align: center;
                }
              }
            }
            .nots {
              .notificationContainer {
                display: flex;
                padding: 10px 65px 0px 10px;
                margin-bottom: 2px;
                &:hover {
                  background-color: #eeeeee;
                }
                img {
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                  margin-right: 5px;
                }
                .notInfo {
                  margin-top: 0px;
                  position: relative;
                  p {
                    font-size: 15px;
                    margin-bottom: 0;
                  }
                  span.nickname {
                    font-size: 15px;
                    font-weight: bold;
                    margin-right: 2px;
                  }
                  i.fa-thumbs-up {
                    position: absolute;
                    top: 10%;
                    right: -20%;
                    color: #fff;
                    width: 30px;
                    height: 30px;
                    background-color: $maincolor;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 28px;
                  }
                  i.fa-heart {
                    position: absolute;
                    top: 10%;
                    right: -20%;
                    color: #fff;
                    width: 30px;
                    height: 30px;
                    background-color: $secondcolor;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 31px;
                  }
                  p.notifTime {
                    display: block;
                    color: $textcolor;
                    font-weight: 500;
                    font-size: 12px;
                    padding-bottom: 5px;
                  }
                }
                @keyframes fadeOut {
                  from {background-color: rgb(62, 62, 202)}
                  to{background-color: #fff}
                }
                &.unRead {
                  background-color: rgb(62, 62, 202);
                  animation: fadeOut 2s ease-in-out forwards;
                }
              }
            }
            div.mainAlt {
              img.noNotifications {
                width: 95%;
                height: 200px;
              }
              p.alt {
                text-align: center;
                margin-top: 15px;
                padding: 0 5px 0 5px;
                font: {
                  weight: 500;
                  size: 14px;
                }
                span.alt2 {
                  color: $secondcolor;
                }
              }
            }
            .lds-dual-ring {
              display: inline-block;
              width: 80px;
              height: 80px;
              position: absolute;
              top: 40%;
              left: 40%;
              z-index: 999999999999999999;
              background-color: #fff;
            }
            .lds-dual-ring:after {
              content: " ";
              display: block;
              width: 40px;
              height: 40px;
              margin: 8px;
              border-radius: 50%;
              border: 3px solid $maincolor;
              border-color: $maincolor transparent #fff transparent;
              animation: lds-dual-ring 1.2s linear infinite;
              box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
            }
            @keyframes lds-dual-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }
        }
        .me {
          display: flex;
          cursor: pointer;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .myInfo {
            h6 {
              margin-top: 2px;
              font-size: 15px;
              font-weight: bold;
              margin-bottom: 0;
            }
            p {
              color: $textcolor;
              font-size: 11px;
            }
          }
        }
      }
      .user {
        display: none;
      }
    }

    /* MEDIUM SCREEN VIEW */
    @include md {
      #navbarSupportedContent {
        div.notification {
          color: rgb(122, 122, 122);
          font-size: 17px;
          cursor: pointer;
          margin-right: 10%;
          .notifSeen {
            width: 14px;
            height: 14px;
            background-color: $secondcolor;
            border-radius: 50%;
            position: absolute;
            top: 4%;
            right: 0%;
            border: 2px solid #fff;
            z-index: 9999999;
          }
          i {
            width: 35px;
            height: 35px;
            background-color: #fff;
            border-radius: 50%;
            line-height: 35px;
            color: rgb(155, 154, 154);
            position: relative;
            top: 7px;
            &:hover {
              background-color: $secondcolor;
              color: #fff;
            }
            &.opened {
              background-color: $secondcolor;
              color: #fff;
            }
            &::after {
              content: none;
            }
          }
          .dropdown-menu {
            left: -100%;
            top: 105%;
            width: 300px !important;
            min-height: 200px;
            max-height: 450px;
            overflow-y: scroll;
            .over {
              padding: 0 10px;
              position: relative;
              top: -8px;
              span {
                font-size: 13px;
                margin-right: 30%;
                background-color: #fff;
                border: none;
                color: #000;
                font-weight: bold;
                outline: none;
              }
            }
            .dropdown-divider {
              margin: -6px 0 10px 0;
              padding: 0;
            }
            .not {
              display: flex;
              padding: 10px 65px 0px 10px;
              margin-bottom: 0px;
              &:hover {
                background-color: #f4f4f4;
              }
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
              }
              .notInfo {
                position: relative;
                p {
                  font-size: 13px;
                }
                span {
                  font-size: 13px;
                  font-weight: bold;
                  margin-right: 5px;
                  &.visit {
                    font-size: 11px;
                  }
                }
                i.accept {
                  position: absolute;
                  top: 7px;
                  right: -18%;
                  text-align: center;
                  width: 27px;
                  height: 27px;
                  font-size: 12px;
                  line-height: 25px;
                  padding-left: 1px;
                }
                i.refuse {
                  position: absolute;
                  top: 7px;
                  right: -35%;
                  text-align: center;
                  width: 27px;
                  height: 27px;
                  font-size: 12px;
                  line-height: 26px;
                }
              }
            }
            .nots {
              .notificationContainer {
                display: flex;
                padding: 10px 55px 0px 8px;
                margin-bottom: 2px;
                &:hover {
                  background-color: #eeeeee;
                }
                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  margin-right: 5px;
                }
                .notInfo {
                  margin-top: 0px;
                  position: relative;
                  p {
                    font-size: 13px;
                    margin-bottom: 0;
                  }
                  span.nickname {
                    font-size: 13px;
                    font-weight: bold;
                    margin-right: 2px;
                  }
                  i.fa-thumbs-up {
                    position: absolute;
                    top: 10%;
                    right: -22%;
                    color: #fff;
                    width: 28px;
                    height: 28px;
                    background-color: $maincolor;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 27px;
                    font-size: 14px;
                  }
                  i.fa-heart {
                    position: absolute;
                    top: 10%;
                    right: -22%;
                    color: #fff;
                    width: 28px;
                    height: 28px;
                    background-color: $secondcolor;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 28px;
                    font-size: 14px;
                  }
                  p.notifTime {
                    display: block;
                    color: $textcolor;
                    font-weight: 500;
                    font-size: 10px;
                    padding-bottom: 5px;
                  }
                }
              }
            }
            div.mainAlt {
              img.noNotifications {
                width: 95%;
                height: 180px;
              }
              p.alt {
                text-align: center;
                margin-top: 15px;
                padding: 0 5px 0 5px;
                font: {
                  weight: 500;
                  size: 13px;
                }
                span.alt2 {
                  color: $secondcolor;
                }
              }
            }
            .lds-dual-ring {
              display: inline-block;
              width: 80px;
              height: 80px;
              position: absolute;
              top: 40%;
              left: 40%;
              z-index: 999999999999999999;
              background-color: #fff;
            }
            .lds-dual-ring:after {
              content: " ";
              display: block;
              width: 40px;
              height: 40px;
              margin: 8px;
              border-radius: 50%;
              border: 3px solid $maincolor;
              border-color: $maincolor transparent #fff transparent;
              animation: lds-dual-ring 1.2s linear infinite;
              box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
            }
            @keyframes lds-dual-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }
        }
      }
      form {
        .searchResults {
          width: 350px;
          max-height: 450px;
          top: 105%;
          right: 5%;
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
              }
            }
            .info {
              h6 {
                font-size: 15px;
              }
              span {
                font-size: 13px;
                &.visit {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }

  }
}
</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
// import $ from 'jquery'
import moment from 'moment'
import help from './Help'
import searchEngine from './SearchEngine.vue'
export default {
  data() {
    return {
      user: null,
      userObject: '',
      requests: [],
      notifications: [],
      seenMessages: '',
      ChatSeen: true,
      thereIsNotifications: false,
      foundNotifications: false
    }
  },
  methods: {
    // STOP RELOADING THE PAGE ON CLICKING A NAVBAR BRAND ANCHOR TAG
    navBrand(e) {
      e.preventDefault();
    },

    // LOGOUT METHOD FROM 'VUEX'
    logOut() {
      this.$store.dispatch('logOut');
    },

    // ACCEPT FRIEND REQUEST METHOD
    acceptFriendRequest(userId) {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        friends: admin.firestore.FieldValue.arrayUnion({
          userId: userId
        }),
        requests: admin.firestore.FieldValue.arrayRemove({
          userId: userId
        })
      })
      firebase.firestore().collection('users').doc(userId).update({
        friends: admin.firestore.FieldValue.arrayUnion({
          userId: firebase.auth().currentUser.uid
        })
      })
      this.requests = this.requests.filter(req => req.user_id != userId)
    },

    // REFUSE FRIEND REQUEST
    refuseFriendRequest(userId) {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        requests: admin.firestore.FieldValue.arrayRemove({
          userId: userId
        })
      })
      this.requests = this.requests.filter(request => request.user_id !== userId)
    },

    // MAKE ALL NOTIFICATIONS SEEN = TRUE WHEN CLICKING THE NOTIFICATIONS ICON
    readNotifications() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
        let notifications = [];
        doc.data().notifications.forEach(notifi => {
          notifi.seen = true
          notifications.push(notifi)
        })
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
          notifications
        })
      })
      this.thereIsNotifications = false
    },

    // CLOSE NAVBAR COLLAPSE
    close() {
      document.getElementById('navbarSupportedContent').classList.remove('show')
      console.log('should be closed')
    }

  },
  async created() {
    // IDENTIFY IF THE USER LOGGED IN OR NOT
    await firebase.auth().onAuthStateChanged(user => {
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
    // LISTENING FOR NEW NOTIFICATIONS TO SHOW ALERT
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let foundUnreadNotif = doc.data().notifications.find(notif => notif.seen == false)
      console.log(doc.data().notifications)
      if(foundUnreadNotif) {
        this.thereIsNotifications = true
      } else {
        this.thereIsNotifications = false
      }
    })
    // GET THE USER DATA WHO SENT THE FRIEND REQUEST
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      this.requests = []
      doc.data().requests.forEach(async ({userId}, index) => {
        var userData = await firebase.firestore().collection('users').doc(userId).get();
        doc.data().requests[index] = userData.data();
        this.requests.push(userData.data());
      })
    })
    // LISTENING TO NEW NOTIFICATIONS
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      if(doc.data().notifications.length > 0) {
        this.foundNotifications = true
        console.log('there are notifications there!')
      } else {
        this.foundNotifications = false
        console.log('there are no notifications yet!')
      }
      console.log('change happened!')
      this.notifications = [] // MISSED REMARKABLE IDEA...
      doc.data().notifications.forEach(async ({userId}, index) => {
        var userData = await firebase.firestore().collection('users').doc(userId).get();
        doc.data().notifications[index].user = userData.data();
        await this.notifications.unshift({
          user: userData.data(),
          postId: doc.data().notifications[index].postId,
          notifTime: doc.data().notifications[index].notifTime,
          notifType: doc.data().notifications[index].notifType,
          seen: doc.data().notifications[index].seen
        });
      })
    })
    // LISTENING TO NEW MESSAGES
    var SELF = this
    firebase.firestore().collection('chats').where('type', '==', 'CHAT').onSnapshot(docs => {
      console.log(docs)
      if(docs.empty == true) {
        SELF.ChatSeen = true
      }
      docs.docChanges().forEach(async (DOC) => {
        var chat = DOC.doc.data()
        if(chat.users[0] == firebase.auth().currentUser.uid || chat.users[1] == firebase.auth().currentUser.uid) {
          if (chat.lastSeen[firebase.auth().currentUser.uid] != chat.messages[chat.messages.length - 1].msgId) {
            console.log("unread")
            SELF.ChatSeen = false
          } else {
            SELF.ChatSeen = true
          }
        } else {
          SELF.ChatSeen = true
        }
      })
    })
    // DEFAULT AREA FOR NO NOTIFICATIONS FOUND IN THE NOTIFICATIONS DROPDOWN
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      if(doc.data().notifications.length > 0 || doc.data().requests.length > 0) {
        this.foundNotifications = true
        console.log('there are notifications there!')
      } else {
        this.foundNotifications = false
        console.log('there are no notifications yet!')
      }
    })
  },
  filters: {
    // TIME FORMAT
    fromNowFilterTime(time) {
      return moment(time).fromNow();
    }
  },
  components: {
    help,
    searchEngine
  }
}
</script>