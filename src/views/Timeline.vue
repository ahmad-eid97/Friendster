<template>
  <div class="Timeline">
    <div class="row">

      <!-- LEFT SIDEBAR FOR LINKS AND PAGES -->
      <div class="col-lg-3 profileInfoSectionMain">
        <div class="profileInfoSection">
          <div class="imageP">
            <img :src="userObject.imgURL" alt="" v-if="userObject.imgURL">
            <p class="online"></p>
          </div>
          <h6>{{userObject.nickname}}</h6>
          <!-- USER INFO PART -->
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
            <!-- LINKS FOR PAGES PART -->
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
                <li @click="$store.state.openHelpTimeline = true"><img src="../assets/icons/help.svg" alt=""> Help</li>
                <hr>
                <li @click="$router.push({path: '/settings'})"><img src="../assets/icons/helm.svg" alt=""> Settings</li>
              </ul>
          </div>
        </div>
      </div>

      <!-- AREA FOR TIMELINE POSTS -->
      <div class="col-lg-6 col-md-8 postsArea">
        <div class="container">

          <!-- TYPE NEW POST DIV -->
          <div class="newPost">
            <div class="head">
              <p>Create New Post</p>
            </div>
            <div class="create">
              <img :src="userObject.imgURL" alt="" v-if="userObject.imgURL">
              <textarea placeholder="write your post..." id="newPost" v-model="newpost.postContent" @focus="focus1"></textarea>
              <i class="far fa-grin-alt" @click="showAndHideEmojis"></i>
              <vEmojiPicker class="selectEmoji" @select="selectEmoji" id="emojiPicker"/>
            </div>
            <!-- REVIEWING IMAGE BEFORE UPLOADING -->
            <div class="reviewPostImage" id="reviewPostImage">
              <h6>file review</h6>
              <div class="poImg">
                <img :src="newpost.postImg" alt="">
                <div class="lds-dual-ring" v-if="!newpost.postImg"></div>
              </div>
            </div>
            <hr>
            <div class="buttons">
              <button @click="clicking"><i class="fas fa-camera"></i> Media</button>
              <input type="file" @change="postImage" style="display: none" ref="uploadPostImage">
              <button class="post" @click="userPost">Post</button>
            </div>
          </div>
        </div>

        <!-- POSTS AREA -->
        <div class="container">

          <!-- DIV IF THERE IS NO POSTS YET -->
          <div class="noPosts" v-if="posts.length <= 0 && dataRendered">
            <img src="../assets/noPosts.svg" alt="">
            <p>Hey <span>{{userObject.nickname.split(' ')[0]}}</span>! there is no posts yet, post the first one!</p>
          </div>
          
          <!-- LOADER -->
          <div class="lds-dual-ring" v-if="!dataRendered"></div>

          <!-- TIMELINE EXISTS POSTS -->
          <div class="TimelinePost" v-for="post in posts" :key="post.id" v-else>
            <div class="userInf">
              <img v-if="post.user.imgURL" :src="`${post.user.imgURL}`" alt="" @click="$router.push({path: `/profile/${post.user.user_id}`})">
              <div class="infoo">
                <h6 @click="$router.push({path: `/profile/${post.user.user_id}`})">{{post.user.nickname}}</h6>
                <p>{{post.time | formatSentAt}}</p>
              </div>
              <div class="postSet dropdown" v-if="post.user_id == userObject.user_id">
                <i class="dropdown-toggle fas fa-ellipsis-v" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <ul class="list-unstyled">
                    <li @click="editPost(post.postId, post.user_id)"><i class="fas fa-pen"></i> Edit post</li>
                    <li @click="deletePost(post.postId)"><i class="fas fa-trash-alt"></i> Delete post</li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="content">{{post.content}}</p>
            <img v-if="post.postImage" class="postImg" :src='post.postImage' alt="">

            <!-- LIKES, LOVES AND COMMENTS COUNTER -->
            <div class="peopleReacted">
              <span class="peopleLiked" @click="toLikesList(post.postId)">{{post.likes.length}} likes</span>
              <span class="peopleLoved" @click="toLovesList(post.postId)">{{post.loves.length}} loves</span>
              <span class="commentingCounter">{{post.comments.length}} comments</span>
            </div>

            <!-- BUTTONS FOR REACTING TO POSTS -->
            <div class="react">
              <div class="dropdown-divider"></div>
              <i class="fas fa-thumbs-up" :class="{likeClicked: post.liked}" @click="like($event, post.postId, post.user_id)"></i>
              <i class="fas fa-heart" :class="{loveClicked: post.loved}" @click="love($event, post.postId, post.user_id)"></i>
              <i class="far fa-comment-alt"></i>
            </div>

            <!-- COMMENTS AREA -->
            <div class="comments" :class="{af: post.comments.length > 0}">

              <!-- TYPE NEW COMMENT AREA -->
              <div class="typeNew">
                <img class="me" :src="userObject.imgURL" alt="" v-if="userObject.imgURL">
                <textarea type="text" placeholder="write comment..." :id="`newComment-${post.postId}`" @focus="focus2(post.postId)" @keypress="typing($event, post.postId)"></textarea>
                <div class="prob">
                  <i class="far fa-grin-alt" @click="showAndHideEmojis2(post.postId)"></i>
                  <input type="file" style="display: none" @change="commentImage($event, post.postId)" :id="`chooseCommentImage-${post.postId}`">
                  <i class="fas fa-camera-retro" @click="clicking3(post.postId)"></i>
                </div>
                <vEmojiPicker class="selectEmoji" @select="selectEmoji2($event, post.postId)" :id="`emojiPicker-${post.postId}`" />
                <button @click="comment(post.postId, post.user_id)"><i class="fas fa-paper-plane"></i></button>
              </div>

              <!-- EXISTS COMMENTS -->
              <div class="commentWrapper">

                <!-- REVIEWING COMMENTS IMAGE BEFORE UPLOADING -->
                <div class="imageReview hide" :id="`imageReview-${post.postId}`">
                  <i class="fas fa-times cancelImage" @click="cancelSendingChatImage(post.postId)"></i>
                  <img :src="commentImg" alt="">
                  <div class="lds-dual-ring" v-if="!commentImg"></div>
                </div>

                <!-- COMMENTS CONTENT AND INFO -->
                <div class="comment" v-for="comment in post.comments" :key="comment.id">
                  <img :src="comment.user ? comment.user.imgURL : null" alt="" @click="$router.push({path: `/profile/${comment.user.user_id}`})">
                  <div class="commentInfo">
                    <h6 @click="$router.push({path: `/profile/${comment.user.user_id}`})">{{comment.user ? comment.user.nickname : null}}</h6>
                    <p>{{comment.commentText}}</p>
                    <img class="commentImage" :src="comment.commentImg" alt="" v-if="comment.commentImg">
                    <span class="time">{{comment.createdAt | formatSentAt}}</span>
                    <div class="dropdown-divider"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4">

        <!-- SUGGESTED FRIENDS AREA -->
        <div class="others">
          <div class="otherHead">
            <p>Suggested Friends</p>
          </div>
          <div class="suggested">
            <div class="one">
              <img src="../assets/images/timeline/friends/one.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Jana Michael</h6>
                <p>human doctor</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="one">
              <img src="../assets/images/timeline/friends/two.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Mick Nilson</h6>
                <p>civil engineer</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="one">
              <img src="../assets/images/timeline/friends/three.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Nana Wilson</h6>
                <p>dentist</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="one">
              <img src="../assets/images/timeline/friends/four.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Jhon Holmes</h6>
                <p>maneger</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="one">
              <img src="../assets/images/timeline/friends/fife.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Sara Bille</h6>
                <p>nurse</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="one">
              <img src="../assets/images/timeline/friends/seven.jpg" alt="">
              <div class="suggestedInfo">
                <h6>Marie Lore</h6>
                <p>pharmasist</p>
              </div>
              <i class="fas fa-user-plus"></i>
            </div>
          </div>

          <!-- VIDEOS AREA -->
          <div class="live">
            <div class="liveHead">
              <p>Live Videos</p>
            </div>
            <iframe width="90%" height="315" src="https://www.youtube.com/embed/X0-rCENFfec" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <iframe width="90%" height="315" src="https://www.youtube.com/embed/0kJNDwcKtT0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- TO OPEN LIKES LIST COMPONENT -->
    <likesList v-if="$store.state.showLikesList" :postIdForReactsList= 'postIdForReactsList'></likesList>

    <!-- TO OPEN LOVES LIST COMPONENT -->
    <lovesList v-if="$store.state.showLovesList" :postIdForReactsList= 'postIdForReactsList'></lovesList>

    <!-- TO OPEN DELETE POST COMPONENT -->
    <deletePost v-if="$store.state.openDeletePost" :postIdForDeleting='postIdForDeleting'></deletePost>

    <!-- TO OPEN EDIT POST COMPONENT -->
    <editPost v-if="$store.state.openEditPost" :postIdForEditing='postIdForEditing' :userIdForEditingPost='userIdForEditingPost'></editPost>

    <!-- TO OPEN HELP COMPONENT -->
    <help v-if="$store.state.openHelpTimeline"></help>

  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* TIMELINE PAGE STYLING */
