<template>
  <div class="main" v-if="postDetails">
    <div class="postReview container">
      <div class="row justify-content-center">

        <!-- LEFT SIDE THAT SHOWS THE POST -->
        <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="post">
            <div class="postReviewPost">

              <div class="userInf">
                <img :src="`${userObject.imgURL}`" alt="" @click="$router.push({path: `/profile/${userObject.user_id}`})">
                <div class="infoo">
                  <h6 @click="$router.push({path: `/profile/${userObject.user_id}`})">{{userObject.nickname}}</h6>
                  <p>{{postDetails.time | formatSentAt}}</p>
                </div>
              </div>

              <p class="content">{{postDetails.content}}</p>
              <img v-if="postDetails.postImage" class="postImg" :src='postDetails.postImage' alt="">
              <div class="peopleReacted">
                <span class="peopleLiked" @click="toLikesList(postDetails.postId)">{{postDetails.likes.length}} likes</span>
                <span class="peopleLoved" @click="toLovesList(postDetails.postId)">{{postDetails.loves.length}} loves</span>
                <span class="commentingCounter">{{postDetails.comments.length}} comments</span>
              </div>
              <div class="react">
                <div class="dropdown-divider"></div>
                <i class="fas fa-thumbs-up" :class="{likeClicked: postDetails.liked}" @click="like($event, postDetails.postId, postDetails.user_id)"></i>
                <i class="fas fa-heart" :class="{loveClicked: postDetails.loved}" @click="love($event, postDetails.postId, postDetails.user_id)"></i>
                <i class="far fa-comment-alt"></i>
              </div>
              
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE THAT SHOWS COMMENTS -->
        <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="commentsContainer">
            <div class="comments">
              <div class="formField">
                <i class="fas fa-camera" @click="clicking"></i>
                <input type="file" style="display: none" id="fieldForCommentImg" @change="commentImage">
                <textarea required type="text" placeholder="write comment..." v-model="commentInfo" @keypress="typing($event, postDetails.postId)" id="commentField" @focus="onFocus"></textarea>
                <i class="far fa-grin-alt" @click="showAndHideEmojis"></i>
                <vEmojiPicker class="selectEmoji" @select="selectEmoji" id="emojiPicker"/>
                <button @click="comment(postDetails.postId)"> <i class="fas fa-paper-plane"></i></button>
              </div>
              <div class="commentWrapper">
                <div class="imageReview hide" id="imageReview">
                  <i class="fas fa-times cancelImage" @click="cancelSendingChatImage"></i>
                  <img :src="commentImg" alt="">
                  <div class="lds-dual-ring" v-if="!commentImg"></div>
                </div>
                <div class="conditional" v-if="postDetails.comments.length <= 0">
                  <img src="../assets/waitComments.svg" alt="">
                  <p>There is no comments yet <span>{{userObject.nickname.split(' ')[0]}}</span>,</p>
                  <p> start making the first one.</p>
                </div>
                <div class="comment" v-for="comment in postDetails.comments" :key="comment.id">
                  <img :src="comment.user ? comment.user.imgURL : null" alt="" @click="$router.push({path: `/profile/${comment.user.user_id}`})">
                  <div class="commentInfo">
                    <h6 @click="$router.push({path: `/profile/${comment.user.user_id}`})">{{comment.user ? comment.user.nickname : null}}</h6>
                    <p>{{comment.commentText}}</p>
                    <img v-if="comment.commentImg" :src="comment.commentImg" alt="" class="commentImg">
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

