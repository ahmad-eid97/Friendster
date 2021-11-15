<template>
  <div class="section2">
    <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-4">

      <!-- PROFILE BASIC INFO HEAD -->
      <div class="basicInfo">
        <p>Basic info</p>
        <i class="fas fa-user-cog"></i>
      </div>

      <!-- PROFILE INFO -->
      <div class="info">
        <div class="one">
          <div>
            <p>Studied at</p>
            <p v-if="userData.university" class="ans">{{userData.university}}</p>
            <p v-if="!userData.university" class="ans">Not Joined!</p>
          </div>
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="dropdown-divider"></div>
        <div class="one">
          <div>
            <p>Relationship</p>
            <p v-if="userData.relationship" class="ans">{{userData.relationship}}</p>
            <p v-if="!userData.relationship" class="ans">Not mentioned</p>
          </div>
          <i class="fas fa-heart"></i>
        </div>
        <div class="dropdown-divider"></div>
        <div class="one">
          <div>
            <p>Lives in</p>
            <p v-if="userData.livesIn" class="ans">{{userData.livesIn}}</p>
            <p v-if="!userData.livesIn" class="ans">Not mentioned</p>
          </div>
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="dropdown-divider"></div>
        <div class="one">
          <div>
            <p>Phone</p>
            <p v-if="userData.phone" class="ans">{{userData.phone}}</p>
            <p v-if="!userData.phone" class="ans">Not linked!</p>
          </div>
          <i class="fas fa-mobile-alt"></i>
        </div>
      </div>

      <!-- PROFILE PHOTOS HEAD -->
      <div class="photos">
        <p>Related photos</p>
        <i class="fas fa-image"></i>
      </div>

      <!-- PROFILE PHOTOS -->
      <div class="userPhotos">
        <img src="../assets/images/profile/photos/one.jpg" alt="">
        <img src="../assets/images/profile/photos/two.jpg" alt="">
        <img src="../assets/images/profile/photos/three.jpg" alt="">
        <img src="../assets/images/profile/photos/four.jpg" alt="">
        <img src="../assets/images/profile/photos/five.jpg" alt="">
        <img src="../assets/images/profile/photos/six.jpg" alt="">
        <img src="../assets/images/profile/photos/seven.jpg" alt="">
        <img src="../assets/images/profile/photos/eight.jpg" alt="">
        <img src="../assets/images/profile/photos/nine.jpg" alt="">
        <img src="../assets/images/profile/photos/ten.jpg" alt="">
        <img src="../assets/images/profile/photos/eleven.jpg" alt="">
        <img src="../assets/images/profile/photos/twelve.jpg" alt="">
      </div>

      <!-- PROFILE TRIPS HEAD -->
      <div class="trips">
        <p>Suggested trips</p>
      </div>

      <!-- PROFILE TRIPS -->
      <div class="cities">
          <div class="city">
          <img src="../assets/images/profile/trips/egypt.jpg" alt="">
          <div class="cityInfo">
            <h6>Giza, Egypt</h6>
            <p>giza pyramids...</p>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <div class="city">
          <img src="../assets/images/profile/trips/france.jpg" alt="">
          <div class="cityInfo">
              <h6>Paris, France</h6>
              <p>eiffel tower...</p>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <div class="city">
          <img src="../assets/images/profile/trips/italy.jpg" alt="">
          <div class="cityInfo">
              <h6>Rome, Italy</h6>
              <p>rome theatre...</p>
          </div>
          </div>
          <div class="dropdown-divider"></div>
          <div class="city">
          <img src="../assets/images/profile/trips/usa.jpg" alt="">
          <div class="cityInfo">
              <h6>Newyork, USA</h6>
              <p>newyork city...</p>
          </div>
          </div>
      </div>
      </div>
      <div class="col-lg-8 col-md-8">

        <!-- PROFILE POSTS HEAD -->
        <div class="postHeader">
          <p>Recent Posts</p>
          <i class="fas fa-pen"></i>
        </div>

        <!-- DIV FOR NO POSTS YET -->
        <div class="noProfilePosts" v-if="posts.length <= 0 && dataRendered">
          <img src="../assets/noPro.svg" alt="">
          <p><label style="color: #fa534e" v-if="userData.user_id !== userObject.user_id">{{userData.nickname.split(' ')[0]}}</label> <label v-if="userData.user_id == userObject.user_id">You</label> did not post any thing yet!</p>
          <p v-if="userData.user_id == userObject.user_id">Make a new <a href="/">post</a> !?</p>
        </div>

        <!-- LOADER -->
        <div class="lds-dual-ring" v-if="posts.length <= 0 && !dataRendered"></div>

        <!-- POSTS -->
        <div class="userPosts" v-for="post in posts" :key="post.id">
          <!-- USER INFO -->
          <div class="userInf">
            <img :src="userData.imgURL" alt="" v-if="userData.imgURL">
            <div class="infoo">
              <h6>{{userData.nickname}}</h6>
              <p>{{post.time | formatSentAt}}</p>
            </div>
            <div class="postSet dropdown" v-if="$route.params.userId == userObject.user_id">
              <i class="dropdown-toggle fas fa-ellipsis-v" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <ul class="list-unstyled">
                  <li @click="editPost(post.postId, post.user_id)"><i class="fas fa-pen"></i> Edit post</li>
                  <li @click="deletePost(post.postId)"><i class="fas fa-trash-alt"></i> Delete post</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- POST CONTENT -->
            <p class="content">{{post.content}}</p>
            <img class="postImg" :src="post.postImage" alt="" v-if="post.postImage">
            <!-- POST REACTS COUNTER (LIKES, LOVES AND COMMENTS COUNTER) -->
            <div class="peopleReacted">
              <span class="peopleLiked" @click="toLikesList(post.postId)">{{post.likes.length}} likes</span>
              <span class="peopleLoved" @click="toLovesList(post.postId)">{{post.loves.length}} loves</span>
              <span class="commentingCounter">{{post.comments.length}} comments</span>
            </div>

            <!-- POST REACTS BUTTONS -->
          <div class="react">
            <div class="dropdown-divider"></div>
            <i class="fas fa-thumbs-up" :class="{likeClicked: post.liked}" @click="like($event, post.postId, post.user_id)"></i>
            <i class="fas fa-heart" :class="{loveClicked: post.loved}" @click="love($event, post.postId, post.user_id)"></i>
            <i class="far fa-comment-alt"></i>
          </div>

          <!-- POST COMMENTS -->
          <div class="comments" :class="{af: post.comments.length > 0}">
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
            <div class="commentWrapper">
              <div class="imageReview hide" :id="`imageReview-${post.postId}`">
                <i class="fas fa-times cancelImage" @click="cancelSendingChatImage(post.postId)"></i>
                <img :src="commentImg" alt="">
              <div class="lds-dual-ring" v-if="!commentImg"></div>
              </div>
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
    </div>
    <likesList v-if="$store.state.showLikesList" :postIdForReactsList= 'postIdForReactsList'></likesList>
    <lovesList v-if="$store.state.showLovesList" :postIdForReactsList= 'postIdForReactsList'></lovesList>
    <deletePost v-if="$store.state.openDeletePost" :postIdForDeleting='postIdForDeleting'></deletePost>
    <editPost v-if="$store.state.openEditPost" :postIdForEditing='postIdForEditing' :userIdForEditingPost='userIdForEditingPost'></editPost>
  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* MAIN PAGE */