.Timeline {
  background-color: #f4f4f4;

  /* THE WHOLE AREA OF POSTS ( THE MIDDLE AREA OF PAGE ) */
  .postsArea {
    padding: 0 20px;
    margin-bottom: 50px;
    min-height: 89vh;
    @media (min-width: 1200px) {
      padding: 0 5%;
    }
  }

  /* THE LEFT SIDEBAR  */
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
      border-bottom: 1px solid rgb(231, 230, 230);
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

  /* TYPE NEW POST AREA */
  .newPost {
    background-color: #fff;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 5px;
    position: relative;
    margin-top: 40px;
    margin-bottom: 10px;
    text-align: left;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
    .head {
      background-color: #f4f4f4;
      padding: 5px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgb(226, 226, 226);
      p {
        margin-bottom: 0;
        margin-left: 20px;
        font-weight: bold;
      }
    }
    .create {
      display: flex;
      position: relative;
      margin-left: 20px;
      img {
        width: 41px;
        height: 40px;
        border-radius: 50%;
        background-color: #ccc;
        vertical-align: auto;
        margin-top: -2px;
      }
      textarea {
        width: 100%;
        height: 100px;
        border: none;
        padding: 0px 70px 10px 15px;
        outline: none;
        font-size: 18px;
        resize: none;
      }
      i.fa-grin-alt {
        background-color: transparent;
        color: rgb(163, 163, 163);
        position: absolute;
        top: 0%;
        right: 3%;
        font-size: 22px;
        border: none;
        box-shadow: none;
        cursor: pointer;
        &:hover {
          color: $secondcolor;
          background-color: transparent;
        }
      }
      .selectEmoji {
        position: absolute;
        top: 30%;
        right: 3%;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        padding-bottom: 5px;
        background-color: #f4f4f4;
        display: none;
        z-index: 9999999;
        &.show {
          display: block;
        }
      }
    }
    .reviewPostImage {
      margin-left: 5%;
      display: none;
      .poImg {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        background-color: rgb(235, 235, 235);
        margin-bottom: 10px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          opacity: 0.8;
          background-color: rgb(235, 235, 235);
        }
        .lds-dual-ring {
          display: inline-block;
          width: 100%;
          height: 100%;
          background-color: rgb(231, 231, 231);
          z-index: 9999999;
          position: relative;
          border-radius: 5px;
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
          position: absolute;
          top: 28%;
          left: 28%;
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
    hr {
      margin-top: 0;
    }
    .buttons {
      margin-bottom: 10px;
      margin-left: 3%;
      button {
        background-color: #f4f4f4;
        border: none;
        margin-right: 20px;
        padding: 0px 15px;
        height: 35px;
        border-radius: 20px;
        outline: none;
        color: $textcolor;
        i {
          margin-right: 5px;
        }
        &.post {
          background-color: $maincolor;
          color: #fff;
          width: 100px;
          &:hover {
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
            background-color: $maincolor;
          }
        }
        &:hover {
          background-color: rgb(226, 226, 226);
        }
      }
    }
  }

  /* NO POSTS AREA STYLING */
  .noPosts {
    margin-top: 50px;
    img {
      width: 60%;
      margin-bottom: 20px;
    }
    p {
      width: 60%;
      margin: auto;
      font: {
        weight: 600;
        size: 20px;
      }
      span {
        color: $secondcolor;
      }
    }
  }

  /* POSTS AREA */
  .postsArea {
    .lds-dual-ring {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 8px;
      border-radius: 50%;
      border: 4px solid $textcolor;
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
  }

  /* POSTS IN THE MIDDLE OF THE PAGE */
  .TimelinePost {
    background-color: #fff;
    border: 1px solid rgb(226, 226, 226);
    padding: 20px 20px 0 20px;
    border-radius: 5px;
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: left;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
    z-index: 1;
    .userInf {
      display: flex;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          filter: brightness(0.8)
        }
      }
      .infoo {
        margin-top: 10px;
        h6 {
          font-weight: bold;
          margin-bottom: 0;
          font-size: 17px;
          cursor: pointer;
          text-transform: capitalize;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          color: rgb(139, 139, 139);
          font-size: 13px;
        }
      }
      .postSet {
        position: absolute;
        top: -5px;
        right: -5px;
        cursor: pointer;
        i.fa-ellipsis-v {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          color: rgb(145, 143, 143);
          &::after {
            content: none;
          }
          &:hover {
            background-color: rgb(233, 233, 233);
          }
        }
        .dropdown-menu {
          text-align: left;
          height: 80px;
          min-width: 140px;
          border: 1px solid rgb(218, 215, 215);
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          ul {
            li {
              color: $textcolor;
              &:hover {
                background-color: rgb(226, 225, 225);
              }
              padding: 3px 10px;
              i {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
    p.content {
      color: #454545;
      margin-left: 5px;
      font-size: 20px;
    }
    img.postImg {
      height: auto;
      width: 100%;
      max-height: 400px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .peopleReacted {
      span {
        margin-right: 10px;
        background-color: #f4f4f4;
        padding: 2px 8px;
        border-radius: 5px;
        color: $textcolor;
        cursor: pointer;
        &:hover {
          background-color: rgb(233, 233, 233);
        }
      }
    }
    .react {
      text-align: right;
      i {
        color: $textcolor;
        font-size: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #ccc;
        text-align: center;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        line-height: 48px;
        background-color: #fff;
        margin-right: 1%;
        position: relative;
        top: -35px;
        cursor: pointer;
        &.fa-thumbs-up {
          &.likeClicked {
            background-color: $maincolor;
            color: #fff;
            border: 1px solid $maincolor;
          }
          &:hover {
            background-color: $maincolor;
            color: #fff;
            border: 1px solid $maincolor;
          }
        }
        &.fa-heart{
          &.loveClicked {
            background-color: $secondcolor;
            color: #fff;
            border: 1px solid $secondcolor;
          }
          &:hover {
            background-color: $secondcolor;
            color: #fff;
            border: 1px solid $secondcolor;
          }
        }
        &.fa-comment-alt {
          &:hover {
            background-color: #34495e;
            color: #fff;
            border: 1px solid #34495e;
          }
        }
      }
    }
    .comments {
      margin-top: -20px;
      &.af {
        padding-bottom: 20px;
      }
      .typeNew {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        position: relative;
        img.me {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgb(224, 224, 224);
          background-color: #fff;
          padding: 2px;
          margin: 0;
          margin-right: 3px;
        }
        textarea {
          width: 85%;
          height: 45px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 20px;
          font-size: 16px;
          padding-left: 15px;
          outline: none;
          line-height: 36px;
          padding-right: 60px;
          resize: none;
        }
        .prob {
          position: absolute;
          top: 29%;
          right: 12%;
          i.fa-grin-alt {
            background-color: transparent;
            color: rgb(163, 163, 163);
            font-size: 17px;
            border: none;
            box-shadow: none;
            cursor: pointer;
            margin-right: 10px;
            &:hover {
              color: $secondcolor;
              background-color: transparent;
            }
          }
          i.fa-camera-retro {
            background-color: transparent;
            color: rgb(163, 163, 163);
            font-size: 16px;
            border: none;
            box-shadow: none;
            cursor: pointer;
            &:hover {
              color: $secondcolor;
              background-color: transparent;
            }
          }
          @media (min-width: 1400px) {
            top: 22%;
            right: 10%;
            font-size: 18px;
          }
        }
        .selectEmoji {
          position: absolute;
          top: 60%;
          right: 8%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4 !important;
          display: none;
          transform: scale(0.9);
          z-index: 99999999999999999!important;
          &.show {
            display: block;
            z-index: 999999999999999 !important;
          }
        }
        button {
          width: 47px;
          height: 45px;
          border-radius: 10px;
          position: relative;
          margin-left: 5px;
          background-color: #f4f4f4;
          color: #454545;
          border: none;
          border: 1px solid #ccc;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding: 0;
          outline: none;
          &:hover {
            background-color: $maincolor;
            color: #fff;
            border: none;
          }
          i {
            font-size: 21px;
            line-height: 45px;
            padding-right: 2px;
          }
        }
      }
      .commentWrapper {
        max-height: 450px;
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
        .imageReview {
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.1);
          width: 30%;
          margin: 10px auto 30px;
          border-radius: 10px;
          width: 180px;
          height: 160px;
          text-align: center;
          display: flex;
          align-content: center;
          align-items: center;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
          position: relative;
          .cancelImage {
            position: absolute;
            top: -5%;
            right: -5%;
            background-color: rgba(0, 0, 0, 0.8);
            width: 22px;
            height: 22px;
            font-size: 12px;
            line-height: 22px;
            border-radius: 20%;
          }
          i.fa-times {
            color: #fff;
            cursor: pointer;
          }
          img {
            width: auto;
            height: auto;
            max-width: 140px;
            max-height: 130px;
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
            left: 38%;
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
      }
      .comment {
        display: flex;
        // margin-bottom: 10px;
        text-align: left;
        padding: 3px 10px;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            filter: brightness(0.8);
          }
          &.commentImage {
            width: auto;
            height: auto;
            max-width: 300px;
            max-height: 220px;
            min-width: 100px;
            min-height: 100px;
            border-radius: 5px;
            display: block;
            margin-top: 10px;
            cursor: auto;
            &:hover {
              filter: brightness(1);
            }
          }
        }
        .commentInfo {
          h6 {
            font-weight: bold;
            font-size: 15px;
            margin-bottom: 0;
            cursor: pointer;
            text-transform: capitalize;
            &:hover {
              text-decoration: underline;
            }
          }
          p {
            color: #454545;
            font-size: 16px;
            margin-bottom: -4px;
          }
          span.time {
            font-size: 13px;
            color: #9c9c9c;
            font-weight: 500;
          }
        }
      }
    }
  }

  /* RIGHT SIDEBAR IN THE PAGE */
  .others {
    background-color: #f4f4f4;
    min-height: 700px;
    text-align: left;
    padding-top: 40px;
    .otherHead {
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      padding: 7px 10px 7px 8px;
      border-radius: 5px;
      border: 1px solid rgb(223, 223, 223);
      p {
        margin-bottom: 0;
        font-weight: bold;
        padding-left: 10px;
      }
    }
    .suggested {
        background-color: #fff;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid rgb(223, 223, 223);
      .one {
        display: flex;
        border-bottom: 1px solid rgb(233, 233, 233);
        padding: 10px 0 10px 0;
        position: relative;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .suggestedInfo {
          margin-top: 1px;
          h6 {
            font-size: 15px;
            margin-bottom: 0;
          }
          p {
            font-size: 13px;
            color: $textcolor;
            margin-bottom: 0;
          }
        }
        &:last-of-type {
          border-bottom: none;
        }
        i {
          color: rgb(177, 177, 177);
          position: absolute;
          top: 30%;
          right: 2%;
          cursor: pointer;
        }
      }
    }
    .live {
      .liveHead {
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 7px 10px 7px 8px;
        border-radius: 5px;
        border: 1px solid rgb(223, 223, 223);
        margin-top: 30px;
        p {
          margin-bottom: 0;
          font-weight: bold;
        }
      }
      iframe {
        height: 220px;
        margin-left: 5%;
      }
    }
  }
  /* MOBILE SCREEN VIEW */
  @include mb {
    .profileInfoSectionMain {
      display: none;
    }
    .profileInfoSection {
      position: relative !important;
      display: none;
    }
    .newPost {
      margin-top: 30px;
      .head {
        background-color: #f4f4f4;
        padding: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(226, 226, 226);
        p {
          margin-left: 10px;
          font-size: 13px;
        }
      }
      .create {
        img {
          width: 30px;
          height: 30px;
        }
        textarea {
          padding: 0px 10px 10px 10px;
          font-size: 13px;
          height: 80px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(163, 163, 163);
          position: absolute;
          top: 0%;
          right: 3%;
          font-size: 15px;
          border: none;
          box-shadow: none;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
            background-color: transparent;
          }
        }
        .selectEmoji {
          position: absolute;
          top: -110%;
          right: -20%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          z-index: 9999999;
          transform: scale(0.5);
          &.show {
            display: block;
          }
        }
      }
      .reviewPostImage {
        h6 {
          font-size: 13px;
          margin-left: 2px;
        }
      }
      .buttons {
        margin-bottom: 10px;
        margin-left: 3%;
        button {
          margin-right: 10px;
          padding: 0px 15px;
          height: 30px;
          font-size: 13px;
          i {
            margin-right: 5px;
          }
          &.post {
            background-color: $maincolor;
            color: #fff;
            &:hover {
              box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
              background-color: $maincolor;
            }
          }
          &:hover {
            background-color: rgb(226, 226, 226);
          }
        }
      }
    }
    .noPosts {
      p {
        font-size: 12px;
        width: 60%;
        margin: auto;
      }
    }
    .postsArea {
      .lds-dual-ring {
        height: 100px;
      }
      .lds-dual-ring {
        margin-top: 80px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
        margin: 8px;
        border-radius: 50%;
        border: 2px solid $textcolor;
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
    }
    .TimelinePost {
      padding: 10px 10px 0 10px;
      margin-bottom: 30px;
      .userInf {
        margin-bottom: 5px;
        img {
          width: 45px;
          height: 45px;
          margin-right: 8px;
        }
        .infoo {
          margin-top: 5px;
          h6 {
            font-size: 14px;
          }
          p {
            font-size: 10px;
          }
        }
        .postSet {
          top: -3px;
          right: -5px;
          i.fa-ellipsis-v {
            font-size: 12px;
          }
          .dropdown-menu {
            height: 70px;
            min-width: 120px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            ul {
              li {
                font-size: 13px;
              }
            }
          }
        }
      }
      p.content {
        font-size: 12px;
      }
      img.postImg {
        height: 200px;
        margin-bottom: 20px;
      }
      .peopleReacted {
        position: relative;
        top: -10px;
        span {
          margin-right: 4px;
          background-color: #f4f4f4;
          padding: 2px 6px;
          border-radius: 5px;
          color: $textcolor;
          cursor: pointer;
          font-size: 10px;
        }
      }
      .react {
        i {
          font-size: 15px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          background-color: #fff;
          top: -25px;
          cursor: pointer;
          &.fa-thumbs-up {
            line-height: 33px;
          }
        }
      }
      .comments {
        margin-top: -15px; 
        .typeNew {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          position: relative;
          img.me {
            width: 34px;
            height: 34px;
          }
          textarea {
            width: 85%;
            height: 32px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: 10px;
            padding-left: 10px;
            outline: none;
            line-height: 26px;
            padding-right: 50px;
          }
          .prob {
            position: absolute;
            right: 16%;
            top: 1%;
            i.fa-grin-alt {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 26%;
              font-size: 13px;
              border: none;
              box-shadow: none;
              margin-right: 15px;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
            i.fa-camera-retro {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 19%;
              font-size: 12px;
              border: none;
              box-shadow: none;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
            @media (min-width: 380px) {
              top: 1%;
              right: 15%;
              font-size: 19px;
            }
            @media (min-width: 480px) {
              top: 1%;
              right: 13%;
              font-size: 19px;
              i.fa-grin-alt {
                margin-right: 20px;
              }
            }
          }
          .selectEmoji {
            position: absolute;
            top: -220%;
            right: -10%;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding-bottom: 5px;
            background-color: #f4f4f4 !important;
            display: none;
            z-index: 99999999999999999999999999999999999999 !important;
            transform: scale(0.5);
            &.show {
              display: block;
            }
          }
          button {
            width: 40px;
            height: 32px;
            border-radius: 10px;
            position: relative;
            margin-left: 5px;
            background-color: #f4f4f4;
            color: #454545;
            border: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding: 0;
            outline: none;
            &:hover {
              background-color: $maincolor;
              color: #fff;
              border: none;
            }
            i {
              font-size: 15px;
              line-height: 32px;
              padding-right: 2px;
            }
          }
        }
        .commentWrapper {
          max-height: 335px;
          &::-webkit-scrollbar {
            width: 3px;
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
          .imageReview {
            padding: 15px;
            width: 140px;
            height: 140px;
            i.fa-times {
              color: #fff;
              cursor: pointer;
              font-size: 10px;
              width: 20px;
              height: 20px;
              line-height: 20px;
            }
            img {
              width: auto;
              height: auto;
              max-width: 110px;
              max-height: 110px;
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
              left: 38%;
            }
            .lds-dual-ring:after {
              content: " ";
              display: block;
              width: 30px;
              height: 30px;
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
        }
        .comment {
          img {
            width: 30px;
            height: 30px;
            margin-right: 5px;
          }
          .commentInfo {
            h6 {
              font-size: 12px;
            }
            p {
              font-size: 10px;
              margin-bottom: -5px;
            }
            img.commentImage {
              width: auto;
              height: auto;
              max-width: 200px;
              max-height: 150px;
              margin-bottom: -3px;
            }
            span.time {
              font-size: 10px;
            }
          }
        }
      }
    }
    .others {
      display: none;
    }
  }

  /* SMALL SCREEN VIEW  */
  @include sm {
    .profileInfoSectionMain {
      display: none;
    }
    .profileInfoSection {
      position: relative !important;
      display: none;
    }
    .newPost {
      margin-top: 40px;
      .head {
        background-color: #f4f4f4;
        padding: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(226, 226, 226);
        p {
          margin-left: 15px;
          font-size: 15px;
        }
      }
      .create {
        img {
          width: 35px;
          height: 35px;
        }
        textarea {
          padding: 0px 10px 10px 10px;
          font-size: 15px;
          height: 90px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(163, 163, 163);
          position: absolute;
          top: 0%;
          right: 3%;
          font-size: 17px;
          border: none;
          box-shadow: none;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
            background-color: transparent;
          }
        }
        .selectEmoji {
          position: absolute;
          top: -50%;
          right: -6%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          z-index: 9999999;
          transform: scale(0.7);
          &.show {
            display: block;
          }
        }
      }
      .reviewPostImage {
        h6 {
          font-size: 14px;
          margin-left: 2px;
        }
      }
      .buttons {
        margin-bottom: 10px;
        margin-left: 3%;
        button {
          margin-right: 10px;
          padding: 0px 15px;
          height: 32px;
          font-size: 15px;
          i {
            margin-right: 5px;
          }
        }
      }
    }
    .noPosts {
      p {
        font-size: 15px;
        width: 60%;
        margin: auto;
      }
    }
    .postsArea {
      .lds-dual-ring {
        height: 250px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 35px;
        height: 35px;
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
    }
    .TimelinePost {
      padding: 15px 15px 0 15px;
      margin-bottom: 30px;
      .userInf {
        margin-bottom: 5px;
        img {
          width: 45px;
          height: 45px;
          margin-right: 8px;
        }
        .infoo {
          margin-top: 5px;
          h6 {
            font-size: 14px;
          }
          p {
            font-size: 10px;
          }
        }
        .postSet {
          top: -3px;
          right: -8px;
          i.fa-ellipsis-v {
            font-size: 12px;
          }
          .dropdown-menu {
            height: 70px;
            min-width: 120px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            ul {
              li {
                font-size: 13px;
              }
            }
          }
        }
      }
      p.content {
        font-size: 13px;
      }
      img.postImg {
        height: 200px;
        margin-bottom: 26px;
      }
      .peopleReacted {
        span {
          margin-right: 10px;
          background-color: #f4f4f4;
          padding: 2px 8px;
          border-radius: 5px;
          color: $textcolor;
          cursor: pointer;
          font-size: 13px;
          &:hover {
            background-color: rgb(233, 233, 233);
          }
        }
      }
      .react {
        i {
          font-size: 16px;
          width: 40px;
          height: 40px;
          line-height: 39px;
          background-color: #fff;
          top: -30px;
          cursor: pointer;
          &.fa-thumbs-up {
            line-height: 38px;
          }
        }
      }
      .comments {
        margin-top: -20px;
        .typeNew {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          position: relative;
          img.me {
            width: 38px;
            height: 38px;
          }
          textarea {
            width: 85%;
            height: 35px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: 12px;
            padding-left: 10px;
            outline: none;
            line-height: 28px;
            padding-right: 50px;
          }
          .prob {
            position: absolute;
            right: 12%;
            top: 1%;
            i.fa-grin-alt {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 26%;
              font-size: 15px;
              border: none;
              box-shadow: none;
              margin-right: 22px;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
            i.fa-camera-retro {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 19%;
              font-size: 15px;
              border: none;
              box-shadow: none;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
          }
          .selectEmoji {
            position: absolute;
            top: -60%;
            right: 3%;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding-bottom: 5px;
            background-color: #f4f4f4 !important;
            display: none;
            z-index: 99999999999999999999999999999999999999 !important;
            transform: scale(0.7);
            &.show {
              display: block;
            }
          }
          button {
            width: 40px;
            height: 36px;
            border-radius: 10px;
            position: relative;
            margin-left: 5px;
            background-color: #f4f4f4;
            color: #454545;
            border: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding: 0;
            outline: none;
            &:hover {
              background-color: $maincolor;
              color: #fff;
              border: none;
            }
            i {
              font-size: 17px;
              line-height: 34px;
              padding-right: 2px;
            }
          }
        }
        .commentWrapper {
          max-height: 350px;
          .imageReview {
            padding: 15px;
            width: 150px;
            height: 150px;
            i.fa-times {
              color: #fff;
              cursor: pointer;
            }
            img {
              width: auto;
              height: auto;
              max-width: 130px;
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
              left: 38%;
            }
            .lds-dual-ring:after {
              content: " ";
              display: block;
              width: 30px;
              height: 30px;
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
        }
        .comment {
          margin-top: 10px;
          img {
            width: 33px;
            height: 33px;
            margin-right: 8px;
          }
          .commentInfo {
            h6 {
              font-size: 13px;
            }
            p {
              font-size: 11px;
              margin-bottom: -5px;
            }
            img.commentImage {
              width: auto;
              height: auto;
              max-width: 250px;
              max-height: 200px;
              margin-bottom: -3px;
            }
            span.time {
              font: {
                size: 10px;
              }
            }
          }
        }
      }
    }
    .others {
      .otherHead {
        p {
          padding-left: 8px;
          font-size: 14px;
        }
      }
      .suggested {
        .one {
          display: flex;
          border-bottom: 1px solid rgb(233, 233, 233);
          padding: 10px 0 10px 0;
          position: relative;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .suggestedInfo {
            margin-top: 3px;
            h6 {
              font-size: 13px;
              margin-bottom: 0;
            }
            p {
              font-size: 12px;
              color: $textcolor;
              margin-bottom: 0;
            }
          }
          &:last-of-type {
            border-bottom: none;
          }
          i {
            top: 35%;
            font-size: 14px;
          }
        }
      }
      .live {
        .liveHead {
          p {
            font-size: 14px;
          }
        }
        iframe {
          height: 200px;
          margin-left: 5%;
        }
      }
    }
  }

  /* MEDIUM SCREEN VIEW */
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
        border-bottom: 1px solid rgb(231, 231, 231);
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
          margin-left: 10px;
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
    .newPost {
      margin-top: 40px;
      .head {
        background-color: #f4f4f4;
        padding: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgb(226, 226, 226);
        p {
          margin-left: 15px;
          font-size: 15px;
        }
      }
      .create {
        img {
          width: 35px;
          height: 35px;
        }
        textarea {
          padding: 0px 10px 10px 10px;
          font-size: 15px;
          height: 90px;
        }
        i.fa-grin-alt {
          background-color: transparent;
          color: rgb(163, 163, 163);
          position: absolute;
          top: 0%;
          right: 3%;
          font-size: 18px;
          border: none;
          box-shadow: none;
          cursor: pointer;
          &:hover {
            color: $secondcolor;
            background-color: transparent;
          }
        }
        .selectEmoji {
          position: absolute;
          top: -20%;
          right: -5%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          z-index: 9999999;
          transform: scale(0.8);
          &.show {
            display: block;
          }
        }
      }
      .buttons {
        margin-bottom: 10px;
        margin-left: 3%;
        button {
          margin-right: 10px;
          padding: 0px 15px;
          height: 32px;
          font-size: 15px;
          i {
            margin-right: 5px;
          }
        }
      }
    }
    .noPosts {
      p {
        font-size: 16px;
        width: 60%;
        margin: auto;
      }
    }
    .postsArea {
      .lds-dual-ring {
        height: 300px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
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
    }
    .TimelinePost {
      padding: 15px 15px 0 15px;
      margin-bottom: 30px;
      .userInf {
        .postSet {
          top: 0px;
          right: -5px;
          i.fa-ellipsis-v {
            font-size: 14px;
          }
          .dropdown-menu {
            height: 70px;
            min-width: 130px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            ul {
              li {
                font-size: 15px;
              }
            }
          }
        }
      }
      p.content {
        font-size: 14px;
      }
      img.postImg {
        height: 220px;
        margin-bottom: 26px;
      }
      .peopleReacted {
        span {
          margin-right: 10px;
          background-color: #f4f4f4;
          padding: 2px 8px;
          border-radius: 5px;
          color: $textcolor;
          cursor: pointer;
          font-size: 12px;
          &:hover {
            background-color: rgb(233, 233, 233);
          }
        }
      }
      .react {
        i {
          font-size: 16px;
          width: 40px;
          height: 40px;
          line-height: 39px;
          background-color: #fff;
          top: -30px;
          cursor: pointer;
          &.fa-thumbs-up {
            line-height: 38px;
          }
        }
      }
      .comments {
        margin-top: -15px;
        .typeNew {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          position: relative;
          img.me {
            width: 40px;
            height: 40px;
          }
          textarea {
            width: 85%;
            height: 38px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: 12px;
            padding-left: 10px;
            outline: none;
            line-height: 28px;
            padding-right: 50px;
          }
          .prob {
            position: absolute;
            right: 12%;
            top: 1%;
            i.fa-grin-alt {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 26%;
              font-size: 15px;
              border: none;
              box-shadow: none;
              margin-right: 22px;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
            i.fa-camera-retro {
              background-color: transparent;
              color: rgb(163, 163, 163);
              position: absolute;
              top: 12px;
              right: 19%;
              font-size: 15px;
              border: none;
              box-shadow: none;
              cursor: pointer;
              &:hover {
                color: $secondcolor;
                background-color: transparent;
              }
            }
          }
          .selectEmoji {
            position: absolute;
            top: -60%;
            right: 3%;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding-bottom: 5px;
            background-color: #f4f4f4 !important;
            display: none;
            z-index: 99999999999999999999999999999999999999 !important;
            transform: scale(0.7);
            &.show {
              display: block;
            }
          }
          button {
            width: 40px;
            height: 38px;
            border-radius: 10px;
            position: relative;
            margin-left: 5px;
            background-color: #f4f4f4;
            color: #454545;
            border: none;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            padding: 0;
            outline: none;
            &:hover {
              background-color: $maincolor;
              color: #fff;
              border: none;
            }
            i {
              font-size: 17px;
              line-height: 34px;
              padding-right: 2px;
            }
          }
        }
        .commentWrapper {
          max-height: 370px;
          .imageReview {
            padding: 15px;
            width: 170px;
            height: 150px;
            i.fa-times {
              color: #fff;
              cursor: pointer;
            }
            img {
              width: auto;
              height: auto;
              max-width: 140px;
              max-height: 130px;
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
              left: 38%;
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
        }
        .comment {
          margin-top: 10px;
          img {
            width: 35px;
            height: 35px;
            margin-right: 8px;
          }
          .commentInfo {
            h6 {
              font-size: 14px;
            }
            p {
              font-size: 12px;
              margin-bottom: 5px;
            }
            .commentReact {
              i {
                width: 30px;
                height: 30px;
                line-height: 29px;
                margin-right: 5px;
                font-size: 13px;
              }
            }
          }
        }
      }
    }
    .others {
      .otherHead {
        p {
          padding-left: 8px;
          font-size: 14px;
        }
      }
      .suggested {
        .one {
          display: flex;
          border-bottom: 1px solid rgb(233, 233, 233);
          padding: 10px 0 10px 0;
          position: relative;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .suggestedInfo {
            margin-top: 3px;
            h6 {
              font-size: 13px;
              margin-bottom: 0;
            }
            p {
              font-size: 12px;
              color: $textcolor;
              margin-bottom: 0;
            }
          }
          &:last-of-type {
            border-bottom: none;
          }
          i {
            top: 35%;
            font-size: 14px;
          }
        }
      }
      .live {
        .liveHead {
          p {
            font-size: 14px;
          }
        }
        iframe {
          height: 200px;
          margin-left: 5%;
        }
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
import likesList from '../components/LikesList'
import lovesList from '../components/LovesList'
import deletePost from '../components/DeletePost'
import help from '../components/Help'
import editPost from '../components/EditPost'
import vEmojiPicker from 'v-emoji-picker'
import moment from 'moment'
export default {
  data() {
    return {
      // DATA FOR NEW POST 
      newpost: {
        username: '',
        postContent: '',
        postImg: ''
      },
      userObject: '',
      commentInfo: '',
      commentImg: '',
      commentImageName: '',
      postIdForReactsList: '',
      postsNumber: [],
      requests: [],
      notifications: [],
      thereIsNotifications: false,
      foundNotifications: false,
      ChatSeen: true,
      postIdForDeleting: '',
      postIdForEditing: '',
      userIdForEditingPost: '',
      dataRendered: false
    }
  },
  computed: {
    // GET POSTS OF ME AND MY FRIENDS THAT STORED IN 'VUEX'
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    // ADD NEW POST
    userPost() {
      var postID = Math.floor(Math.random() * 1000000000000)
      var userInfo = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
      userInfo.get().then(doc => {
        firebase.firestore().collection('posts').doc('a' + postID).set({
          content: this.newpost.postContent,
          postImage: this.newpost.postImg,
          user_id: doc.data().user_id,
          postId: 'a' + postID,
          time: Date.now(),
          comments: [],
          likes: [],
          loves: []
        })
        this.newpost.postContent = '';
        this.newpost.postImg = '';
      });
      document.getElementById('reviewPostImage').style.display = 'none';
    },

    // CLICK THE INPUT FILE FROM ANOTHER BUTTON
    clicking() {
      this.$refs['uploadPostImage'].click();
    },

    // ADD IMAGE FOR NEW POST
    postImage(e) {
      var postImg = e.target.files[0];
      var uploadPostImage = firebase.storage().ref('postImages/' + postImg.name).put(postImg);
      uploadPostImage.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('postImages/' + postImg.name).getDownloadURL().then(URL => {
            this.newpost.postImg = URL
          })
        }
      })
      document.getElementById('reviewPostImage').style.display = 'block';
    },

    // ADD COMMENTS TO POST
    comment(postId, postUserId) {
      var commentTxt = document.getElementById(`newComment-${postId}`)
      document.getElementById(`chooseCommentImage-${postId}`).value = ''
      document.getElementById(`imageReview-${postId}`).classList.add('hide');
      if (commentTxt.value !== '' || this.commentImg !== '') {
        // ADD COMMENT
        firebase.firestore().collection('posts').doc(postId).get().then(doc => {
          let comments = doc.data().comments
          comments.unshift({
            commentText: commentTxt.value,
            userId: this.userObject.user_id,
            commentImg: this.commentImg,
            createdAt: Date.now()
          })
          // UPDATE ALL COMMENTS IN FIREBASE
          firebase.firestore().collection('posts').doc(postId).update({
            comments
          })
          // SEND NOTIFICATION TO POST OWNER
          if(postUserId !== firebase.auth().currentUser.uid) {
            firebase.firestore().collection('users').doc(postUserId).update({
              notifications: admin.firestore.FieldValue.arrayUnion({
                notifTime: Date.now(),
                notifType: 'comment',
                postId: postId,
                seen: false,
                userId: firebase.auth().currentUser.uid
              })
            })
          }
          // EMPTY FIELDS
          commentTxt.value = '';
          this.commentImg = '';
          this.commentImageName = '';
        })
      }
    },

    // REACT LIKE TO A POST
    like(e, postId, postUserId) {
      // REMOVE LOVE REACT ON THE SAME POST IF FOUND
      firebase.firestore().collection('posts').doc(postId).get().then(doc => {
        let loves = doc.data().loves
        firebase.firestore().collection('posts').doc(postId).update({
          loves: loves.filter(love => love.userId !== firebase.auth().currentUser.uid)
        })
        // ADD LIKE TO THE POST
        if (doc.data().likes.length > 0) {
          doc.data().likes.forEach(like => {
            if(like.userId !== firebase.auth().currentUser.uid) {
              firebase.firestore().collection('posts').doc(postId).update({
                likes: admin.firestore.FieldValue.arrayUnion({
                  userId: this.userObject.user_id,
                  time: Date.now()
                })
              })
            } else {
              let likes = doc.data().likes
              firebase.firestore().collection('posts').doc(postId).update({
                likes: likes.filter(like => like.userId !== firebase.auth().currentUser.uid)
              })
            }
          })
        } else {
          firebase.firestore().collection('posts').doc(postId).update({
            likes: admin.firestore.FieldValue.arrayUnion({
              userId: this.userObject.user_id,
              time: Date.now()
            })
          })
        }
      })

      // ADD & REMOVE NOTIFICATIONS
      firebase.firestore().collection('users').doc(postUserId).get().then(async doc => {
        let notifications = doc.data().notifications
        // CHECK IF THE CURRENT USER WANK TO LIKE HIS OWN POST AND PREVENT SENDING NOTIFICATIONS FOR THAT
        if(postUserId != firebase.auth().currentUser.uid) {
          // REMOVE LIKE NOTIFICATIONS
          if (!e.target.classList.contains('likeClicked')) {
            let notifs = []
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'like') {
                // SKIP IT
              } else {
                notifs.unshift(notif)
              }
            })
            firebase.firestore().collection('users').doc(postUserId).update({
              notifications: notifs
            })
          }

          // ADD LIKE NOTIFICATION
          else {
            await firebase.firestore().collection('users').doc(postUserId).update({
              notifications: firebase.firestore.FieldValue.arrayUnion({ 
                userId: firebase.auth().currentUser.uid,
                postId: postId,
                notifTime: Date.now(),
                notifType: 'like',
                seen: false
              })
            })
            // CHECK IF THERE IS LOVE NOTIFICTION (IF THERE IS ? REMOVE IT)
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'love') {
                // SKIP IT
                firebase.firestore().collection('users').doc(postUserId).update({
                  notifications: firebase.firestore.FieldValue.arrayRemove({ 
                    userId: firebase.auth().currentUser.uid,
                    postId: notif.postId,
                    notifTime: notif.notifTime,
                    notifType: notif.notifType,
                    seen: notif.seen
                  })
                })
              }
            })
          }
        }
      })
      // TOGGLE CLICK ON LIKE BUTTON TO GET IT'S BLUE COLOR
      e.target.classList.toggle('likeClicked');

    },

    // REACT LOVE TO A POST
    love(e, postId, postUserId) {
      // CHECK IF THERE IS LIKE ON THE SAME POST
      firebase.firestore().collection('posts').doc(postId).get().then(doc => {
        let likes = doc.data().likes
        firebase.firestore().collection('posts').doc(postId).update({
          likes: likes.filter(like => like.userId !== firebase.auth().currentUser.uid)
        })
        // ADD LOVE ON THIS POST
        if (doc.data().loves.length > 0) {
          doc.data().loves.forEach(love => {
            if(love.userId !== firebase.auth().currentUser.uid) {
              firebase.firestore().collection('posts').doc(postId).update({
                loves: admin.firestore.FieldValue.arrayUnion({
                  userId: this.userObject.user_id,
                  time: Date.now()
                })
              })
            } else {
              let loves = doc.data().loves
              firebase.firestore().collection('posts').doc(postId).update({
                loves: loves.filter(love => love.userId !== firebase.auth().currentUser.uid)
              })
            }
          })
        } else {
          firebase.firestore().collection('posts').doc(postId).update({
            loves: admin.firestore.FieldValue.arrayUnion({
              userId: this.userObject.user_id,
              time: Date.now()
            })
          })
        }
      })

      // ADD & REMOVE NOTIFICATIONS
      firebase.firestore().collection('users').doc(postUserId).get().then(async doc => {
        let notifications = doc.data().notifications
        // CHECK IF THE CURRENT USER WANK TO LIKE HIS OWN POST AND PREVENT SENDING NOTIFICATIONS FOR THAT
        if(postUserId != firebase.auth().currentUser.uid) {
          // REMOVE LOVE NOTIFICATION
          if (!e.target.classList.contains('loveClicked')) {
            let notifs = []
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'love') {
                // SKIP IT
              } else {
                notifs.unshift(notif)
              }
            })
            firebase.firestore().collection('users').doc(postUserId).update({
              notifications: notifs
            })
          } 
          // ADD LOVE NOTIFICATION
          else {
            await firebase.firestore().collection('users').doc(postUserId).update({
              notifications: firebase.firestore.FieldValue.arrayUnion({ 
                userId: firebase.auth().currentUser.uid,
                postId: postId,
                notifTime: Date.now(),
                notifType: 'love',
                seen: false
              })
            })
            
            // CHECK IF THERE IS A LIKE NOTIFICATION (IF THERE IS ? REMOVE IT)
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'like') {
                firebase.firestore().collection('users').doc(postUserId).update({
                  notifications: firebase.firestore.FieldValue.arrayRemove({ 
                    userId: firebase.auth().currentUser.uid,
                    postId: notif.postId,
                    notifTime: notif.notifTime,
                    notifType: notif.notifType,
                    seen: notif.seen
                  })
                })
              }
            })
          }
        }
      })

      // TOGGLE CLICK ON LOVE BUTTON TO GET THE RED COLOR
      e.target.classList.toggle('loveClicked');

    },

    // GO TO LIKES LIST
    toLikesList(postId) {
      this.$store.state.showLikesList = true;
      this.postIdForReactsList = postId;
    },

    // GO TO LOVES LIST
    toLovesList(postId) {
      this.$store.state.showLovesList = true;
      this.postIdForReactsList = postId;
    },

    // ADD EMOJIS TO INPUT FIELD
    selectEmoji(emoji) {
      var ourTextArea = document.getElementById('newPost');
      var emojis = emoji.data
      ourTextArea.value += emojis
      this.newpost.postContent = ourTextArea.value
      console.log(emoji)
    },

    // CLICK FOR SHOWING AND HIDE EMOJIS
    showAndHideEmojis() {
      document.getElementById('emojiPicker').classList.toggle('show')
    },

    // ADD EMOJIS TO COMMENTS
    selectEmoji2({data}, id) {
      document.getElementById(`newComment-${id}`).value += data;
    },

    // SHOW AND HIDE EMOJIS IN COMMENTS AREA
    showAndHideEmojis2(id) {
      document.getElementById(`emojiPicker-${id}`).classList.toggle('show')
    },

    // FOCUS ON INPUT FIELD OF TYPING NEW POST
    focus1() {
      document.getElementById('emojiPicker').classList.remove('show')
    },
    
    // FOCUS ON INPUT FIELD OF TYPING NEW COMMENT
    focus2(id) {
      document.getElementById(`emojiPicker-${id}`).classList.remove('show')
    },

    // FOR INPUT FILE IN COMMENTS AREA
    clicking3(postId) {
      document.getElementById(`chooseCommentImage-${postId}`).click();
    },

    // ADD IMAGE TO COMMENT
    commentImage(e, postId) {
      document.getElementById(`imageReview-${postId}`).classList.remove('hide');
      var commentImage = e.target.files[0];
      var commentImageName = (+new Date()) + '-' + commentImage.name;
      var uploadCommentImage = firebase.storage().ref('commentImages/' + commentImageName).put(commentImage);
      uploadCommentImage.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('commentImages/' + commentImageName).getDownloadURL().then(URL => {
            this.commentImg = URL;
            this.commentImageName = '';
          })
        }
      })
      console.log(this.commentImageName)
    },

    // CANCEL SENDING COMMENT IMAGE SO IT WILL NOT BE SAVED IN FIREBASE
    cancelSendingChatImage(postId) {
      document.getElementById(`imageReview-${postId}`).classList.add('hide');
      document.getElementById(`chooseCommentImage-${postId}`).value = ''
      firebase.storage().ref('commentImages/' + this.commentImageName).delete();
      this.commentImg = '';
      this.commentImageName = '';
    },

    // NAVIGATE TO DELETE POST COMPONENT
    deletePost(postId) {
      // firebase.firestore().collection('posts').doc(postId).delete()
      this.$store.state.openDeletePost = true;
      this.postIdForDeleting = postId;
    },

    // NAVIGATE TO EDITP POST COMPONENT
    editPost(postId, userId) {
      // firebase.firestore().collection('posts').doc(postId).delete()
      this.$store.state.openEditPost = true;
      this.postIdForEditing = postId;
      this.userIdForEditingPost = userId;
    },

    // PRESS ENTER TO SEND COMMENT RATHER THAN CLICK IT'S OWN BUTTON
    typing(event, postId) {
      if(event.keyCode === 13) {
        event.preventDefault();
        this.comment(postId);
      }
    }

  },
  async created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE TIMELINE PAGE TITLE (DEFAULT WEBSITE TITLE)
    document.title = 'Friendster'

    // CURRENT USER DATA
    let currentUserInfo = firebase.auth().currentUser.uid;
    await firebase.firestore().collection('users').doc(currentUserInfo).get().then(doc => {
      this.userObject = doc.data();
      setTimeout(() => {
        this.dataRendered = true
      }, 1000)
    })

    // COUNTER FOR NUMBER OF POSTS
    firebase.firestore().collection('posts').get().then(docs => {
      docs.forEach(doc => {
        if(doc.data().user_id == firebase.auth().currentUser.uid) {
          this.postsNumber.push(doc.data())
        }
      })
    })


    // LISTENING FOR NEW POSTS
    const self = this;
    let unsubscribe = firebase.firestore().collection('posts').onSnapshot(snp => {  
      snp.docChanges().forEach(async chng => {
        // POST DATA
        console.log(this.userObject.friends.indexOf({userId: chng.doc.data().user_id}))

        if(chng.doc.data().user_id == this.userObject.user_id || this.userObject.friends.find(obj => obj.userId == chng.doc.data().user_id)) {
          console.log('exists')
          const post = chng.doc.data()

          // POSTS ARRAY
          const POSTS = this.$store.state.posts;
          // FIND POST INDEX IN POSTS ARRAY (if exist)

          var index = POSTS.findIndex(Post => post.postId == Post.postId)
          // GET POST AUTHOR DATA
          const userDoc = await firebase.firestore().collection('users').doc(post.user_id).get()

          // ADD POST AUTHOR DATA TO EACH POST
          post.user = userDoc.data()
          
          // CHECK IF THE POST ALREADY FOUND IN THE POSTS ARRAY OR NOT
          if (index == -1) { // INDEX FOR THE POST YOU HAVE BEEN CHANGED
            // ADD LIKE OWNER's DATA TO EACH LIKE 
            post.likes.forEach(async ({userId}, index) => {
              const user = await firebase.firestore().collection('users').doc(userId).get()
              // CHECK EACH LIKE IF CURRENT LOGGED IN USER Is ONE OF THEM
              if (userId == self.userObject.user_id) post.liked = true
              post.likes[index] = user.data()
            })

            // ADD LOVE OWNER's DATA TO EACH LOVE 
            post.loves.forEach(async ({userId}, index) => {
              const user = await firebase.firestore().collection('users').doc(userId).get()
              // CHECK EACH LIKE IF CURRENT LOGGED IN USER Is ONE OF THEM
              if (userId == self.userObject.user_id) post.loved = true
              post.loves[index] = user.data()
            })

            // ADD COMMENT OWNER's DATA TO EACH COMMENT 
            post.comments.forEach(async ({userId}, index) => {
              const user = await firebase.firestore().collection('users').doc(userId).get()
              post.comments[index].user = user.data()
            })
            // IF DOESN'T EXIST PUSH IT
            POSTS.unshift(post) // index== -1 => means it doesn't exist...
            
          } else {
            var ExistingPost = POSTS[index]

            /********* Handle Any Change In Post Comments *********/
            if (post.comments.length > ExistingPost.comments.length) {
              const user = await firebase.firestore().collection('users').doc(post.comments[0].userId).get()
              post.comments[0].user = user.data()
              ExistingPost.comments.unshift(post.comments[0])
            } 
            
            /********* Handle Any Change In Post LIKES *********/
            if (post.likes.length != ExistingPost.likes.length) {
              POSTS[index].liked = !POSTS[index].liked
              if (post.likes.length > ExistingPost.likes.length) {
                var like = post.likes[post.likes.length - 1]
                const user = await firebase.firestore().collection('users').doc(like.userId).get()
                like.user = user
                POSTS[index].likes.push(like)
              } else if (post.likes.length < ExistingPost.likes.length) {
                var i = POSTS[index].likes.findIndex(l => l.userId == ExistingPost.likes[0].userId)
                POSTS[index].likes.splice(i, 1)
              }
            } 
            
            /********* Handle Any Change In Post LOVES *********/
            if (post.loves.length != ExistingPost.loves.length) {
              POSTS[index].loved = !POSTS[index].loved
              if (post.loves.length > ExistingPost.loves.length) {
                var love = post.loves[post.loves.length - 1]
                const user = await firebase.firestore().collection('users').doc(love.userId).get()
                love.user = user
                POSTS[index].loves.push(love)
              } else if (post.loves.length < ExistingPost.loves.length) {
                var I = POSTS[index].loves.findIndex(l => l.userId == ExistingPost.loves[0].userId)
                POSTS[index].loves.splice(I, 1)
              }
            } 
            
            /********* Handle Any Change In Post CONTENT *********/
            if (post.content != ExistingPost.content) {
              POSTS[index].content = post.content
            }
            
          }

          self.$forceUpdate();
          // THIS TIMEOUT BECAUSE VUE TAKES SOME TIME TO RENDER THE CLASSES AND STYLES AND WE WANNA SHOW THE LIKE BUTTON IN BLUE IF I'M ALREADY LIKED THE POST

          // FORCE UPDATRE => TO UPDATE VUE FOR TO LISTEN TO NEW DATA CAME
          setTimeout(() => self.$forceUpdate(), 1000)

        } else {
          console.log('dont exist')
        }
        
      })
    })
    

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();
    this.$store.commit("changeUnsubscribe", unsubscribe);  // UNSUBSCRIBE => RESERVED WORD IN FIREBASE TO STOP THE SNAPSHOT

    // LISTENING FOR NEW NOTIFICATIONS TO SHOW ALERT
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let foundUnreadNotif = doc.data().notifications.find(notif => notif.seen == false)
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
        this.requests.unshift(userData.data());
      })
    })
    // LISTENING TO NEW NOTIFICATIONS
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      if(doc.data().notifications.length > 0) {
        this.foundNotifications = true
      } else {
        this.foundNotifications = false
      }
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
  components: {
    likesList,
    lovesList,
    deletePost,
    editPost,
    help,
    vEmojiPicker
  },
  filters: {
    // TIME FORMAT
    formatSentAt (time) {
      return moment(time).fromNow()
    }
  }
}
</script>