<style lang="scss" scoped>
@import '../css/variables.scss';
@import '../css/mixins.scss';
.main {
  height: 93vh;
  padding-top: 5%;
}
.postReview {
  .comments {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .post {
    .postReviewPost {
      background-color: #fff;
      border: 1px solid rgb(226, 226, 226);
      padding: 20px 20px 0 20px;
      border-radius: 10px;
      text-align: left;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      .userInf {
        display: flex;
        margin-bottom: 10px;
        position: relative;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 10px;
          background-color: #ccc;
          cursor: pointer;
          &:hover {
            filter: brightness(0.8);
          }
        }
        .infoo {
          margin-top: 10px;
          h6 {
            font-weight: bold;
            margin-bottom: 0;
            font-size: 18px;
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
          top: -2px;
          right: 0px;
          cursor: pointer;
          i {
            color: rgb(145, 143, 143);
            &::after {
              content: none;
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
        margin-left: 1px;
        font-size: 20px;
        margin-bottom: 10px;
      }
      img.postImg {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 300px;
        border-radius: 5px;
        margin-bottom: 5px;
      }
      .peopleReacted {
        margin-top: 15px;
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
    }
  }
  .commentsContainer {
    .comments {
      padding: 20px 10px;
      text-align: center;
      border: 1px solid rgb(226, 226, 226);
      .formField {
        display: flex;
        justify-content: center;
        position: relative;
      }
      i.fa-camera {
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
        margin-right: 1%;
        margin-top: 3px;
        &:hover {
          background-color: $secondcolor;
          border: 1px solid $secondcolor;
          color: #fff;
        }
      }
      textarea {
        width: 85%;
        height: 45px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-size: 18px;
        padding-left: 15px;
        padding-right: 30px;
        outline: none;
        margin-bottom: 20px;
        display: inline-block;
        line-height: 37px;
      }
      i.fa-grin-alt {
        background-color: transparent;
        color: rgb(138, 136, 136);
        position: absolute;
        top: 20%;
        right: 12%;
        font-size: 20px;
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
        top: 50%;
        right: 5%;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        padding-bottom: 5px;
        background-color: #f4f4f4;
        display: none;
        transform: scale(0.9);
        &.show {
          display: block;
        }
      }
      button {
        width: 45px;
        height: 45px;
        border-radius: 10px;
        position: relative;
        margin-left: 1%;
        background-color: #f4f4f4;
        color: #454545;
        border: none;
        border: 1px solid #ccc;
        padding: 0;
        outline: none;
        &:hover {
          background-color: $maincolor;
          color: #fff;
          border: none;
        }
        i {
          font-size: 21px;
          line-height: 40px;
          padding-right: 2px;
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
        .conditional {
          img {
            width: 60%;
            margin-bottom: 30px;
          }
          p {
            // margin-top: 20px;
            font-weight: 500;
            color: #454545;
            font-size: 17px;
            margin-bottom: 0;
            span {
              color: $secondcolor;
            }
          }
        }
      }
      .comment {
        display: flex;
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
          &.commentImg {
            width: auto;
            height: auto;
            max-width: 300px;
            max-height: 220px;
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
            font-size: 16px;
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
            margin-bottom: 0px;
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
}

/* MEDUIM SCREEN VIEW */
@include md {
  .postReview {
    .post {
      margin: 0;
      .postReviewPost {
        .userInf {
          margin-bottom: 8px;
          img {
            width: 50px;
            height: 50px;
          }
          .infoo {
            margin-top: 5px;
            h6 {
              font-weight: bold;
              margin-bottom: 0;
              font-size: 17px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            p {
              font-size: 12px;
            }
          }
        }
        p.content {
          font-size: 18px;
        }
        .peopleReacted {
          span {
            margin-right: 6px;
            padding: 2px 8px;
            font-size: 13px;
          }
        }
        .react {
          i {
            font-size: 18px;
            width: 45px;
            height: 45px;
            line-height: 43px;
            background-color: #fff;
            margin-right: 1%;
            position: relative;
            top: -35px;
            cursor: pointer;
          }
        }
      }
    }
    .commentsContainer {
      .comments {
        padding: 20px 10px;
        .formField {
          display: flex;
          justify-content: center;
          position: relative;
        }
        i.fa-camera {
          font-size: 17px;
          width: 41px;
          height: 38px;
          line-height: 38px;
          margin-right: 1%;
          margin-top: 3px;
        }
        textarea {
          width: 85%;
          height: 43px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 17px;
          margin-bottom: 20px;
          line-height: 36px;
          resize: none;
        }
        i.fa-grin-alt {
          top: 20%;
          right: 13%;
          font-size: 19px;
        }
        .selectEmoji {
          position: absolute;
          top: 12%;
          right: 3%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          transform: scale(0.8);
          &.show {
            display: block;
          }
        }
        button {
          width: 45px;
          height: 43px;
          i {
            font-size: 20px;
            line-height: 40px;
            padding-right: 2px;
          }
        }
        .commentWrapper {
          max-height: 450px;
          .imageReview {
            padding: 15px;
            width: 170px;
            height: 150px;
            .cancelImage {
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
          .conditional {
            img {
              width: 60%;
              margin-bottom: 30px;
            }
            p {
              // margin-top: 20px;
              font-weight: 500;
              color: #454545;
              font-size: 17px;
              margin-bottom: 0;
              span {
                color: $secondcolor;
              }
            }
          }
        }
        .comment {
          img {
            width: 40px;
            height: 40px;
            &.commentImg {
              width: auto;
              height: auto;
              max-width: 280px;
              max-height: 200px;
            }
          }
          .commentInfo {
            h6 {
              font-size: 15px;
            }
            p {
              font-size: 15px;
            }
            span.time {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

/* SMALL SCREEN VIEW */
@include sm {
  .postReview {
    max-width: 900px;
    .post {
      .postReviewPost {
        .userInf {
          margin-bottom: 8px;
          img {
            width: 47px;
            height: 47px;
          }
          .infoo {
            margin-top: 3px;
            h6 {
              font-weight: bold;
              margin-bottom: 0;
              font-size: 16px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            p {
              font-size: 11px;
            }
          }
        }
        p.content {
          font-size: 16px;
          margin-bottom: 5px;
        }
        img.postImg {
          
        }
        .peopleReacted {
          span {
            margin-right: 2px;
            padding: 2px 8px;
            font-size: 11px;
          }
        }
        .react {
          i {
            font-size: 16px;
            width: 38px;
            height: 38px;
            line-height: 35px;
            background-color: #fff;
            margin-right: 1%;
            position: relative;
            top: -28px;
            cursor: pointer;
          }
        }
      }
    }
    .commentsContainer {
      .comments {
        padding: 15px 10px;
        i.fa-camera {
          font-size: 15px;
          width: 40px;
          height: 35px;
          line-height: 35px;
          margin-right: 1%;
          margin-top: 3px;
        }
        textarea {
          width: 85%;
          height: 39px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 15px;
          margin-bottom: 20px;
          line-height: 33px;
        }
        i.fa-grin-alt {
          top: 20%;
          right: 16%;
          font-size: 17px;
        }
        .selectEmoji {
          position: absolute;
          top: -30%;
          right: -3%;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          transform: scale(0.7);
        }
        button {
          width: 42px;
          height: 39px;
          i {
            font-size: 18px;
            line-height: 39px;
            padding-right: 2px;
          }
        }
        .commentWrapper {
          max-height: 450px;
          .imageReview {
            padding: 15px;
            width: 150px;
            height: 150px;
            .cancelImage {
            }
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
          .conditional {
            img {
              width: 60%;
              margin-bottom: 30px;
            }
            p {
              // margin-top: 20px;
              font-weight: 500;
              color: #454545;
              font-size: 16px;
              margin-bottom: 0;
              span {
                color: $secondcolor;
              }
            }
          }
        }
        .comment {
          img {
            width: 35px;
            height: 35px;
            &.commentImg {
              width: auto;
              height: auto;
              max-width: 250px;
              max-height: 180px;
            }
          }
          .commentInfo {
            h6 {
              font-size: 14px;
            }
            p {
              font-size: 14px;
              margin-bottom: -2px;
            }
            span.time {
              font-size: 11px;
            }
          }
        }
      }
    }
  }
}

/* MOBILE SCREEN VIEW */
@include mb {
  .postReview {
    .col-xs-12 {
      padding: 0 6px;
    }
    max-width: 950px;
    .post {
      max-width: 85%;
      margin: 0 auto 15px;
      display: block !important;
      .postReviewPost {
        display: block !important;
        .userInf {
          margin-bottom: 3px;
          img {
            width: 40px;
            height: 40px;
            margin-right: 5px;
          }
          .infoo {
            margin-top: 3px;
            h6 {
              font-weight: bold;
              margin-bottom: 0;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            p {
              font-size: 9px;
            }
          }
        }
        p.content {
          font-size: 13px;
          margin-bottom: 5px;
        }
        img.postImg {
          
        }
        .peopleReacted {
          span {
            margin-right: 2px;
            padding: 2px 8px;
            font-size: 9px;
            padding: 1px 5px;
          }
        }
        .react {
          i {
            font-size: 12px;
            width: 30px;
            height: 30px;
            line-height: 28px;
            background-color: #fff;
            margin-right: 1%;
            position: relative;
            top: -25px;
            cursor: pointer;
          }
        }
      }
    }
    .commentsContainer {
      max-width: 85%;
      margin: 0 auto 15px;
      .comments {
        padding: 15px 7px;
        i.fa-camera {
          font-size: 13px;
          width: 35px;
          height: 30px;
          line-height: 29px;
          margin-right: 1%;
          margin-top: 2px;
        }
        textarea {
          width: 85%;
          height: 32px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 12px;
          margin-bottom: 20px;
          line-height: 26px;
          padding-left: 10px;
          resize: none;
        }
        i.fa-grin-alt {
          top: 18%;
          right: 50px;
          font-size: 15px;
        }
        .selectEmoji {
          position: absolute;
          top: -55px;
          right: -10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          background-color: #f4f4f4;
          display: none;
          transform: scale(0.6);
        }
        button {
          width: 40px;
          height: 32px;
          i {
            font-size: 16px;
            line-height: 31px;
            padding-right: 2px;
          }
        }
        .commentWrapper {
          max-height: 450px;
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
          .conditional {
            img {
              width: 60%;
              margin-bottom: 30px;
            }
            p {
              // margin-top: 20px;
              font-weight: 500;
              color: #454545;
              font-size: 13px;
              margin-bottom: 0;
              span {
                color: $secondcolor;
              }
            }
          }
        }
        .comment {
          padding-left: 5px;
          img {
            width: 30px;
            height: 30px;
            &.commentImg {
              width: auto;
              height: auto;
              max-width: 200px;
              max-height: 150px;
            }
          }
          .commentInfo {
            h6 {
              font-size: 12px;
            }
            p {
              font-size: 12px;
              margin-bottom: -5px;
            }
            span.time {
              font-size: 9px;
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
import likesList from '../components/LikesList'
import lovesList from '../components/LovesList'
import moment from 'moment'
import vEmojiPicker from 'v-emoji-picker'
export default {
  data() {
    return {
      postDetails: '',
      userObject: '',
      commentInfo: '',
      commentImg: '', 
      commentImageName: '',
      postIdForDeleting: '',
      postIdForEditing: '',
      userIdForEditingPost: ''
    }
  },
  watch: {
    // CHANGE PAGE DATA WHEN CHOOSING ANOTHER NOTIFICATION TO SHOW ANOTHER POST REVIEWING
    async '$route' (to) {
      const getID = path => {
        var sp = path.split('/')
        return sp[sp.length - 1]
      }
      let tooo = getID(to.path);
      // let fromm = getID(from.path);
      await location.reload();
      firebase.firestore().collection('posts').doc(tooo).get().then(async doc => {
        this.postDetails = doc.data();
        doc.data().comments.forEach(async ({userId}, index) => {
          let user = await firebase.firestore().collection('users').doc(userId).get()
          this.postDetails.comments[index].user = user.data()
        })
        
      }).then(() => {
        firebase.firestore().collection('users').doc(this.postDetails.user_id).get().then(doc => {
          this.userObject = doc.data()
        })
      })
    }
  },
  methods: {
    // COMMENT ON THE POST 
    comment(postId) {
      document.getElementById('emojiPicker').classList.remove('show')
      document.getElementById('imageReview').classList.add('hide');
      document.getElementById('commentField').focus();
      if(this.commentInfo != '' || this.commentImg != '') {
        firebase.firestore().collection('posts').doc(postId).get().then(doc => {
          let comments = doc.data().comments
          console.log(comments)
          comments.unshift({
            commentText: this.commentInfo,
            userId: this.userObject.user_id,
            commentImg: this.commentImg,
            createdAt: Date.now()
          })
          firebase.firestore().collection('posts').doc(postId).update({
            comments
          })
          this.commentInfo = '';
          this.commentImg = '';
          this.commentImageName = '';
        })
      }
    },

    // CLICK ENTER TO POST A COMMENT
    typing(e, postId) {
      if(e.keyCode === 13) {
        e.preventDefault();
        this.comment(postId);
      }
    },

    // REACT LIKE TO THE POST
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
            console.log('first')
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
                console.log('you reacted love to this post before!')
                console.log(notif)
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
            console.log('second')
          }
        }
      })
      e.target.classList.toggle('likeClicked');

    },

    // REACT LOVE TO THE POST
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

    // GO TO LIKES LIST 
    toLikesList(postId) {
      this.$store.state.showLikesList = true;
      this.postIdForReactsList = postId;
    },

    // GOT TO LOVES LIST
    toLovesList(postId) {
      this.$store.state.showLovesList = true;
      this.postIdForReactsList = postId;
    },

    // CLICK THE INPUT FILE
    clicking() {
      document.getElementById('fieldForCommentImg').click();
    },

    // ADD IMAGE TO COMMENT
    commentImage(e) {
      document.getElementById('imageReview').classList.remove('hide');
      document.getElementById('commentField').focus();
      var commentImage = e.target.files[0];
      let commentImageName = (+new Date()) + '-' + commentImage.name
      var uploadCommentImage = firebase.storage().ref('commentImages/' + commentImageName).put(commentImage);
      uploadCommentImage.then(res => {
        if(res.state == 'success') {
          firebase.storage().ref('commentImages/' + commentImageName).getDownloadURL().then(URL => {
            this.commentImg = URL
            this.commentImageName = commentImageName
          })
        }
      })
    },

    // CANCEL SENDING COMMENT IMAGE SO IT WILL NOT BE SAVED IN FIREBASE
    cancelSendingChatImage() {
      document.getElementById('imageReview').classList.add('hide');
      document.getElementById('fieldForCommentImg').value = ''
      document.getElementById('commentField').focus();
      firebase.storage().ref('commentImages/' + this.commentImageName).delete();
      this.commentImg = '';
      this.commentImageName = '';
    },

    // SELECT EMOJI
    selectEmoji(emoji) {
      var ourTextArea = document.getElementById('commentField');
      var emojis = emoji.data
      ourTextArea.value += emojis
      this.commentInfo = ourTextArea.value
    },

    // CLICK TO SHOW AND HIDE EMOJIS
    showAndHideEmojis() {
      document.getElementById('emojiPicker').classList.toggle('show')
    },

    // FOCUS ON INPUT FIELD AFTER OPENENIG THE SELECT EMOJI 
    onFocus() {
      document.getElementById('emojiPicker').classList.remove('show')
    },

  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    
    // GET POST DETAILS AND THE DATA OF THE POST OWNER
    firebase.firestore().collection('posts').doc(this.$route.params.postId).get().then(doc => {
      if(doc.data()) {
        console.log(doc.data())
        doc.data().comments.forEach(async ({userId}, index) => {
          let user = await firebase.firestore().collection('users').doc(userId).get()
          this.postDetails.comments[index].user = user.data()
          this.$forceUpdate()
        })
        this.postDetails = doc.data();
        console.log(this.postDetails)

      } else {
        this.$router.push({path: '/404'})
      }
      
    }).then(() => {
      firebase.firestore().collection('users').doc(this.postDetails.user_id).get().then(doc => {
        this.userObject = doc.data()
      })
    })


    // LISTENING ON POSTS
    const self = this;
    // let unsubscribeReview = firebase.firestore().collection('posts').where('postId', '==', this.$route.params.postId).onSnapshot(snp => {
    //   snp.docChanges().forEach(async chng => {
    //     // POST DATA
    //     const post = chng.doc.data()
    //     // POSTS ARRAY
    //     const POSTS = this.$store.state.posts
    //     // FIND POST INDEX IN POSTS ARRAY (if exist)
    //     var index = POSTS.findIndex(Post => post.postId == Post.postId)
    //     // GET POST AUTHOR DATA
    //     const userDoc = await firebase.firestore().collection('users').doc(post.user_id).get()
    //     post.user = userDoc.data()


    //     firebase.firestore().collection('posts').doc(this.$route.params.postId).get().then(doc => {
    //       this.postDetails.likes = doc.data().likes
    //       this.postDetails.loves = doc.data().loves
    //       doc.data().likes.forEach(like => {
    //         if(like.userId == firebase.auth().currentUser.uid) {
    //           this.postDetails.liked = true
    //           this.postDetails.loved = false
    //         }
    //       })
    //       doc.data().loves.forEach(love => {
    //         if(love.userId == firebase.auth().currentUser.uid) {
    //           this.postDetails.loved = true
    //           this.postDetails.liked = false
    //         }
    //       })
    //     })

    //     // CHECK IF THE POST ALREADY FOUND IN THE POSTS ARRAY OR NOT
    //     if (index == -1) {
    //       // IF DOESN'T EXIST PUSH IT
    //       POSTS.push(post) // index == -1 means it doesn't exist...
    //     } else {
    //       // IF EXIST JUST UPDATE IT
    //       POSTS[index] = post
    //       if (this.postDetails.comments.length !== post.comments.length) {
    //         const user = await firebase.firestore().collection('users').doc(post.comments[0].userId).get()
    //         post.comments[0].user = user.data()
    //         this.postDetails.comments.unshift(post.comments[0])
    //       }
    //     }
    //     self.$forceUpdate();
    //     // THIS TIMEOUT BECAUSE VUE TAKES SOME TIME TO RENDER THE CLASSES AND STYLES AND WE WANNA SHOW THE LIKE BUTTON IN BLUE IF I'M ALREADY LIKED THE POST
    //     setTimeout(() => self.$forceUpdate(), 1000)
    //   })
    // })



    let unsubscribeReview = firebase.firestore().collection('posts').where('postId', '==', this.$route.params.postId).onSnapshot(snp => {
      snp.docChanges().forEach(async () => {
        // POST DATA
        const post = this.postDetails
        // GET POST AUTHOR DATA
        const userDoc = await firebase.firestore().collection('users').doc(post.user_id).get()
        post.user = userDoc.data()


        firebase.firestore().collection('posts').doc(this.$route.params.postId).get().then(doc => {
          this.postDetails.likes = doc.data().likes
          this.postDetails.loves = doc.data().loves
          doc.data().likes.forEach(like => {
            if(like.userId == firebase.auth().currentUser.uid) {
              this.postDetails.liked = true
              this.postDetails.loved = false
            }
          })
          doc.data().loves.forEach(love => {
            if(love.userId == firebase.auth().currentUser.uid) {
              this.postDetails.loved = true
              this.postDetails.liked = false
            }
          })
        })
        firebase.firestore().collection('posts').doc(this.$route.params.postId).get().then(async doc => {
          if (this.postDetails.comments.length !== doc.data().comments.length) {
            const USER = await firebase.firestore().collection('users').doc(doc.data().comments[0].userId).get();
            let user = USER.data();
            let newComment = {
              ...doc.data().comments[0],
              user
            }
            this.postDetails.comments.unshift(newComment)
          }
        })
        
        self.$forceUpdate();
        // THIS TIMEOUT BECAUSE VUE TAKES SOME TIME TO RENDER THE CLASSES AND STYLES AND WE WANNA SHOW THE LIKE BUTTON IN BLUE IF I'M ALREADY LIKED THE POST
        setTimeout(() => self.$forceUpdate(), 1000)
      })
    })

    this.$store.commit("changeUnsubscribeReview", unsubscribeReview);
  },
  components: {
    likesList,
    lovesList,
    vEmojiPicker
  },
  filters: {
    formatSentAt (time) {
      return moment(time).fromNow()
    }
  }
}
</script>