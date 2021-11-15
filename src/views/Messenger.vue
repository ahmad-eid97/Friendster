<template>
  <div class="messenger">

  <!-- TO DELETE CHAT COMPONENT -->
    <deleteChat :chatid='chatid' :Chats='Chats' v-if="$store.state.deleteChat"></deleteChat>
    <chatInfo v-if="$store.state.openChatInfo"></chatInfo>
    <div class="row">
      <!-- CHAT ITEMS AREA (CHATS USER HAVE) IN LEFT SIDEBAR -->
      <div class="col-lg-3 main">
        <div class="chatItemsHead">
          <h4>Chats</h4>
          <input type="text" placeholder="Search for chat..">
          <i class="fas fa-cog"></i>
          <i class="fas fa-times"></i>
        </div>
        <div class="chatItems">
          <router-link tag="div" :to="`/messenger/${chat.chatId}`" class="chatItem" v-for="chat in Chats" :key="chat.chatId" :class="{active: chat.chatId == $route.params.chatId}">
            <img :src="chat.user.imgURL" alt="" :class="{seen: !chat.seen}">
            <div class="chatItemInfo">
              <h6>{{chat.user.nickname}}</h6>
              <p :class="{seen: !chat.seen}">
                <span style="color: #b1b1b1; font-weight: 500"
                v-if="chat.chatMessages[chat.chatMessages.length - 1].userId == userObject.user_id">You: </span>
                <span style="" 
                v-if="chat.chatMessages[chat.chatMessages.length - 1].chatImage != '' && chat.chatMessages[chat.chatMessages.length - 1].content == ''"> <i class="far fa-image"></i> sent a photo</span>
                {{chat.chatMessages.length > 0 ? chat.chatMessages[chat.chatMessages.length - 1].content.length > 25 ? chat.chatMessages[chat.chatMessages.length - 1].content.substring(0, 25) + '...' : chat.chatMessages[chat.chatMessages.length - 1].content : ''}}</p>
            </div>
            <p class="trash" @click="openDeleteChat(chat.chatId)"><i class="far fa-trash-alt"></i></p>
          </router-link>
        </div>
      </div>
      <div class="col-lg-6" v-if="openedChat">
        <div class="chatArea flex-container">

          <!-- CHAT AREA HEAD (USER INFO) -->
          <div class="chatAreaHead flex-element">
            <img :src="openedChat ? openedChat.user.imgURL : ''" alt="">
            <div class="chatAreaHeadInfo">
              <h6>{{openedChat ? openedChat.user.nickname : ''}}</h6>
              <p :class="{online: openedChat.status.state == 'Online', offline: openedChat.status.state == 'Offline'}"></p>
              <p v-if="openedChat.status.state == 'Offline'" class="text-muted">active {{openedChat.status.lastChanged | formatSentAt}}</p>
              <p v-if="openedChat.status.state == 'Online'">{{openedChat.status.state}}</p>
            </div>
            <i class="fas fa-bars" @click="showChatItems"></i>
            <i class="fas fa-info" @click="$store.state.openChatInfo = true"></i>
            <i class="fas fa-user" @click="router.push(`/profile/${openedChat.user.user_id}`)"></i>
            <router-link tag="i" class="fas fa-user" :to="`/profile/${openedChat.user.user_id}`"></router-link>
            <i class="fas fa-ellipsis-v"></i>
          </div>

          <!-- AREA FOR CHAT MESSAGES -->
          <div class="messages flex-element" id="messages" v-chat-scroll>
            <ul class='list-unstyled'>
              <li v-for="mess in openedChat.chatMessages" :key="mess.chatId" :class="{deleted: mess.deleteMsg[userObject.user_id] != false}">
                <div class="mess" id="smessage" :class="{myMessage: mess.userId == userObject.user_id}">
                  <img :src="openedChat.user.imgURL" alt="" class="chatImage">
                  <div class="smessage">
                    <p v-if="mess.content">{{mess.content}}</p>
                    <img :src="mess.chatImage" alt="" class="chatImg" v-if="mess.chatImage">
                    <img :src="openedChat.user.imgURL" alt="userImage" class="check" v-if="mess.msgId == openedChat.lastSeen[openedChat.user.user_id]">
                  </div>
                  <i class="fas fa-ellipsis-h" v-if="mess.userId == userObject.user_id" @click="show($event)"><span class="inside" @click="deleteMessage(mess.msgId)">Remove</span></i>
                  <p class="time">{{mess.sentAt | formatSentAt}}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- TYPE NEW MESSAGE AREA -->
          <div class="newMessage flex-element">
            <div class="imageReview hide" id="imageReview">
              <i class="fas fa-times cancelImage" @click="cancelSendingChatImage"></i>
              <img :src="chatImg" alt="">
              <div class="lds-dual-ring" v-if="!chatImg"></div>
            </div>
            <i class="fas fa-microphone"></i>
            <i class="fas fa-camera" @click="clicking"></i>
            <input type="file" style="display: none" @change="sendChatImage" id="chooseChatImage" accept="image/gif, image/jpeg, image/png">
            <textarea placeholder="Type your message.." 
              v-model="message" id="typeNewMessage" 
              contenteditable="true" @focus="focus"
              @keypress="typing"
            ></textarea>
            <i class="far fa-grin-alt" @click="showAndHideEmojis"></i>
            <vEmojiPicker class="selectEmoji" @select="selectEmoji" id="emojiPicker"/>
            <i class="fas fa-paper-plane" @click="sendMessage" id="sendNewMessage"></i>
          </div>

        </div>
      </div>

      <!-- WHAT CHAT USER OPENED -->
      <div class="col-lg-3" v-if="openedChat">
        <div class="chatProfile">
          <div class="chatProfileHead">
            <img :src="openedChat.user.imgURL" alt="">
            <h3>{{openedChat.user.nickname}}</h3>
          </div>
          <div class="links">
            <i class="fas fa-volume-mute"></i>
            <i class="fas fa-camera"></i>
            <i class="fas fa-cogs"></i>
          </div>
          <div class="chatProfileOptions">
            <div class="option">
              <div>
                <h6><span>{{openedChat ? openedChat.user.nickname.split(' ')[0] : ''}}'s</span> BIO</h6>
                <p>{{openedChat.user.bio ? openedChat.user.bio : 'no profile bio'}}</p>
              </div>
              <i class="fas fa-atlas"></i>
            </div>
            <div class="option">
              <div>
                <h6>Relationship</h6>
                <p>{{openedChat.user.relationship ? openedChat.user.relationship : 'not mentioned yet'}}</p>
              </div>
              <i class="fas fa-heart"></i>
            </div>
            <div class="option">
              <div>
                <h6>Lives In</h6>
                <p>{{openedChat.user.livesIn ? openedChat.user.livesIn : 'not mentioned yet'}}</p>
              </div>
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="option">
              <div>
                <h6>Phone</h6>
                <p>{{openedChat.user.phone ? openedChat.user.phone : 'not linked'}}</p>
              </div>
              <i class="fas fa-mobile-alt"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- LOADER -->
      <div class="col-lg-9 loading-area">
        <!-- put the loading page here -->
        <startChating v-if="!openedChat && Chats && $route.params.chatId == 'startChating'"></startChating>
        <div class="lds-dual-ring" v-if="!openedChat && $route.params.chatId !== 'startChating'"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE STYLING */
