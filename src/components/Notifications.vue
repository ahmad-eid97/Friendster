<template>
  <div class="notSec">
    <div class="row">

      <!-- LEFT SIDEBAR FOR USER INFO AND PAGES -->
      <div class="col-lg-3 profileInfoSectionMain">
        <div class="profileInfoSection">
          <div class="imageP">
            <img :src="userObject.imgURL" alt="">
            <p class="online"></p>
          </div>
          <h6>{{userObject.nickname}}</h6>
          <p class="bio">{{userObject.bio}}</p>
          <div class="infoInfo">
            <div class="info1">
              <h6>FRIENDS</h6>
              <p class="number"><i class="fas fa-users"></i> {{userObject.friends.length}}</p>
            </div>
            <div class="info2">
              <h6>POSTS</h6>
              <p class="number"><i class="fas fa-address-card"></i> {{postsNumber.length}}</p>
            </div>
          </div>
            <div class="profileOptions">
              <ul class="list-unstyled">
                <li @click="$router.push({path: '/notifications'})" :class="{notific: thereIsNotifications || requests.length > 0}"><span class="nott"><img src="../assets/icons/bell.svg" alt=""></span> Notifications </li>
                <li @click="$router.push({path: '/messenger'})" :class="{mess: !ChatSeen}"><span class="nottS"><img src="../assets/icons/email.svg" alt=""></span> Messenger </li>
                <li @click="$router.push({path: '/explorePages'})"><img src="../assets/icons/explore.svg" alt=""> Explore</li>
                <li><img src="../assets/icons/weather.svg" alt=""> Weather</li>
                <hr>
                <li><img src="../assets/icons/search.svg" alt=""> Search</li>
                <li><img src="../assets/icons/map.svg" alt=""> Maps</li>
                <li><img src="../assets/icons/lock.svg" alt=""> Privacy</li>
                <li><img src="../assets/icons/help.svg" alt=""> Help</li>
                <hr>
                <li @click="$router.push({path: '/settings'})"><img src="../assets/icons/helm.svg" alt=""> Settings</li>
              </ul>
          </div>
        </div>
      </div>

      <!-- CONTAINER FOR SHOWING NOTIFICATIONS -->
      <div class="col-lg-4 col-md-6 col-11 notifsContainer">
        <div class="notifsArea container">
          <div class="noNotifs" v-if="notifications.length <= 0 && foundNotifications == false">
            <img src="../assets/noNotifs.svg" alt="">
            <p>Hi <span>{{userObject.nickname.split(' ')[0]}}</span>, There is no notifications yet.</p>
            <p>start making friends to have ones</p>
          </div>
          <div class="notifications" v-if="notifications.length > 0 && foundNotifications == true || requests.length > 0">
            <div class="not" v-for="request in requests" :key="request.id">
              <div class="notInfo">
                <div class="in">
                  <img :src="request.imgURL" alt="">
                  <p><span class="name">{{request.nickname}}</span>sent you a friend request. <span class="visit" @click="$router.push({path: `/profile/${request.user_id}`})">visit profile</span></p>
                </div>
                <div>
                  <i class="fas fa-user-check accept" @click="acceptFriendRequest(request.user_id)"></i>
                  <i class="fas fa-trash-alt refuse" @click="refuseFriendRequest(request.user_id)"></i>
                </div>
              </div>
            </div>
            <div class="nots" v-for="not in notifications" :key="not.id">
              <div v-if="not" class="notificationContainer" @click="$router.push({path: `/postreview/${not.postId}`})">
                <div class="image">
                  <img :src="not.user.imgURL" alt="">
                  <i v-if="not.notifType === 'like'" class="fas fa-thumbs-up"></i> 
                  <i v-if="not.notifType === 'love'" class="fas fa-heart"></i>
                  <i v-if="not.notifType === 'comment'" class="far fa-comment-dots"></i>
                </div>
                <div class="notInfo">
                  <p><span class="nickname">{{not.user.nickname}}</span>
                    <span v-if="not.notifType === 'like' || not.notifType === 'love'"> reacted 
                      <span v-if="not.notifType == 'like'">like</span>
                      <span v-if="not.notifType == 'love'">love</span> to your post.
                    </span>
                    <span v-if="not.notifType == 'comment'"> commented on your post.</span>
                  </p>
                  <p class="notifTime">{{not.notifTime | fromNowFilterTime}}</p>
                </div>
              </div>
            </div>
            <div class="lds-dual-ring" v-if="foundNotifications && notifications.length == 0 && requests.length == 0"></div>
          </div>
        </div>
      </div>

      <!-- RIGHT BAR FOR HELP -->
      <div class="col-lg-3 col-md-5 someThingElse">
        <div class="inside">
          <img src="../assets/question.svg" alt="">
          <p>If you had any issue in this page, please head to our <span @click="$store.state.openHelpNot = true">Help</span> page.</p>
        </div>
      </div>
    </div>

    <help v-if="$store.state.openHelpNot"></help>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