.section2 {
  text-align: left;
  margin-top: 50px;

  /* PROFILE BASIC INFO HEAD */
  .basicInfo {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    margin-bottom: 10px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    position: relative;
    cursor: pointer;
    p {
      margin-bottom: 0;
      font-weight: bold;
    }
    i {
      position: absolute;
      top: 30%;
      right: 3%;
      color: $textcolor;
      font-size: 19px;
      cursor: pointer;
    }
  }

  /* PROFILE BASIC INFO */
  .info {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    .one {
      position: relative;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 50px;
      p {
        margin-bottom: 0;
        &.ans {
          color: rgb(163, 163, 163);
          font-size: 13px;
        }
      }
      i {
        position: absolute;
        top: 25%;
        right: 2%;
        color: #ccc;
        font-size: 20px;
      }
    }
  }

  /* PROFILE PHOTOS HEAD */
  .photos {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    margin-bottom: 10px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    position: relative;
    cursor: pointer;
    margin-top: 50px;
    p {
      margin-bottom: 0;
      font-weight: bold;
    }
    i {
      position: absolute;
      top: 30%;
      right: 3%;
      color: $textcolor;
      font-size: 19px;
      cursor: pointer;
    } 
  }

  /* PROFILE PHOTOS */
  .userPhotos {
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    img {
      width: 21%;
      height: 70px;
      margin: 2%;
      border-radius: 5px;
      &:hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  /* PROFILE TRIPS HEAD */
  .trips {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    margin-bottom: 10px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    margin-top: 40px;
    p {
      margin-bottom: 0;
      font-weight: bold;
    }
  }

  /* PROFILE TRIPS */
  .cities {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    margin-bottom: 30px;
    .city {
      display: flex;
      img {
        width: 55px;
        height: 55px;
        margin-right: 15px;
        border-radius: 50%;
      }
    }
    .cityInfo {
      margin-top: 7px;
      h6 {
        margin-bottom: 0;
        font-size: 15px;
        font-weight: bold;
      }
      p {
        margin-bottom: 0;
        color: rgb(151, 149, 149);
        font-size: 13px;
        font-weight: bold;
      }
    }
  }

  /* PROFILE POSTS HEAD */
  .postHeader {
    background-color: #fff;
    padding: 10px 10px 10px 15px;
    margin-bottom: 10px;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 7px;
    position: relative;
    cursor: pointer;
    p {
      margin-bottom: 0;
      font-weight: bold;
    }
    i {
      position: absolute;
      top: 30%;
      right: 3%;
      color: $textcolor;
      font-size: 19px;
      cursor: pointer;
    }
  }

  /* NO PROFILE POSTS */
  .noProfilePosts {
    text-align: center;
    margin-top: 50px;
    img {
      width: 50%;
      margin-bottom: 30px;
    }
    p {
      margin-bottom: 0px;
      font: {
        size: 18px;
        weight: 600;
      }
      a {
        color: $secondcolor;
      }
    }
  }

  /* LOADER */
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

  /* PROFILE USER POSTS */
  .userPosts {
    background-color: #fff;
    border: 1px solid rgb(226, 226, 226);
    padding: 20px 20px 0 20px;
    border-radius: 5px;
    margin-bottom: 30px;
    .userInf {
      display: flex;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .infoo {
        margin-top: 10px;
        h6 {
          font-weight: bold;
          margin-bottom: 0;
          font-size: 17px;
          text-transform: capitalize;
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
      width: 100%;
      height: auto;
      max-height: 400px;
      border-radius: 5px;
      margin-bottom: 40px;
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
          margin-right: 3px;
          border-radius: 50%;
          border: 1px solid rgb(224, 224, 224);
          background-color: #fff;
          padding: 2px;
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
          z-index: 9999999999999 !important;
          &.show {
            display: block;
            z-index: 9999999999999 !important;
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
        margin-top: 10px;
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

  /* MOBILE SCREEN VIEW */
  @include mb {
    margin-top: 30px !important;
    .basicInfo {
      p {
        font-size: 12px;
      }
      i {
        font-size: 14px;
      }
    }
    .info {
      .one {
        p {
          font-size: 14px;
          &.ans {
            font-size: 11px;
          }
        }
        i {
          font-size: 17px;
        }
      }
    }
    .photos {
      margin-top: 20px;
      display: none;
      p {
        font-size: 15px;
      }
      i {
        font-size: 15px;
      } 
    }
    .userPhotos {
      display: none;
      img {
        height: 60px;
      }
    }
    .trips {
      margin-top: 20px;
      display: none;
      p {
        font-size: 15px;
      }
    }
    .cities {
      display: none;
      .city {
        img {
          width: 45px;
          height: 45px;
          margin-right: 10px;
        }
      }
      .cityInfo {
        margin-top: 7px;
        h6 {
          font-size: 13px;
        }
        p {
          font-size: 11px;
        }
      }
    }
    .postHeader {
      margin-top: 20px;
      p {
        font-size: 12px;
      }
      i {
        font-size: 14px;
      }
    }
    .noProfilePosts {
      text-align: center;
      margin-top: 40px;
      margin-bottom: 50px;
      img {
        width: 40%;
        margin-bottom: 30px;
      }
      p {
        margin-bottom: 0px;
        font: {
          size: 13px;
          weight: 600;
        }
      }
    }
    .lds-dual-ring {
      height: 200px;
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
    .userPosts {
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
            width: 35px;
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
          margin-top: 10px;
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
  }

  /* SMALL SCREEN VIEW */
  @include sm {
    margin-top: 40px;
    .basicInfo {
      font-size: 13px;
      i {
        right: 4%;
        font-size: 14px;
      }
    }
    .photos {
      font-size: 13px;
      i {
        right: 5%;
        font-size: 14px;
      } 
    }
    .trips {
      font-size: 13px;
    }
    .postHeader {
      font-size: 13px;
      i {
        font-size: 14px;
      }
    }
    .noProfilePosts {
      p {
        margin-bottom: 0px;
        font: {
          size: 14px;
          weight: 600;
        }
      }
    }
    .lds-dual-ring {
      height: 250px;
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
    .info {
      .one {
        p {
          font-size: 14px;
          &.ans {
            font-size: 11px;
          }
        }
        i {
          font-size: 17px;
        }
      }
    }
    .userPhotos {
      img {
        height: 55px;
      }
    }
    .cities {
      margin-bottom: 40px;
      .city {
        img {
          width: 45px;
          height: 45px;
          margin-right: 10px;
        }
      }
      .cityInfo {
        margin-top: 7px;
        h6 {
          font-size: 13px;
        }
        p {
          font-size: 11px;
        }
      }
    }
    .userPosts {
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
        font-size: 15px;
      }
      img.postImg {
        height: 200px;
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
          font-size: 13px;
          &:hover {
            background-color: rgb(233, 233, 233);
          }
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
  }

  /* MEDUIM SCREEN VIEW */
  @include md {
    .basicInfo {
      font-size: 15px;
      i {
        right: 4%;
        font-size: 16px;
      }
    }
    .photos {
      font-size: 15px;
      i {
        right: 5%;
        font-size: 17px;
      } 
    }
    .trips {
      font-size: 15px;
    }
    .postHeader {
      padding: 10px 10px 10px 15px;
      margin-bottom: 10px;
      font-size: 15px;
      i {
        font-size: 17px;
      }
    }
    .noProfilePosts {
      p {
        margin-bottom: 0px;
        font: {
          size: 15px;
          weight: 600;
        }
      }
    }
    .userPosts {
      padding: 10px 10px 0 10px;
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
      .peopleReacted {
        span {
          margin-right: 10px;
          background-color: #f4f4f4;
          padding: 2px 8px;
          border-radius: 5px;
          color: $textcolor;
          cursor: pointer;
          font-size: 14px;
          &:hover {
            background-color: rgb(233, 233, 233);
          }
        }
      }
      .react {
        i {
          width: 43px;
          height: 43px;
          line-height: 40px;
          font-size: 18px;
          top: -32px;
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
            width: 39px;
            height: 39px;
          }
          textarea {
            width: 85%;
            height: 38px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: 13px;
            padding-left: 10px;
            outline: none;
            line-height: 30px;
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
  }
}
</style>

<script>
import firebase from 'firebase'
import admin from 'firebase'
import likesList from './LikesList'
import lovesList from './LovesList'
import deletePost from './DeletePost'
import editPost from './EditPost'
import vEmojiPicker from 'v-emoji-picker'
import moment from 'moment'
export default {
  data() {
    return {
      userData: {},
      userObject: '',
      commentInfo: '',
      postIdForReactsList: '',
      userId: this.$route.params.userId,
      chatId: '',
      commentImg: '',
      postIdForDeleting: '',
      postIdForEditing: '',
      userIdForEditingPost: '',
      postat: '',
      dataRendered: Boolean
    }
  },
  methods: {
    // ADD COMMENT TO POST
    comment(postId, postUserId) {
      var commentTxt = document.getElementById(`newComment-${postId}`)
      document.getElementById(`chooseCommentImage-${postId}`).value = ''
      document.getElementById(`imageReview-${postId}`).classList.add('hide');
      if (commentTxt.value !== '' || this.commentImg !== '') {
        firebase.firestore().collection('posts').doc(postId).get().then(doc => {
          let comments = doc.data().comments
          comments.unshift({
            commentText: commentTxt.value,
            userId: this.userObject.user_id,
            commentImg: this.commentImg,
            createdAt: Date.now()
          })
          firebase.firestore().collection('posts').doc(postId).update({
            comments
          })
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
          commentTxt.value = '';
          this.commentImg = '';
          this.commentImageName = '';
        })
      }
    },

    // REACT LIKE TO POSTS
    like(e, postId, postUserId) {
      firebase.firestore().collection('posts').doc(postId).get().then(doc => {
        let loves = doc.data().loves
        firebase.firestore().collection('posts').doc(postId).update({
          loves: loves.filter(love => love.userId !== firebase.auth().currentUser.uid)
        })
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
          // Remove Like Notification
          if (!e.target.classList.contains('likeClicked')) {
            let notifs = []
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'like') {
                // skip it
              } else {
                notifs.unshift(notif)
              }
            })
            firebase.firestore().collection('users').doc(postUserId).update({
              notifications: notifs
            })
          }

          // Add Like Notification
          else {
            // Add The Like Notification
            await firebase.firestore().collection('users').doc(postUserId).update({
              notifications: firebase.firestore.FieldValue.arrayUnion({ 
                userId: firebase.auth().currentUser.uid,
                postId: postId,
                notifTime: Date.now(),
                notifType: 'like',
                seen: false
              })
            })
            // Check If There Is a Love Notification (if there is, remove it)
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'love') {
                // skip it
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
      e.target.classList.toggle('likeClicked');

    },

    // REACT LOVE TO POSTS
    love(e, postId, postUserId) {
      firebase.firestore().collection('posts').doc(postId).get().then(doc => {
        let likes = doc.data().likes
        firebase.firestore().collection('posts').doc(postId).update({
          likes: likes.filter(like => like.userId !== firebase.auth().currentUser.uid)
        })
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
          // Remove Love Notification
          if (!e.target.classList.contains('loveClicked')) {
            let notifs = []
            notifications.forEach(notif => {
              if (notif.userId == firebase.auth().currentUser.uid && notif.postId == postId && notif.notifType === 'love') {
                // skip it
              } else {
                notifs.unshift(notif)
              }
            })
            firebase.firestore().collection('users').doc(postUserId).update({
              notifications: notifs
            })
          } 
          // Add Love Notification
          else {
            // Add The Love Notification
            await firebase.firestore().collection('users').doc(postUserId).update({
              notifications: firebase.firestore.FieldValue.arrayUnion({ 
                userId: firebase.auth().currentUser.uid,
                postId: postId,
                notifTime: Date.now(),
                notifType: 'love',
                seen: false
              })
            })

            // Check If There Is a Like Notification (if there is, remove it)
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
      e.target.classList.toggle('loveClicked');
    },

    // GO TO LIKES LIST COMPONENT
    toLikesList(postId) {
      this.$store.state.showLikesList = true;
      this.postIdForReactsList = postId;
    },

    // GO TO LOVES LIST COMPONENT
    toLovesList(postId) {
      this.$store.state.showLovesList = true;
      this.postIdForReactsList = postId;
    },

    // SEND FRIEND REQUEST
    sendFriendRequest() {
      firebase.firestore().collection('users').doc(this.$route.params.userId).update({
        requests: admin.firestore.FieldValue.arrayUnion({
          userId: firebase.auth().currentUser.uid
        })
      })
    },

    // CREATE CHAT
    createChat() {
      firebase.firestore().collection('chats').get().then(docs => {
        if(!docs.empty) {

          let test = docs.docs.find(doc => {
            // doc.data().users[0] == firebase.auth().currentUser.uid;
            return doc.data().users[0] == this.$route.params.userId && doc.data().users[1] == firebase.auth().currentUser.uid || doc.data().users[1] == this.$route.params.userId && doc.data().users[0] == firebase.auth().currentUser.uid;
          })

          if(test) {
            this.$router.push({path: `/sendMessage/${this.userId}/${test.data().chatId}`})
            console.log('user found!')
          } else {
            let chatId = 'a' + Math.random() * 10000000;
            this.$router.push({path: `/sendMessage/${this.userId}/${chatId}`})
            console.log('user not found!')
          }
        } else {
          let chatId = 'a' + Math.random() * 10000000;
          this.$router.push({path: `/sendMessage/${this.userId}/${chatId}`})
        }
      })
    },

    // ADD COMMENTY PHOTO
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

    // FOCUS ON INPUT FIELD
    focus2(id) {
      document.getElementById(`emojiPicker-${id}`).classList.remove('show')
    },

    // SHOW AND HIDE EMOJIS
    showAndHideEmojis2(id) {
      document.getElementById(`emojiPicker-${id}`).classList.toggle('show')
    },

    // SHOW AND HIDE EMOJIS NUM2
    selectEmoji2({data}, id) {
      document.getElementById(`newComment-${id}`).value += data;
    },

    // CLICK ON INPUT FILE
    clicking3(postId) {
      document.getElementById(`chooseCommentImage-${postId}`).click();
    },

    // CANCEL SENDING COMMENT IMAGE SO IT WILL NOT BE SAVED IN FIREBASE
    cancelSendingChatImage(postId) {
      document.getElementById(`imageReview-${postId}`).classList.add('hide');
      document.getElementById(`chooseCommentImage-${postId}`).value = ''
      firebase.storage().ref('commentImages/' + this.commentImageName).delete();
      this.commentImg = '';
      this.commentImageName = '';
    },

    // CLICK ENTER BUTTON TO COMMENT SITHOUT CLICKING THE BUTTON ON THE PAGE
    typing(event, postId) {
      if(event.keyCode === 13) {
        event.preventDefault();
        this.comment(postId);
      }
    },

    //GO TO DELETE POST COMPONENT
    deletePost(postId) {
      // firebase.firestore().collection('posts').doc(postId).delete()
      this.$store.state.openDeletePost = true;
      this.postIdForDeleting = postId;
    },

    // GO TO EDIT POST COMPONENT
    editPost(postId, userId) {
      // firebase.firestore().collection('posts').doc(postId).delete()
      this.$store.state.openEditPost = true;
      this.postIdForEditing = postId;
      this.userIdForEditingPost = userId;
    },
  },
  computed: {
    // GET ONLY MY POSTS FROM 'VUEX'
    posts() {
      return this.$store.state.posts.filter(post => {
        if(post.user_id == this.$route.params.userId) {
          return post
        }
      })
    }
  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)

    // CHECK IF DATA ALREADY HERE (RENDERED) OR NOT YET
    this.dataRendered = false
    
    // EMPTY FRIENDS LIST FOR LISTENING TO REMOVING FRIENDS FROM USER'S FRIENDS LIST
    this.$store.state.userFriends = []
    // GETTING CURRENT USER DATA
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
      this.userObject = doc.data()
      var interval = setInterval(() => {
        if(this.userObject) {
          this.dataRendered = true
          clearInterval(interval)
        }
      }, 100)
    })

    // LISTENING FOR NEW POST
    const self = this;
    let unsubscribeProfile = firebase.firestore().collection('posts').onSnapshot(snp => {
      snp.docChanges().forEach(async chng => {
        // POST DATA
        const post = chng.doc.data()
        // Check if The Post is Belongs to me
        if (post.user_id != this.$route.params.userId) return;
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
            if (userId == self.userData.user_id) post.liked = true
            post.likes[index] = user.data()
          })

          // ADD LOVE OWNER's DATA TO EACH LOVE 
          post.loves.forEach(async ({userId}, index) => {
            const user = await firebase.firestore().collection('users').doc(userId).get()
            // CHECK EACH LIKE IF CURRENT LOGGED IN USER Is ONE OF THEM
            if (userId == self.userData.user_id) post.loved = true
            post.loves[index] = user.data()
          })

          // ADD COMMENT OWNER's DATA TO EACH COMMENT 
          post.comments.forEach(async ({userId}, index) => {
            const user = await firebase.firestore().collection('users').doc(userId).get()
            post.comments[index].user = user.data()
          })
          // IF DOESN'T EXIST PUSH IT
          POSTS.unshift(post) // index== -1 means it doesn't exist...
        } else {
          var ExistingPost = POSTS[index]

          /*********|| Handle Any Change In Post Comments ||*********/
          if (post.comments.length > ExistingPost.comments.length) {
            const user = await firebase.firestore().collection('users').doc(post.comments[0].userId).get()
            post.comments[0].user = user.data()
            ExistingPost.comments.unshift(post.comments[0])
          } 
          
          /*********|| Handle Any Change In Post LIKES ||*********/
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
          
          /*********|| Handle Any Change In Post LOVES ||*********/
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
          
          /*********|| Handle Any Change In Post CONTENT ||*********/
          if (post.content != ExistingPost.content) {
            POSTS[index].content = post.content
          }
          
        }

        self.$forceUpdate();
        // THIS TIMEOUT BECAUSE VUE TAKES SOME TIME TO RENDER THE CLASSES AND STYLES AND WE WANNA SHOW THE LIKE BUTTON IN BLUE IF I'M ALREADY LIKED THE POST
        setTimeout(() => self.$forceUpdate(), 1000)
      })
    })
    this.$store.commit("changeUnsubscribeProfile", unsubscribeProfile);
    
    // GETTING USER PROFILE DATA
    var data = firebase.firestore().collection('users').doc(this.$route.params.userId);
    data.get().then(doc => {
      this.userData = doc.data()
    })

  },
  components: {
    likesList,
    lovesList,
    deletePost,
    editPost,
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