.messenger {
  background-color: #fff;
  height: 100%;

  /* CHAT ITEMS (CHATS USER HAVE) */
  .chatItemsHead {
    margin-top: 0px;
    padding-top: 30px;
    padding-bottom: 30px;
    position: fixed;
    width: 25%;
    background-color: #fff;
    border-right: 1px solid #ccc;
    height: 20%;
    h4 {
      text-align: left;
      margin-left: 35px;
    }
    input {
      width: 90%;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 20px;
      outline: none;
      padding-left: 15px;
      background-color: #f4f4f4;
      margin-left: 3px;
      margin-top: 15px;
    }
    i {
      position: absolute;
      top: 13%;
      right: 6%;
      font-size: 22px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background-color: #f4f4f4;
      border-radius: 50%;
      cursor: pointer;
      &.fa-times {
        display: none;
      }
      &:hover {
        background-color: $maincolor;
        color: #fff;
      }
    }
  }
  .chatItems {
    width: 25%;
    position: fixed;
    border-right: 1px solid #ccc;
    height: 80%;
    text-align: left;
    overflow-y: scroll;
    margin-top: 150px;
    background-color: #fff;
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
    .chatItem {
      display: flex;
      padding-left: 10px;
      margin-top: 0px;
      padding-bottom: 10px;
      margin-right: 3px;
      padding-top: 10px;
      border-radius: 0px 10px 10px 0px;
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: #f4f4f4;
        p.trash {
          display: inline-block;
        }
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        &.seen {
          border: 4px solid $secondcolor;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
      }
      .chatItemInfo {
        margin-top: 6px;
        h6 {
          margin-bottom: 0px;
          font-weight: 500;
          font-size: 18px;
        }
        p {
          color: rgb(177, 177, 177);
          font-size: 14px;
          &.seen {
            color: rgb(73, 72, 72);
            font-weight: 500;
          }
        }
      }
      &.active {
        background-color: #f0f0f0;
        border-left: 3px solid $maincolor;
        margin-left: 5px;
      }
      p.read {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fff;
        border: 2px solid $secondcolor;
        position: absolute;
        top: 10%;
        right: 2%;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
      p.trash {
        color: $textcolor;
        position: absolute;
        top: 30%;
        right: 5%;
        display: none;
        background-color: #fff;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        text-align: center;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        i.fa-trash-alt {
          line-height: 33px;
        }
        &:hover {
          color: #fff;
          background-color: $secondcolor;
        }
      }
    }
  }
  .col-lg-6 {
    padding: 0;
    transform: translateX(10px);
  }

  /* AREA IN THE MIDDLE OF PAGE */
  .chatArea {
    position: relative;
    height: calc(100vh - 5px);
    margin-top: -45px;
    flex-direction: column;
    flex-wrap: wrap;

    /* CHAT AREA HEAD FOR USER INFO */
    .chatAreaHead {
      display: flex;
      border-bottom: 1px solid #e2e2e2;
      width: 100%;
      padding: 80px 0 25px 20px;
      height: 125px;
      overflow: hidden;
      align-items: center;
      align-self: flex-start;
      img {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .chatAreaHeadInfo {
        text-align: left;
        margin-top: 3px;
        h6 {
          margin-bottom: 0;
          font-size: 17px;
          text-transform: capitalize;
        }
        p.online {
          width: 8px;
          height: 8px;
          background-color: #1CE589;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
        p.offline {
          background-color: #929191;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
        }
        p {
          margin-bottom: 0;
          display: inline-block;
          font-size: 13px;
        }
      }
      i {
        position: absolute;
        font-size: 22px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #f4f4f4;
        border-radius: 50%;
        cursor: pointer;
        color: rgb(80, 80, 80);
        font-size: 19px;
        &:hover {
          background-color: $maincolor;
          color: #fff;
        }
        &.fa-info {
          right: 15%;
        }
        &.fa-user {
          right: 9%;
        }
        &.fa-ellipsis-v {
          right: 3%;
        }
        &.fa-bars {
          display: none;
        }
      }
    }

    /* MESSAGES BETWEEN USERS */
    .messages {
      overflow-y: scroll;
      text-align: left;
      background-color: #f8f8f8;
      padding-right: 15px;
      padding-left: 5px;
      padding-bottom: 5px;
      overflow-x: hidden;
      height: calc(100% - 190px);
      &.imgRev {
        padding-bottom: 200px;
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
      ul {
        li {
          display: block;
          &.deleted {
            display: none;
          }
          .mess {
            margin-top: 10px;
            display: flex;
            width: 100%;
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin-right: 5px;
              margin-left: 5px;
              display: inline-block;
              align-self: flex-end;
            }
            .smessage {
              padding: 0;
              border-radius: 10px;
              box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.07);
            }
            img.chatImg {
              width: auto;
              height: auto;
              max-width: 450px;
              max-height: 450px;
              display: block;
              border-radius: 0;
              margin: 0;
              border-radius: 10px;
              background-color: #f8f8f8;
              padding: 3px;
              transform: scale(1.01);
            }
            div {
              background-color: rgb(236, 236, 236);
              padding: 10px;
              border-radius: 0 10px 10px 10px;
              max-width: 70%;
              display: inline-block;
              width: auto;
              p {
                margin: 0;
                // display: inline;
                padding: 10px;
              }
              img.check {
                display: none;
              }
            }
            i.fa-ellipsis-h {
              margin-left: 2%;
              color: #5f5f5f;
              background-color: rgb(235, 231, 231);
              width: 25px;
              height: 25px;
              line-height: 25px;
              border-radius: 50%;
              text-align: center;
              font-size: 13px;
              cursor: pointer;
              opacity: 0;
              position: relative;
              align-self: center;
              .inside {
                position: absolute;
                bottom: -130%;
                left: -70%;
                background-color: rgba(0, 0, 0, 0.8);
                padding: 2px 5px;
                border-radius: 5px;
                color: #fff;
                z-index: 9999999999999;
                display: none;
                &.show {
                  display: inline-block;
                }
              }
              &:hover {
                background-color: $secondcolor;
                color: #fff;
              }
            }
            p.time {
              display: inline-block;
              color: rgb(173, 173, 173);
              font-size: 13px;
              margin-left: 2%;
              opacity: 0;
              position: relative;
              margin-bottom: 0;
              width: auto;
              align-self: center;
            }
            &.myMessage {
              display: flex;
              flex-flow: row;
              align-items: center;
              img.chatImage {
                display: none;
              }
              div.smessage {
                background-color: $maincolor;
                color: #fff;
                border-radius: 10px 10px 10px 10px;
                order: 4;
                flex: 0 0 auto;
                max-width: 70%;
                position: relative;
                padding: 0 !important;
                img.check {
                  position: absolute;
                  background-color: $secondcolor;
                  font-size: 6px;
                  border-radius: 50%;
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  line-height: 15px;
                  bottom: -8px;
                  right: -10px;
                  display: inline-block;
                  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
                }

              }
              p.time {
                color: rgb(173, 173, 173);
                font-size: 13px;
                text-align: left;
                order: 2;
                margin-right: 1%;
                flex: 1 1 auto;
                text-align: right;
                opacity: 0;
                width: 100px;
                display: inline-block;
                margin-bottom: 0;
              }
              i.fa-ellipsis-h {
                order: 3;
                margin-right: 2%;
              }
            }
            &:hover {
              p.time {
                opacity: 1;
              }
              i.fa-ellipsis-h {
                opacity: 1;
              }
            }
          }
        }
      }
    }

    /* TYPE NEW MESSAGE AREA */
    .newMessage {
      position: relative;
      z-index: 9999999999999999;
      background-color: #fff;
      padding-top: 10px;
      width: 100%;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px 5px 0 0;
      height: 60px;
      align-self: flex-end;
      .imageReview {
        margin-top: 15px;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        width: 30%;
        margin-left: 35%;
        border-radius: 10px;
        position: absolute;
        top: -350%;
        width: 200px;
        height: 180px;
        text-align: center;
        display: flex;
        align-content: center;
        align-items: center;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        .cancelImage {
          position: absolute;
          top: -5%;
          right: -5%;
          background-color: rgba(0, 0, 0, 0.8);
          width: 25px;
          height: 25px;
          font-size: 13px;
          line-height: 25px;
          border-radius: 20%;
        }
        i.fa-times {
          color: #fff;
        }
        img {
          width: auto;
          height: auto;
          max-width: 150px;
          max-height: 150px;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          margin: auto;
        }
        .lds-dual-ring {
          display: inline-block;
          width: 150px;
          height: 150px;
          z-index: 9999999;
          position: absolute;
          top: 35%;
          left: 37%;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 35px;
          height: 35px;
          margin: 8px;
          border-radius: 50%;
          border: 3px solid $textcolor;
          border-color: #868686 transparent #ccc transparent;
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
        &.hide {
          display: none;
        }
      }
      i {
        font-size: 22px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: #f4f4f4;
        color: #454545;
        border-radius: 8px;
        cursor: pointer;
        color: rgb(80, 80, 80);
        font-size: 19px;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        position: relative;
        top: -3px;
        &.fa-microphone {
          margin-left: 0px;
          margin-right: 5px;
        }
        &.fa-camera {
          margin-right: 10px;
        }
        &.fa-paper-plane {
          top: 0;
          margin-left: 10px;
          font-size: 23px;
          width: 43px;
          height: 43px;
          line-height: 45px;
          padding-right: 3px;
          background-color: $maincolor;
          color: #fff;
          border: none;
          margin-bottom: 1px;
        }
        &:hover {
          background-color: $secondcolor;
          color: #fff;
          border: none;
        }
      }
      textarea {
        width: 75%;
        height: 45px;
        border-radius: 10px;
        border: none;
        background-color: #f4f4f4;
        outline: none;
        padding-left: 12px;
        padding-right: 40px;
        font-size: 17px;
        border: 1px solid #ccc;
        line-height: 37px;
        margin-bottom: -13px;
        resize: none;
      }
      i.fa-grin-alt {
        background-color: transparent;
        color: rgb(138, 136, 136);
        position: absolute;
        top: 22%;
        right: 11%;
        font-size: 25px;
        border: none;
        box-shadow: none;
        &:hover {
          color: $secondcolor;
          background-color: transparent;
        }
      }
      .selectEmoji {
        position: absolute;
        bottom: 60px;
        right: 50px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        padding-bottom: 5px;
        background-color: #f4f4f4;
        display: none;
        &.show {
          display: block;
        }
      }
    }
  }

  /* CHAT PROFILE IN THE RIGHT SIDE OF PAGE */
  .chatProfile {
    width: 23.5%;
    position: fixed;
    border-left: 1px solid #ccc;
    height: 100%;
    padding-bottom: 40px;
    overflow: scroll;
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
    .chatProfileHead {
      padding-top: 50px;
      padding-bottom: 20px;
      background-color: #eeeded;
      border-bottom: 1px solid rgb(231, 231, 231);
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
      h3 {
        margin-top: 10px;
        font-weight: bold;
        font-size: 22px;
        text-transform: capitalize;
      }
    }
    .links {
      margin-top: 30px;
      i {
        width: 42px;
        height: 42px;
        line-height: 42px;
        background-color: #f4f4f4;
        border-radius: 50%;
        cursor: pointer;
        color: rgb(80, 80, 80);
        font-size: 19px;
        margin: 2px 7px; 
        &:hover {
          background-color: $maincolor;
          color: #fff;
        }
      }
    }
    .chatProfileOptions {
      margin-top: 30px;
      text-align: left;
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      .option {
        border: 1px solid #dadada;
        padding: 15px 6% 15px 20px;
        border-radius: 15px;
        margin-bottom: 15px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        h6 {
          margin-bottom: 0;
          font-size: 16px;
        }
        p {
          margin-bottom: 0;
          color: $textcolor;
          font-size: 14px;
        }
        i {
          font-size: 19px;
          color: $textcolor;
        }
      }
    }
  }

  /* LOADER */
  .loading-area {
    width: 100%;
    height: 100%;
    .lds-dual-ring {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin-top: 25%;
      position: relative;
      z-index: 999999999999999999;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 58px;
      height: 58px;
      margin: 8px;
      border-radius: 50%;
      border: 5px solid $maincolor;
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

  /* MOBILE SCREEN VIEW */
  @include mb {
    .main {
      margin-left: -275px;
      transition: all 0.2s ease-in-out;
    }
    .chatItemsHead {
      z-index: 9;
      transition: all 0.2s ease-in-out;
      padding-top: 30px; 
      padding-bottom: 20px;
      border-right: 1px solid rgb(238, 238, 238);
      h4 {
        margin-left: 25px;
        font-size: 19px;
      }
      input {
        width: 90%;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 20px;
        outline: none;
        padding-left: 15px;
        margin-left: 5px;
        margin-top: 15px;
        font-size: 12px;
      }
      i {
        position: absolute;
        top: 20%;
        right: 22%;
        font-size: 16px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        &.fa-times {
          display: inline-block;
          right: 5%;
        }
      }
    }
    .chatItems {
      z-index: 9;
      height: 81%;
      border-bottom: 1px solid #ccc;
      transition: all 0.2s ease-in-out;
      margin-top: 125px;
      border-right: 1px solid rgb(238, 238, 238);
      .chatItem {
        padding-left: 10px;
        margin-top: 0px;
        padding-bottom: 0px;
        padding-top: 8px;
        img {
          width: 45px;
          height: 45px;
        }
        .chatItemInfo {
          margin-top: 3px;
          h6 {
            font-size: 14px;
          }
          p {
            font-size: 10px;
          }
        }
        p.trash {
          width: 25px;
          height: 25px;
          font-size: 12px;
          i.fa-trash-alt {
            line-height: 25px;
          }
        }
      }
    }
    .chatArea {
      position: relative;
      height: calc(100vh - 5px);
      .chatAreaHead {
        display: flex;
        border-bottom: 1px solid #e2e2e2;
        width: 100%;
        padding: 72px 0 20px 10px;
        z-index: 999;
        height: 115px;
        margin-left: 10px;
        img {
          width: 40px;
          height: 40px;
        }
        .chatAreaHeadInfo {
          margin-top: 5px;
          h6 {
            margin-bottom: 0;
            font-size: 13px;
            margin-bottom: -3px;
          }
          p.online {
            width: 7px;
            height: 7px;
            margin-right: 3px;
          }
          p.offline {
            width: 7px;
            height: 7px;
            margin-right: 3px;
          }
          p {
            font-size: 10px;
            color: $textcolor;
            position: relative;
            top: -2px;
          }
        }
        i {
          position: absolute;
          font-size: 14px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          &.fa-info {
            right: 100px;
          }
          &.fa-user {
            right: 65px;
          }
          &.fa-ellipsis-v {
            right: 30px;
          }
          &.fa-bars {
            display: inline-block;
            position: absolute;
            right: 135px;
          }
        }
      }
      .messages {
        padding-left: 10px;
        padding-right: 30px;
        height: calc(100% - 165px);
        padding-bottom: 0;
        ul {
          li {
            font-size: 11px;
            .mess {
              img.chatImg {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 250px;
                padding: 0;
              }
              i.fa-ellipsis-h {
                margin-left: 2%;
                color: #5f5f5f;
                background-color: rgb(235, 231, 231);
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 50%;
                text-align: center;
                font-size: 10px;
                cursor: pointer;
                opacity: 0;
                position: relative;
                .inside {
                  position: absolute;
                  bottom: -130%;
                  left: -70%;
                  background-color: rgba(0, 0, 0, 0.8);
                  padding: 2px 5px;
                  &.show {
                    display: inline-block;
                  }
                }
                &:hover {
                  background-color: $secondcolor;
                  color: #fff;
                }
              }
              p.time {
                font-size: 10px;
              }
              &.myMessage {
                p.time {
                  font-size: 10px;
                }
                div.smessage {
                  img.check {
                    width: 16px;
                    height: 16px;
                  }
                }
              }
            }
          }
        }
      }
      .newMessage {
        width: 100%;
        margin-left: -10px;
        z-index: 99999;
        background-color: #fff;
        height: 50px;
        .imageReview {
          padding: 15px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 20%;
          margin-left: 30%;
          border-radius: 10px;
          position: absolute;
          top: -380%;
          width: 170px;
          height: 150px;
          text-align: center;
          display: flex;
          align-content: center;
          align-items: center;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
          .cancelImage {
            position: absolute;
            top: -5%;
            right: -5%;
            background-color: rgba(0, 0, 0, 0.8);
            width: 20px;
            height: 20px;
            font-size: 11px;
            line-height: 20px;
            border-radius: 20%;
          }
          i.fa-times {
            color: #fff;
          }
          img {
            width: auto;
            height: auto;
            max-width: 120px;
            max-height: 120px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            margin: auto;
          }
          .lds-dual-ring {
            display: inline-block;
            width: 150px;
            height: 150px;
            z-index: 9999999;
            position: absolute;
            top: 35%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 35px;
            height: 35px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        i {
          font-size: 14px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          position: relative;
          top: 1px;
          &.fa-microphone {
            margin-left: 0px;
            margin-right: 5px;
          }
          &.fa-camera {
            margin-right: 5px;
          }
          &.fa-paper-plane {
            margin-left: 5px;
            font-size: 15px;
            width: 33px;
            height: 33px;
            line-height: 33px;
            padding-right: 3px;
          }
        }
        textarea {
          width: 60%;
          height: 35px;
          padding-left: 5px;
          font-size: 12px;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          line-height: 33px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 25%;
          right: 18%;
          font-size: 17px;
        }
        .selectEmoji {
          position: absolute;
          bottom: -20px;
          right: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          transform: scale(0.7);
          display: none;
          &.show {
            display: block;
          }
        }
      }
    }
    .chatProfile {
      display: none;
    }
    .loading-area {
      width: 100%;
      height: 100%;
      .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin-top: 60%;
        margin-left: 10%;
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

  /* SMALL SCREEN VIEW */
  @include sm {
    .chatItemsHead {
      display: none;
    }
    .chatItems {
      z-index: 9;
      height: 95%;
      border-bottom: 1px solid #ccc;
      transition: all 0.2s ease-in-out;
      margin-top: 0px;
      padding-top: 20px;
      width: 100px;
      .chatItem {
        padding-left: 10px;
        padding-bottom: 7px;
        padding-top: 7px;
        img {
          width: 65px;
          height: 65px;
        }
        .chatItemInfo {
          display: none;
        }
        p.trash {
          width: 27px;
          height: 27px;
          font-size: 14px;
          top: 0;
          right: 0;
          i.fa-trash-alt {
            line-height: 29px;
          }
        }
        &.active {
          margin-left: 2px;
        }
      }
    }
    .chatArea {
      position: relative;
      height: calc(100vh - 5px);
      .chatAreaHead {
        display: flex;
        border-bottom: 1px solid #e2e2e2;
        width: 100%;
        padding: 80px 0 25px 20px;
        height: 125px;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
          margin-left: 100px;
        }
        .chatAreaHeadInfo {
          text-align: left;
          margin-top: 3px;
          h6 {
            margin-bottom: 0;
            font-size: 16px;
          }
          p.online {
            width: 8px;
            height: 8px;
            background-color: #1CE589;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          p {
            margin-bottom: 0;
            display: inline-block;
            font-size: 12px;
            position: relative;
            top: -2px;
          }
        }
        i {
          position: absolute;
          font-size: 22px;
          width: 37px;
          height: 37px;
          line-height: 37px;
          background-color: #f4f4f4;
          border-radius: 50%;
          cursor: pointer;
          color: rgb(80, 80, 80);
          font-size: 16px;
          &:hover {
            background-color: $maincolor;
            color: #fff;
          }
          &.fa-info {
            right: 15%;
          }
          &.fa-user {
            right: 10%;
          }
          &.fa-ellipsis-v {
            right: 5%;
          }
          &.fa-bars {
            display: none;
          }
        }
      }
      .messages {
        height: calc(100% - 185px);
        overflow-y: scroll;
        text-align: left;
        padding-left: 110px;
        padding-right: 30px;
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
        ul {
          li {
            font-size: 14px;
          }
        }
      }
      .newMessage {
        bottom: 0;
        padding-top: 8px;
        margin-left: 5%;
        height: 60px;
        .imageReview {
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 30%;
          margin-left: 35%;
          margin-bottom: 2%;
          border-radius: 10px;
          position: absolute;
          top: -350%;
          width: 200px;
          height: 180px;
          text-align: center;
          display: flex;
          align-content: center;
          align-items: center;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
          .cancelImage {
            position: absolute;
            top: -5%;
            right: -5%;
            background-color: rgba(0, 0, 0, 0.8);
            width: 25px;
            height: 25px;
            font-size: 13px;
            line-height: 25px;
            border-radius: 20%;
          }
          img {
            width: auto;
            height: auto;
            max-width: 150px;
            max-height: 150px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            margin: auto;
          }
          .lds-dual-ring {
            display: inline-block;
            width: 150px;
            height: 150px;
            z-index: 9999999;
            position: absolute;
            top: 35%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 35px;
            height: 35px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        i {
          font-size: 22px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          background-color: #f4f4f4;
          border-radius: 8px;
          cursor: pointer;
          color: rgb(80, 80, 80);
          font-size: 19px;
          color: #454545;
          position: relative;
          top: -2px;
          &.fa-microphone {
            margin-left: 0px;
            margin-right: 5px;
          }
          &.fa-camera {
            margin-right: 5px;
          }
          &.fa-paper-plane {
            margin-left: 5px;
            font-size: 23px;
            width: 45px;
            height: 45px;
            line-height: 45px;
            padding-right: 3px;
          }
        }
        textarea {
          width: 66%;
          height: 45px;
          border-radius: 10px;
          border: none;
          background-color: #f4f4f4;
          outline: none;
          padding-left: 12px;
          padding-right: 40px;
          font-size: 17px;
          border: 1px solid #ccc;
          line-height: 37px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 22%;
          right: 16%;
          font-size: 25px;
        }
        .selectEmoji {
          position: absolute;
          right: 100px;
          bottom: 45px;
          transform: scale(0.9);
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          &.show {
            display: block;
          }
        }
      }
    }
    .chatProfile {
      display: none;
    }
    .loading-area {
      width: 100%;
      height: 100%;
      .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin-top: 30%;
        margin-left: 10%;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 54px;
        height: 54px;
        margin: 8px;
        border-radius: 50%;
        border: 5px solid $maincolor;
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

  /* MEDIUM SCREEN VIEW */
  @include md {
    .chatItemsHead {
      margin-top: 0px;
      padding-top: 30px;
      padding-bottom: 20px;
      position: fixed;
      width: 25%;
      background-color: #fff;
      border-right: 1px solid #ccc;
      height: 20%;
      h4 {
        font-size: 22px;
        margin-left: 30px;
      }
      input {
        width: 90%;
        height: 30px;
        margin-left: 5px;
        font-size: 13px;
      }
      i {
        position: absolute;
        top: 15%;
        right: 6%;
        font-size: 17px;
        width: 35px;
        height: 35px;
        line-height: 35px;
      }
    }
    .chatItems {
      margin-top: 130px;
      height: 81%;
      .chatItem {
        display: flex;
        padding-left: 10px;
        margin-top: 0px;
        padding-bottom: 1px;
        padding-top: 10px;
        cursor: pointer;
        &:hover {
          background-color: #f4f4f4;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .chatItemInfo {
          margin-top: 4px;
          h6 {
            margin-bottom: 0px;
            font-weight: 500;
            font-size: 16px;
          }
          p {
            color: rgb(177, 177, 177);
            font-size: 11px;
          }
        }
        p.trash {
          width: 27px;
          height: 27px;
          font-size: 12px;
          right: 2%;
          top: 8%;
          i.fa-trash-alt {
            line-height: 27px;
          }
        }
      }
    }
    .col-lg-6 {
      padding: 0;
      transform: translateX(10px);
    }
    .chatArea {
      .chatAreaHead {
        img {
          width: 45px;
          height: 45px;
        }
        .chatAreaHeadInfo {
          h6 {
            font-size: 15px;
          }
          p.online {
            width: 8px;
            height: 8px;
            background-color: #1CE589;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          p.offline {
            background-color: #929191;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
          }
          p {
            position: relative;
            font-size: 12px;
            color: $textcolor;
            top: -3px;
          }
        }
        i {
          width: 35px;
          height: 35px;
          font-size: 15px;
          line-height: 35px;
          &.fa-info {
            right: 17%;
          }
          &.fa-user {
            right: 10%;
          }
          &.fa-ellipsis-v {
            right: 3%;
          }
          &.fa-bars {
            display: none;
          }
        }
      }
      .messages {
        height: calc(100% - 185px);
        overflow-y: scroll;
        text-align: left;
        padding-left: 5px;
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
        ul {
          li {
            font-size: 14px;
            .mess {
              img.chatImg {
                width: auto;
                height: auto;
                max-width: 350px;
                max-height: 350px;
                display: block;
                border-radius: 0;
                margin: 0;
                border-radius: 10px;
              }
              i.fa-ellipsis-h {
                font-size: 11px;
              }
            }
          }
        }
      }
      .newMessage {
        padding-top: 8px;
        height: 55px;
        .imageReview {
          margin-top: 20px;
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 30%;
          margin-left: 35%;
          border-radius: 10px;
          position: absolute;
          top: -410%;
          width: 200px;
          height: 180px;
          text-align: center;
          display: flex;
          align-content: center;
          align-items: center;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
          .cancelImage {
            position: absolute;
            top: -5%;
            right: -5%;
            background-color: rgba(0, 0, 0, 0.8);
            width: 22px;
            height: 22px;
            font-size: 12px !important;
            line-height: 22px;
            border-radius: 20%;
          }
          img {
            width: auto;
            height: auto;
            max-width: 150px;
            max-height: 150px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            margin: auto;
          }
          .lds-dual-ring {
            display: inline-block;
            width: 150px;
            height: 150px;
            z-index: 9999999;
            position: absolute;
            top: 35%;
            left: 37%;
          }
          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 35px;
            height: 35px;
            margin: 8px;
            border-radius: 50%;
            border: 3px solid $textcolor;
            border-color: #868686 transparent #ccc transparent;
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
          &.hide {
            display: none;
          }
        }
        i {
          font-size: 17px !important;
          width: 35px;
          height: 35px;
          line-height: 35px;
          position: relative;
          top: 1px;
          &.fa-microphone {
            margin-left: 0px;
            margin-right: 5px;
          }
          &.fa-camera {
            margin-right: 5px;
          }
          &.fa-paper-plane {
            margin-left: 5px;
            font-size: 20px !important;
            width: 40px;
            height: 40px;
            line-height: 40px;
            padding-right: 3px;
          }
        }
        textarea {
          width: 75%;
          height: 40px;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 12px;
          padding-right: 50px;
          font-size: 16px;
          line-height: 37px;
          margin-bottom: -13px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(138, 136, 136);
          position: absolute;
          top: 22%;
          right: 10%;
          font-size: 20px !important;
          &:hover {
            color: $secondcolor;
            background-color: transparent;
          }
        }
        .selectEmoji {
          position: absolute;
          width: 50%;
          bottom: 50px;
          right: 40px;
          transform: scale(0.95);
          &.show {
            display: block;
          }
        }
      }
    }
    .chatProfile {
      width: 22.5%;
      position: fixed;
      border-left: 1px solid #ccc;
      height: 100%;
      .chatProfileHead {
        padding-top: 50px;
        padding-bottom: 20px;
        background-color: #fafafa;
        border-bottom: 1px solid rgb(231, 231, 231);
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        h3 {
          margin-top: 10px;
          font-size: 20px;
        }
      }
      .links {
        margin-top: 20px;
        i {
          width: 38px;
          height: 38px;
          line-height: 38px;
          background-color: #f4f4f4;
          border-radius: 50%;
          cursor: pointer;
          color: rgb(80, 80, 80);
          font-size: 19px;
          margin: 2px 7px; 
          &:hover {
            background-color: $maincolor;
            color: #fff;
          }
        }
      }
      .chatProfileOptions {
        margin-top: 30px;
        text-align: left;
        margin-left: 10px;
        margin-right: 8px;
        .option {
          border: 1px solid #dadada;
          margin-bottom: 10px;
          padding: 8px 10px 8px 10px;
          h6 {
            margin-bottom: 0;
            font-size: 14px;
          }
          p {
            margin-bottom: 0;
            color: $textcolor;
            font-size: 11px;
          }
        }
      }
    }
    .loading-area {
      width: 100%;
      height: 100%;
      .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin-top: 35%;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 54px;
        height: 54px;
        margin: 8px;
        border-radius: 50%;
        border: 5px solid $maincolor;
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
</style>

<script>
import firebase from 'firebase';
import admin from 'firebase';
import deleteChat from '../components/DeleteChat'
import chatInfo from '../components/ChatsInfo'
import startChating from '../components/startChating'
import moment from 'moment'
import $ from 'jquery'
import vEmojiPicker from 'v-emoji-picker'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      chats: [],
      chatId: '',
      users: '',
      chatMessages: [],
      senderData: '',
      userObject: '',
      message: '',
      openedChat: false,
      senderId: '',
      chatid: '',
      chatImg: '',
      imageName: ''
    }
  },
  methods: {
    // SHOW REMOVE MESSAGE
    show(e) {
      e.target.children[0].classList.toggle('show') // it is always 'e.target' not just 'e' you idiot hh
    },

    // SEND MESSAGE
    async sendMessage() {
      if(this.message || this.chatImg) {
        const msgId = Math.floor(Math.random() * 10000000000)
        const doc = await firebase.firestore().collection('chats').doc(this.$route.params.chatId).get()
        let deleteMsg = {};
        deleteMsg[firebase.auth().currentUser.uid] = false;
        deleteMsg[this.openedChat.user.user_id] = false
        firebase.firestore().collection('chats').doc(this.$route.params.chatId).update({
          messages: admin.firestore.FieldValue.arrayUnion({
            chatImage: this.chatImg,
            content: this.message,
            userId: firebase.auth().currentUser.uid,
            msgId,
            sentAt: Date.now(),
            deleteMsg
          }),
          lastSeen: {
            ...doc.data().lastSeen,
            [firebase.auth().currentUser.uid]: msgId
          },
          lastUpdated: Date.now(),
          deleted: {
            [this.openedChat.user.user_id]: false,
            [firebase.auth().currentUser.uid]: false
          }
        })
        this.message = '';
        this.chatImg = '';
        document.getElementById('imageReview').classList.add('hide');
        document.getElementById('messages').classList.remove('imgRev');
        document.getElementById('emojiPicker').classList.remove('show')
        document.getElementById('sendNewMessage').focus();
      } else {
        console.log('you must type a message or send a photo to submit this message')
      }
      
    },

    // SEND IMAGE TO CHAT
    sendChatImage(e) {
      document.getElementById('typeNewMessage').focus();
      document.getElementById('imageReview').classList.remove('hide');
      let test = document.getElementById('messages')
      test.classList.add('imgRev');
      test.scrollTop = test.scrollHeight
      var image = e.target.files[0];
      var uploadChatImage = firebase.storage().ref('chatImages/' + image.name).put(image);
      uploadChatImage.then(res => {
        if(res.state == 'success') {
          let imageName = (+new Date()) + '-' + image.name
          firebase.storage().ref('chatImages/' + image.name).getDownloadURL().then(URL => {
            this.chatImg = URL;
            this.imageName = imageName
            document.getElementById('chooseChatImage').value = ''
            
          })
        }
      })
      console.log('clicked')
    },

    // CLICK FOR INPUT FILE 
    clicking() {
      document.getElementById('chooseChatImage').click();
    },

    // FUNC FOR DELETING MESSAGE
    deleteMessage(msgId) {
      firebase.firestore().collection('chats').doc(this.$route.params.chatId).get().then(doc => {
        const messages = doc.data().messages;
        firebase.firestore().collection('chats').doc(this.$route.params.chatId).update({
          messages: messages.filter(msg => msg.msgId !== msgId)
        })
      })
    },

    // OPN DELETE CHAT COMPONENT
    openDeleteChat(chatid) {
      this.$store.state.deleteChat = true;
      this.chatid = chatid;
    },

    /* هنا هنلغي بردو الصوره اللي اخترناها علشان متتخزنش ف الداتابيز واحنا اصلا مبعتناهاش . علشان الفانكشن اللي بتبعت الصوره بتبعتها لما تختارها مش لما تبعتها ف الشات */
    cancelSendingChatImage() {
      document.getElementById('imageReview').classList.add('hide');
      document.getElementById('messages').classList.remove('imgRev');
      document.getElementById('chooseChatImage').value = ''
      firebase.storage().ref('chatImages/' + this.imageName).delete();
      this.chatImg = '';
      this.imageName = '';
    },

    // SELECT EMOJIS 
    selectEmoji(emoji) {
      var ourTextArea = document.getElementById('typeNewMessage');
      var emojis = emoji.data
      ourTextArea.value += emojis
      this.message = ourTextArea.value
      // this.message = emoji.data
      console.log(emoji)
    },

    // CLICK TO SHOW AND HIDE EMOJIS
    showAndHideEmojis() {
      document.getElementById('emojiPicker').classList.toggle('show')
    },

    // FOCUS ON INPUT FIELDS TO WRITE NEW MESSAGE 
    focus() {
      document.getElementById('emojiPicker').classList.remove('show')
    },

    // SHOW CHAT ITEMS IN SMALL AND MOBILE SCREENS
    showChatItems() {
      document.querySelector('.chatItemsHead').style.width = '250px'
      document.querySelector('.chatItems').style.width = '250px'
      document.querySelector('.main').style.marginLeft = 0
    },

    // SEND MESSAGES ON CLICKING ENTER BUTTON NOT ON JUST CLICK THE BUTTON ON THE PAGE 
    typing(event) {
      if(event.keyCode === 13) {
        event.preventDefault();
        this.sendMessage();
      }
    },

    // ON PAGE LOADED FOCUS ON SEND MESSAGE INPUT
    onload() {
      document.getElementById('sendNewMessage').focus();
    },

    /* الصور ف الشات مكانتش بتظهر بسرعه فمكانتش واخده العرض والطول بتوعها وعلشان كده اول ما تفتح الصفحه 
    هتلاقي السكرول منزلش لتحت خالص علشان الصور لسه مظهرتش بحجمها الحقيقي 
    علشان كده عملنا الفانكشن دي . 2 ثانيه تنزل الشات لتحت اوتوماتيك علشان يفضل علي طول لتحت حتي لو الصوره مخدتش حجمها لسه 
    وبنشغلها ف الكريتيد هوك علشان تشتغل من اول ما الصفحه تتحمل  */
    updateScroll(){
      var element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    }

  },
  mounted() {
    // JQUERY FUNCTIONS TO SHOW AND HIDE SIDEBAR OF CHAT ITEMS IN SMALL AND MOBILE SCREENS
    $('.fa-bars').on('click', function() {
      $('.chatItemsHead, .chatItems').css({
        width: '250px'
      })
      $('.main').css({
        marginLeft: 0
      })
    });

    $('.chatItemsHead i.fa-times').on('click', function() {
      $('.chatItemsHead, .chatItems').css({
        width: '0px'
      }) 
      $('.main').css({
        marginLeft: '-275px'
      })
    });
  },
  watch: {
    // WATCH FOR NEW CHAT WHEN USER SELCT ANOTHER CHAT FROM CHAT ITEMS SIDEBAR
    async '$route' (to) {
      const getID = path => {
        var sp = path.split('/')
        return sp[sp.length - 1]
      }
      let ChatID = getID(to.path);

      const chat = this.Chats.find(cht => cht.chatId == ChatID)
      this.openedChat = chat

      const document = await firebase.firestore().collection('chats').doc(this.$route.params.chatId).get()
          
      firebase.firestore().collection('chats').doc(this.$route.params.chatId).update({
        lastSeen: {
          ...document.data().lastSeen,
          [firebase.auth().currentUser.uid]: document.data().messages[document.data().messages.length - 1].msgId
        }
      })
    }
  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // MESSENGER PAGE TITLE
    document.title = 'Messenger | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.userObject = doc.data();
    })

    // CHATS DETAILS
    firebase.firestore().collection('chats').orderBy('lastUpdated', 'desc').where('type', '==', 'CHAT').onSnapshot(docs => {
      var I = 0;
      var End = docs.docChanges().length;
      docs.docChanges().forEach(async (DOC) => {

        if(DOC.doc.data().users.find(user => user == firebase.auth().currentUser.uid)) {

          let senderId = DOC.doc.data().users.find(user => user !== firebase.auth().currentUser.uid)

          let userdoc = await firebase.firestore().collection('users').doc(senderId).get()
            var CHAT = {
              user: userdoc.data(),
              chatMessages: DOC.doc.data().messages,
              chatId: DOC.doc.data().chatId,
              lastSeen: DOC.doc.data().lastSeen,
              lastUpdated: DOC.doc.data().lastUpdated,
              seen: true,
              status: userdoc.data().status,
              deleted: DOC.doc.data().deleted
            }

            if (CHAT.lastSeen[firebase.auth().currentUser.uid] != CHAT.chatMessages[CHAT.chatMessages.length - 1].msgId) {
              CHAT.seen = false
            }
            
            if (this.chats.length > 0) {
              var shouldBeUpdatedChat = this.chats.findIndex(ct => ct.chatId == DOC.doc.data().chatId)
              // if exists
              if (shouldBeUpdatedChat != -1){
                // shouldBeUpdatedChat == index of the chat (if this chat doesn't exists it equals -1)
                if (DOC.type == 'modified' && this.chats[shouldBeUpdatedChat].chatMessages.length < CHAT.chatMessages.length) {
                  this.chats.splice(shouldBeUpdatedChat, 1)
                  this.chats.unshift(CHAT)
                } else {
                  this.chats[shouldBeUpdatedChat] = CHAT;
                  this.Chats[shouldBeUpdatedChat] = CHAT;
                }

                if (this.openedChat.chatId == CHAT.chatId) {
                  this.openedChat = CHAT
                  this.ChatMessages = this.openedChat.chatMessages
                }
              } else {
                this.chats.push(CHAT)
              }
            } else {
              this.chats.push(CHAT)
            }

            I++;
            if (I >= End) {
              const currentCHAT = this.chats.find(cht => cht.chatId == this.$route.params.chatId)
              this.openedChat = currentCHAT
            }

            setTimeout(this.updateScroll, 1000);
            // this.$store.state.firstChatRoomId = this.Chats[0].chatId
        }

        if(DOC.doc.data().chatId === this.$route.params.chatId) {
          this.openedChat = this.Chats.find(chat => chat.chatId == this.$route.params.chatId)
          const document = await firebase.firestore().collection('chats').doc(this.$route.params.chatId).get()
          firebase.firestore().collection('chats').doc(this.$route.params.chatId).update({
            lastSeen: {
              ...document.data().lastSeen,
              [firebase.auth().currentUser.uid]: document.data().messages[document.data().messages.length - 1].msgId
            }
          })
        }
      })
    })
  },
  computed: {
    // GET CHATS FROM 'VUEX'
    Chats() {
      return this.chats.filter(chat => {
        return chat.deleted[firebase.auth().currentUser.uid] != true
      })
    }
  },
  components: {
    deleteChat,
    startChating,
    vEmojiPicker,
    chatInfo
  },
  filters: {
    // TIME FORMAT
    formatSentAt (time) {
      return moment(time).fromNow()
    }
  }
  // chats details
}
</script>