body {
  background-color: #fff;
}
.notSec {
  background-color: #f4f4f4;
  .profileInfoSection {
    height: 100vh;
    width: 22%;
    background-color: #fff;
    position: fixed;
    padding-top: 20px;
    border-right: 1px solid rgb(231, 230, 230);
    padding: 40px 0px 10px 0px;
    .imageP {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: auto;
      margin-bottom: 5px;
      position: relative;
      background-color: #ccc;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #ccc;
      }
      p.online {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #1CE589;
        border-radius: 50%;
        top: 0;
        right: 0;
        border: 3px solid #fff;
      }
    }
    h6 {
      font-weight: bold;
      margin-bottom: 0;
      font-size: 22px;
      text-transform: capitalize;
    }
    p {
      font-size: 14px;
      color: rgb(138, 138, 138);
      &.bio {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
      }
      &.number {
        color: rgb(146, 145, 145);
        margin: 5px auto 15px;
        font-weight: 500;
        font-size: 14px;
      }
    }
    .infoInfo {
      border-bottom: 1px solid rgb(231, 230, 230) !important;
      .info1 {
        display: inline-block;
        margin-right: 18%;
        h6 {
          font-size: 14px;
        }
      }
      .info2 {
        display: inline-block;
        margin-left: 18%;
        h6 {
          font-size: 14px;
        }
      }
    }
    .profileOptions {
      height: 60%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
          background: #f7f7f7;
      }
      &::-webkit-scrollbar-thumb {
        background: rgb(212, 210, 210);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: rgb(212, 210, 210);
      }
      ul {
        margin-top: 30px;
        margin-left: 5px !important;
        li {
          margin-top: 7px;
          text-align: left;
          color: $textcolor;
          padding: 8px 8px;
          cursor: pointer;
          font-size: 15px;
          padding-left: 15px;
          border-radius: 0 5px 5px 0;
          margin-right: 4px;
          position: relative;
          i {
            margin-right: 10px;
          }
          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }
          &.notific {
            background-color: #e2ebfa;
            border-left: 2px solid $maincolor;
          }
          &.mess {
            background-color: #e2ebfa;
            border-left: 3px solid $maincolor;
          }
          .nott {
            position: relative;
            display: inline-block;
            i {
              margin-right: 10px;
            }
            p.notifSeen {
              width: 8px;
              height: 8px;
              background-color: $maincolor;
              border-radius: 50%;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .nottS {
            position: relative;
            display: inline-block;
            i {
              margin-right: 10px;
            }
            p.seen {
              width: 8px;
              height: 8px;
              background-color: $maincolor;
              border-radius: 50%;
              position: absolute;
              top: -3px;
              right: 0;
            }
          }
          &:hover {
            background-color: rgb(235, 234, 234);
            color: #000;
          }
        }
      }
    }
  }
  .notifsContainer {
    height: 93vh;
    .notifsArea {
      background-color: #fff;
      padding: 20px 5px 20px 10px;
      margin-top: 6%;
      border: 1px solid rgb(224, 224, 224);
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
      .noNotifs {
        img {
          width: 60%;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 0;
          font-weight: 500;
          span {
            color: $secondcolor;
          }
        }
      }
      .notifications {
        overflow-y: scroll;
        max-height: 80vh;
        height: auto;
        position: relative;
        .lds-dual-ring {
          display: inline-block;
          width: 80px;
          height: 80px;
          position: absolute;
          top: 35%;
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
        .not {
          padding: 10px 10px 10px 10px;
          margin-bottom: 0px;
          border-radius: 10px;
          margin-right: 5px;
          &:hover {
            background-color: #f1f1f1;
          }
          img {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            margin-right: 7px;
          }
          .notInfo {
            position: relative;
            text-align: left;
            margin-top: 3px;
            display: flex;
            justify-content: space-between;
            .in {
              display: flex;
            }
            p {
              font-size: 16px;
              margin-bottom: 0;
            }
            span {
              font-size: 16px;
              font-weight: bold;
              margin-right: 5px;
              text-transform: capitalize;
            }
            span.visit {
              display: block;
              font-size: 12px;
              margin-left: 1%;
              color: $maincolor;
              cursor: pointer;
              text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
              width: 70px;
              &:hover {
                text-decoration: underline;
              }
            }
            i.accept {
              font-size: 14px;
              text-align: center;
              box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              border: 1px solid rgb(226, 226, 226);
              width: 35px;
              height: 35px;
              line-height: 35px;
              background-color: #fff;
              border-radius: 50%;
              cursor: pointer;
              color: rgb(146, 146, 146);
              margin-right: 10px;
              &:hover {
                border: none;
                background-color: $maincolor;
                color: #fff;
              }
            }
            i.refuse {
              font-size: 14px;
              text-align: center;
              box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              border: 1px solid rgb(226, 226, 226);
              width: 35px;
              height: 35px;
              line-height: 35px;
              background-color: #fff;
              cursor: pointer;
              border-radius: 50%;
              color: rgb(146, 146, 146);
              &:hover {
                border: none;
                background-color: $secondcolor;
                color: #fff;
              }
            }
          }
        }
        .nots {
          .notificationContainer {
            display: flex;
            padding: 10px 10px 10px 10px;
            margin-bottom: 2px;
            border-radius: 10px;
            margin-right: 5px;
            text-align: left;
            cursor: pointer;
            &:hover {
              background-color: #f1f1f1;
            }
            .image {
              width: 55px;
              height: 55px;
              position: relative;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
              i.fa-thumbs-up {
                position: absolute;
                top: 60%;
                right: -10%;
                color: #fff;
                width: 25px;
                height: 25px;
                background-color: $maincolor;
                border-radius: 50%;
                text-align: center;
                line-height: 24px;
                font-size: 12px;
              }
              i.fa-heart {
                position: absolute;
                top: 60%;
                right: -10%;
                color: #fff;
                width: 25px;
                height: 25px;
                background-color: $secondcolor;
                border-radius: 50%;
                text-align: center;
                line-height: 27px;
                font-size: 12px;
              }
              i.fa-comment-dots {   
                position: absolute;
                top: 60%;
                right: -10%;
                color: #fff;
                width: 25px;
                height: 25px;
                background-color: #50677e;
                border-radius: 50%;
                text-align: center;
                line-height: 27px;
                font-size: 12px;
              }
            }
            .notInfo {
              margin-top: 3px;
              position: relative;
              p {
                font-size: 16px;
                margin-bottom: 0;
              }
              span.nickname {
                font-size: 16px;
                font-weight: bold;
                margin-right: 2px;
                text-transform: capitalize;
              }
              p.notifTime {
                display: block;
                color: rgb(155, 155, 155);
                font-weight: 500;
                font-size: 13px;
                padding-bottom: 5px;
                text-align: left;
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
      }
    }
  }
  .someThingElse {
    .inside {
      background-color: #fff;
      padding: 20px;
      margin-top: 8%;
      border: 1px solid rgb(224, 224, 224);
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
      img {
        width: 100%;
      }
      p {
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 0px;
        span {
          color: $secondcolor;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  @include mb {
    .profileInfoSectionMain {
      display: none;
    }
    .profileInfoSection {
      position: relative !important;
      display: none;
    }
    .notifsContainer {
      height: 93vh;
      margin: auto;
      .notifsArea {
        background-color: #fff;
        padding: 20px 5px 20px 10px;
        margin-top: 30px;
        .noNotifs {
          img {
            width: 60%;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 0;
            font-weight: 500;
            span {
              color: $secondcolor;
            }
          }
        }
        .notifications {
          overflow-y: scroll;
          max-height: 80vh;
          height: auto;
          position: relative;
          .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
            position: absolute;
            top: 35%;
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
          .not {
            padding: 2px 2px 10px 2px;
            margin-bottom: 0px;
            border-radius: 10px;
            margin-right: 5px;
            &:hover {
              background-color: #f1f1f1;
            }
            img {
              width: 35px;
              height: 35px;
            }
            .notInfo {
              position: relative;
              text-align: left;
              margin-top: 0px;
              display: flex;
              justify-content: space-between;
              .in {
                display: flex;
              }
              p {
                font-size: 12px;
                margin-bottom: 0;
              }
              span {
                font-size: 12px;
                font-weight: bold;
                margin-right: 5px;
              }
              span.visit {
                display: block;
                font-size: 8px;
                margin-left: 1%;
              }
              i.accept {
                font-size: 10px;
                width: 27px;
                height: 27px;
                line-height: 25px;
                background-color: #fff;
                border-radius: 50%;
                cursor: pointer;
                color: rgb(146, 146, 146);
                margin-right: 5px;
              }
              i.refuse {
                font-size: 10px;
                width: 27px;
                height: 27px;
                line-height: 26px;
                background-color: #fff;
                cursor: pointer;
                border-radius: 50%;
                color: rgb(146, 146, 146);
              }
            }
          }
          .nots {
            .notificationContainer {
              display: flex;
              padding: 10px 55px 10px 5px;
              margin-bottom: 2px;
              border-radius: 10px;
              margin-right: 5px;
              cursor: pointer;
              text-align: left;
              &:hover {
                background-color: #f1f1f1;
              }
              .image {
                width: 35px;
                height: 35px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
                i.fa-thumbs-up {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 15px;
                  height: 15px;
                  background-color: $maincolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 15px;
                  font-size: 8px;
                }
                i.fa-heart {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 15px;
                  height: 15px;
                  background-color: $secondcolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 17px;
                  font-size: 8px;
                }
                i.fa-comment-dots {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 15px;
                  height: 15px;
                  background-color: #50677e;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 17px;
                  font-size: 8px;
                }
              }
              .notInfo {
                margin-top: 0px;
                position: relative;
                p {
                  font-size: 12px;
                  margin-bottom: 0;
                }
                span.nickname {
                  font-size: 12px;
                  font-weight: bold;
                  margin-right: 2px;
                }
                p.notifTime {
                  display: block;
                  color: rgb(155, 155, 155);
                  font-weight: 500;
                  font-size: 9px;
                  padding-bottom: 5px;
                  text-align: left;
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
        }
      }
    }
    .someThingElse { 
      display: none;
    }
  }
  @include sm {
    .profileInfoSectionMain {
      display: none;
    }
    .profileInfoSection {
      position: relative !important;
      display: none;
    }
    .notifsContainer {
      height: 93vh;
      .notifsArea {
        background-color: #fff;
        padding: 20px 5px 20px 10px;
        margin-left: 20px;
        .noNotifs {
          img {
            width: 60%;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 0;
            font-weight: 500;
            span {
              color: $secondcolor;
            }
          }
        }
        .notifications {
          overflow-y: scroll;
          max-height: 80vh;
          height: auto;
          position: relative;
          .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
            position: absolute;
            top: 35%;
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
          .not {
            padding: 10px 10px 10px 10px;
            margin-bottom: 0px;
            border-radius: 10px;
            margin-right: 5px;
            &:hover {
              background-color: #f1f1f1;
            }
            img {
              width: 45px;
              height: 45px;
            }
            .notInfo {
              position: relative;
              text-align: left;
              margin-top: 1px;
              display: flex;
              justify-content: space-between;
              .in {
                display: flex;
              }
              p {
                font-size: 14px;
                margin-bottom: 0;
              }
              span {
                font-size: 14px;
                font-weight: bold;
                margin-right: 5px;
              }
              span.visit {
                display: block;
                font-size: 10px;
                margin-left: 1%;
              }
              i.accept {
                font-size: 12px;
                width: 30px;
                height: 30px;
                line-height: 29px;
                background-color: #fff;
                border-radius: 50%;
                cursor: pointer;
                color: rgb(146, 146, 146);
                &:hover {
                  border: none;
                  background-color: $maincolor;
                  color: #fff;
                }
              }
              i.refuse {
                font-size: 12px;
                width: 30px;
                height: 30px;
                line-height: 29px;
                background-color: #fff;
                cursor: pointer;
                border-radius: 50%;
                color: rgb(146, 146, 146);
                &:hover {
                  border: none;
                  background-color: $secondcolor;
                  color: #fff;
                }
              }
            }
          }
          .nots {
            .notificationContainer {
              display: flex;
              padding: 10px 55px 10px 10px;
              margin-bottom: 2px;
              border-radius: 10px;
              margin-right: 5px;
              cursor: pointer;
              &:hover {
                background-color: #f1f1f1;
              }
              .image {
                width: 45px;
                height: 45px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
                i.fa-thumbs-up {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: $maincolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 19px;
                  font-size: 10px;
                }
                i.fa-heart {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: $secondcolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 22px;
                  font-size: 10px;
                }
                
                i.fa-comment-dots {   
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: #50677e;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 20px;
                  font-size: 10px;
                }
              }
              .notInfo {
                margin-top: 3px;
                position: relative;
                p {
                  font-size: 14px;
                  margin-bottom: 0;
                }
                span.nickname {
                  font-size: 14px;
                  font-weight: bold;
                  margin-right: 2px;
                }
                p.notifTime {
                  display: block;
                  color: rgb(155, 155, 155);
                  font-weight: 500;
                  font-size: 11px;
                  padding-bottom: 5px;
                  text-align: left;
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
        }
      }
    }
    .someThingElse {
      width: 95%;
      .inside {
        img {
          width: 90%;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  @include md {
    .profileInfoSection {
      .imageP {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
        img {
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }
        p.online {
          position: absolute;
          width: 17px;
          height: 17px;
        }
      }
      h6 {
        font-weight: bold;
        font-size: 15px;
      }
      p {
        font-size: 12px;
        color: $textcolor;
      }
      .infoInfo {
        border-bottom: 1px solid #ccc;
        .info1 {
          display: inline-block;
          margin-right: 18%;
          margin-bottom: 10px;
          h6 {
            font-size: 12px;
          }
        }
        .info2 {
          display: inline-block;
          margin-left: 18%;
          h6 {
            font-size: 12px;
          }
        }
      }
      .profileOptions {
        height: 60%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 5px;
          border-radius: 10px;
        }
        ul {
          margin-top: 20px;
          margin-left: 20px;
          li {
            margin-top: 10px;
            text-align: left;
            color: $textcolor;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 14px;
            i {
              margin-right: 10px;
            }
            img {
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
            &:hover {
              background-color: rgb(235, 234, 234);
              color: #000;
            }
          }
        }
      }
    }
    .notifsContainer {
      height: 93vh;
      .notifsArea {
        background-color: #fff;
        padding: 20px 5px 20px 10px;
        width: 130%;
        .noNotifs {
          img {
            width: 60%;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 0;
            font-weight: 500;
            span {
              color: $secondcolor;
            }
          }
        }
        .notifications {
          overflow-y: scroll;
          max-height: 80vh;
          height: auto;
          position: relative;
          .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
            position: absolute;
            top: 35%;
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
          .not {
            padding: 10px 10px 10px 10px;
            margin-bottom: 0px;
            border-radius: 10px;
            margin-right: 5px;
            &:hover {
              background-color: #f1f1f1;
            }
            img {
              width: 45px;
              height: 45px;
            }
            .notInfo {
              position: relative;
              text-align: left;
              margin-top: 1px;
              display: flex;
              justify-content: space-between;
              .in {
                display: flex;
              }
              p {
                font-size: 14px;
                margin-bottom: 0;
              }
              span {
                font-size: 14px;
                font-weight: bold;
                margin-right: 5px;
              }
              span.visit {
                display: block;
                font-size: 10px;
                margin-left: 1%;
              }
              i.accept {
                font-size: 12px;
                width: 30px;
                height: 30px;
                line-height: 29px;
                background-color: #fff;
                border-radius: 50%;
                cursor: pointer;
                color: rgb(146, 146, 146);
                &:hover {
                  border: none;
                  background-color: $maincolor;
                  color: #fff;
                }
              }
              i.refuse {
                font-size: 12px;
                width: 30px;
                height: 30px;
                line-height: 29px;
                background-color: #fff;
                cursor: pointer;
                border-radius: 50%;
                color: rgb(146, 146, 146);
                &:hover {
                  border: none;
                  background-color: $secondcolor;
                  color: #fff;
                }
              }
            }
          }
          .nots {
            .notificationContainer {
              display: flex;
              padding: 10px 55px 10px 10px;
              margin-bottom: 2px;
              border-radius: 10px;
              margin-right: 5px;
              cursor: pointer;
              &:hover {
                background-color: #f1f1f1;
              }
              .image {
                width: 45px;
                height: 45px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
                i.fa-thumbs-up {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: $maincolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 19px;
                  font-size: 10px;
                }
                i.fa-heart {
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: $secondcolor;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 22px;
                  font-size: 10px;
                }
                i.fa-comment-dots {   
                  position: absolute;
                  top: 60%;
                  right: -10%;
                  color: #fff;
                  width: 20px;
                  height: 20px;
                  background-color: #50677e;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 21px;
                  font-size: 10px;
                }
              }
              .notInfo {
                margin-top: 3px;
                position: relative;
                p {
                  font-size: 14px;
                  margin-bottom: 0;
                }
                span.nickname {
                  font-size: 14px;
                  font-weight: bold;
                  margin-right: 2px;
                }
                p.notifTime {
                  display: block;
                  color: rgb(155, 155, 155);
                  font-weight: 500;
                  font-size: 11px;
                  padding-bottom: 5px;
                  text-align: left;
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
        }
      }
    }
    .someThingElse {
      .inside {
        width: 110%;
        margin-left: 120px;
        img {
          width: 90%;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  @media (min-width: 1200px) and (max-width: 1450px) {
    .notifsContainer {
      .notifsArea {
        width: 125%;
      }
    }
    .someThingElse {
      margin-left: 110px;
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
import help from '../components/Help'
import moment from 'moment'
export default {
  data() {
    return {
      postsNumber: [],
      userObject: '',
      requests: [],
      notifications: [],
      thereIsNotifications: false,
      foundNotifications: false,
      ChatSeen: true
    }
  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE TITLE OF NOTIFICATION PAGE
    document.title = 'Notifications | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // TO READ ALL NOTIFICATIONS WHEN OPENING THE PAGE
    this.readNotifications();

    // GET CURRENT USER DATA
    let currentUserInfo = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(currentUserInfo).get().then(doc => {
      this.userObject = doc.data();
    })
    // GET THE NUMBER OF USER'S POSTS
    firebase.firestore().collection('posts').get().then(docs => {
      docs.forEach(doc => {
        if(doc.data().user_id == firebase.auth().currentUser.uid) {
          this.postsNumber.push(doc.data())
        }
      })
    })
    // LISTENING FOR NEW NOTIFICATIONS TO SHOW ALERT
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let foundUnreadNotif = doc.data().notifications.find(notif => notif.seen == false)
      console.log(doc.data().notifications)
      if(foundUnreadNotif || doc.data().requests.length > 0) {
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
      if(doc.data().notifications.length > 0 || doc.data().requests.length > 0) {
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
  },
  methods: {
    // MAKE ALL NOTIFICATIONS SEEN = TRUE
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

    // ACCEPT FRIEND REQUEST
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
  },
  filters: {
    // TIME FORMAT
    fromNowFilterTime(time) {
      return moment(time).fromNow();
    }
  },
  components: {
    help
  }
}
</script>