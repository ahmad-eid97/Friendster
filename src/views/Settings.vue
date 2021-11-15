<template>
  <div class="settings">
    <div class="row">
     
      <!-- LEFT SIDEBAR IN THE PAGE (LINKS AND PAGES) -->
      <div class="col-lg-3 profileInfoSectionMain">
        <div class="profileInfoSection">
          <i class="fas fa-times wrong"></i>
          <div class="imageP">
            <img :src="userObject.imgURL" alt="">
            <p class="online"></p>
          </div>
          <h6>{{userObject.nickname}}</h6>
          <p class="bio">{{userObject.bio}}</p>
          <hr>
          <div class="profileOptions">
            <ul class="list-unstyled">
              <li data-choose='general' class="active"><img src="../assets/icons/general.svg" alt=""> General</li>
              <li data-choose='security'><img src="../assets/icons/lock.svg" alt=""> Security</li>
              <li data-choose='account'><img src="../assets/icons/account.svg" alt=""> Account</li>
              <hr>
              <li><img src="../assets/icons/pages.svg" alt=""> pages</li>
              <li @click="$store.state.openHelpSettings = true"><img src="../assets/icons/help.svg" alt=""> Help</li>
              <hr>
              <li @click="logOut"><img src="../assets/icons/logout.svg" alt=""> Logout</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- MAIN PAGE -->
      <div class="col-lg-8 col-md-9">

        <!-- SET AND UPDATE GENERAL DATA -->
        <div class="setDataGeneral" id="general">
          <div class="show">
            <i class="fas fa-bars"></i>
          </div>
          <h5>General Settings</h5>
          <div class="field">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit">
                  <label for="">FIRST NAME:</label>
                  <input type="text" v-model="firstName">
                  <i class="far fa-user"></i>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit">
                  <label for="">LAST NAME:</label>
                  <input type="text" v-model="lastName">
                  <i class="far fa-user"></i>
                </div>
              </div>
              <div class="col-lg-9 col-md-9 col-sm-9">
                <div class="edit2">
                  <label for="">EMAIL:</label>
                  <input type="text" v-model="newEmail" placeholder="change your email">
                  <i class="far fa-envelope"></i>
                </div>
              </div>
              <div class="col-lg-10 col-md-10">
                <div class="inst">
                  <p>Type all your new data to update your general settings, your first or last name, your email and choose your country and city...</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit">
                  <label for="">CITY:</label>
                  <input type="text" v-model="city" placeholder="your city!">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit">
                  <label for="">COUNTRY:</label>
                  <input type="text" v-model="country" placeholder="your country!">
                  <i class="fas fa-globe-africa"></i>
                </div>
              </div>
              <button @click="saveChanges">save changes</button>
            </div>
          </div>
        </div>

        <!-- SET AND UPDATE SECURITY DATA -->
        <div class="setDataSecurity" id="security">
          <div class="show">
            <i class="fas fa-bars"></i>
          </div>
          <h5>Security Settings</h5>
          <div class="field">
            <div class="row">
              <div class="col-lg-9 col-md-9 col-sm-9">
                <div class="edit">
                  <label for="">CURRENT PASSWORD:</label>
                  <input type="password" v-model="currentPassword" placeholder="verify your current password" autocomplete="new-password">
                  <i class="fas fa-user-lock"></i>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit2">
                  <label for="">NEW PASSWORD:</label>
                  <input type="password" v-model="newPassword" placeholder="your new password!">
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit2">
                  <label for="">REPEAT PASSWORD:</label>
                  <input type="password" v-model="repeatedPassword" placeholder="repeat new password">
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <div class="col-lg-10">
                <p v-if='feedback' class="errorFeedback" style="color: #fa534e; margin-left: 1%; margin-bottom: -20px; padding-top: 10px; text-align: left"><i class="fas fa-exclamation-triangle"></i> {{feedback}}</p>
              </div>
              <div class="col-lg-10 col-md-10 col-sm-10">
                <div class="inst">
                  <p>Update your security settings, try to change your password to secure your account and use your phone number to protect your account...</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="edit3">
                  <label for="">PHONE NUMBER:</label>
                  <input type="number" v-model="phoneNumber" placeholder="secure with phone number!">
                  <i class="fas fa-mobile-alt"></i>
                </div>
              </div>
              <button @click="securityChanges">save changes</button>
            </div>
          </div>
        </div>

        <!-- ACCOUNT SECTION -->
        <div class="account" id="account">
          <div class="show">
            <i class="fas fa-bars"></i>
          </div>
          <h5>Personal Settings</h5>
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="far fa-user"></i>
                <h6>personal info</h6>
                <p>access your personal info</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fas fa-users"></i>
                <h6>friends</h6>
                <p>manage your friends list</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fas fa-camera-retro"></i>
                <h6>photos</h6>
                <p>add and delete photos</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fas fa-user-shield"></i>
                <h6>private</h6>
                <p>manage your private info</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fab fa-pagelines"></i>
                <h6>pages</h6>
                <p>easy access of your pages</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="far fa-address-card"></i>
                <h6>posts</h6>
                <p>manage your own posts</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="far fa-user-circle"></i>
                <h6>profile</h6>
                <p>manage your profile info</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fas fa-cloud-sun-rain"></i>
                <h6>cover</h6>
                <p>access your own cover info</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="opt">
                <i class="fas fa-user-cog"></i>
                <h6>account</h6>
                <p>access your account settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TO HELLP COMPONENT -->
    <help v-if="$store.state.openHelpSettings"></help>

  </div>
</template>

<style scoped lang="scss">
@import '../css/variables.scss';
@import '../css/mixins.scss';
/* SETTINGS PAGE STYLING */
.settings {
  background-color: #f4f4f4 !important;
  height: 100vh;
  margin-top: -50px;

  .show {
    position: absolute;
    display: none;
    transition: all 0.2s ease-in-out;
  }

  /* LEFT SIDEBAR IN THE PAGE (LINKS AND PAGES) */
  .profileInfoSection {
    height: 100%;
    width: 22%;
    background-color: #fff;
    position: fixed;
    border-right: 1px solid rgb(247, 247, 247);
    padding: 20px 0px 10px 0px;
    transition: all 0.2s ease-in-out;
    margin-top: 50px;
    &.side {
      margin-left: 0;
    }
    i.wrong {
      display: none;
    }
    .imageP {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: auto;
      margin-bottom: 5px;
      position: relative;
      background-color: #ccc;
      margin-top: 30px;
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
      margin-bottom: 30px;
      &.bio {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .profileOptions {
      height: 60%;
      margin-top: 30px;
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
        margin-top: 0px;
        margin-left: 15px;
        li {
          margin-bottom: 10px;
          text-align: left;
          color: rgb(146, 145, 145);
          padding: 7px 10px;
          cursor: pointer;
          font-size: 15px;
          border-radius: 0 5px 5px 0;
          margin-right: 10px;
          i {
            margin-right: 10px;
          }
          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }
          &:hover {
            color: #000;
            font-weight: 500;
          }
          &.active {
            background-color: rgb(238, 238, 238);
            color: #000;
            font-weight: 500;
            border-left: 3px solid $maincolor;
          }
        }
      }
    }
  }

  /* SET AND UPDATE GENERAL DATA AREA */
  .setDataGeneral {
    margin-top: 100px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #ccc;
    display: block;
    h5 {
      text-align: left;
      color: rgb(136, 136, 136);
      font-weight: 400;
      margin-bottom: 20px;
    }
    .field {
      .edit {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        input {
          display: block;
          width: 90%;
          outline: none;
          border: none;
          padding-left: 22px;
          color: $textcolor;
        }
        label {
          text-align: left !important;
          display: block;
          margin-bottom: 0;
          color: rgb(139, 138, 138);
          font-weight: bold;
          font-size: 11px;
        }
        i {
          position: absolute;
          top: 31px;
          left: 10px;
          color: rgb(160, 158, 158);
        }
      }
      .edit2 {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        position: relative;
        input {
          display: block;
          width: 90%;
          outline: none;
          border: none;
          padding-left: 22px;
          color: $textcolor;
        }
        label {
          text-align: left !important;
          display: block;
          margin-bottom: 0;
          color: rgb(139, 138, 138);
          font-weight: bold;
          font-size: 11px;
        }
        i {
          position: absolute;
          top: 31px;
          left: 10px;
          color: rgb(160, 158, 158);
        }
      }
      .inst {
        margin-top: 20px;
        p {
          text-align: left;
          font-weight: 500;
        }
      }
      button {
        background-color: $maincolor;
        color: #fff;
        border: none;
        width: 130px;
        height: 40px;
        margin-left: 2%;
        border-radius: 5px;
        outline: none;
        &:hover {
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  /* SET AND UPDATE SECURITY DATA AREA */
  .setDataSecurity {
    margin-top: 100px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #ccc;
    display: none;
    h5 {
      text-align: left;
      color: rgb(136, 136, 136);
      font-weight: 400;
      margin-bottom: 20px;
    }
    .field {
      .edit {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        input {
          display: block;
          width: 90%;
          outline: none;
          border: none;
          padding-left: 28px;
          color: $textcolor;
        }
        label {
          text-align: left !important;
          display: block;
          margin-bottom: 0;
          color: rgb(139, 138, 138);
          font-weight: bold;
          font-size: 11px;
        }
        i {
          position: absolute;
          top: 31px;
          left: 10px;
          color: rgb(160, 158, 158);
        }
      }
      .edit2 {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        position: relative;
        input {
          display: block;
          width: 90%;
          outline: none;
          border: none;
          padding-left: 23px;
          color: $textcolor;
        }
        label {
          text-align: left !important;
          display: block;
          margin-bottom: 0;
          color: rgb(139, 138, 138);
          font-weight: bold;
          font-size: 11px;
        }
        i {
          position: absolute;
          top: 31px;
          left: 10px;
          color: rgb(160, 158, 158);
        }
      }
      .inst {
        margin-top: 20px;
        p {
          text-align: left;
          font-weight: 500;
        }
      }
      .edit3 {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        position: relative;
        input {
          display: block;
          width: 90%;
          outline: none;
          border: none;
          padding-left: 21px;
          color: $textcolor;
        }
        label {
          text-align: left !important;
          display: block;
          margin-bottom: 0;
          color: rgb(139, 138, 138);
          font-weight: bold;
          font-size: 11px;
        }
        i {
          position: absolute;
          top: 31px;
          left: 10px;
          color: rgb(160, 158, 158);
        }
      }
      button {
        background-color: $maincolor;
        color: #fff;
        border: none;
        width: 130px;
        height: 40px;
        margin-left: 2%;
        border-radius: 5px;
        outline: none;
        margin-top: 20px;
        &:hover {
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  /* ACCOUNT DATA AREA */
  .account {
    margin-top: 100px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #ccc;
    display: none;
    h5 {
      text-align: left;
      color: rgb(136, 136, 136);
      font-weight: 400;
      margin-bottom: 20px;
    }
    .opt {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px 10px 10px 20px;
      text-align: left;
      cursor: pointer;
      box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
      &:hover {
        h6 {
          color: $maincolor;
        }
        i {
          color: $maincolor;
          background-color: #fff;
          border: 1px solid #ccc;
        }
      }
      i {
        width: 40px;
        height: 40px;
        background-color: rgb(241, 241, 241);
        border-radius: 50%;
        line-height: 38px;
        text-align: center;
        margin-bottom: 5px;
        transition: all 0.3s ease-in-out;
        border: 1px solid transparent;
      }
      h6, p {
        margin-bottom: 0;
      }
      h6 {
        font-size: 15px;
      }
      p {
        font-size: 13px;
        color: $textcolor
      }
    }
  }

  /* MOBILE SCREEN VIEW */
  @include mb {
    .profileInfoSection {
      z-index: 9;
      width: 250px;
      margin-left: -250px;
      i.wrong {
        display: block;
        position: absolute;
        top: 3%;
        right: 10%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      .imageP {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
        p.online {
          position: absolute;
          width: 17px;
          height: 17px;
          background-color: #1CE589;
          border-radius: 50%;
          top: 0;
          right: 0;
          border: 3px solid #fff;
        }
      }
      h6 {
        font-size: 16px;
      }
      p.bio {
        font-size: 11px;
      }
      .profileOptions {
        ul {
          li {
            font-size: 13px;
            img {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
    .setDataGeneral {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        font-size: 17px;
        margin-left: 40px;
      }
      .field {
        .edit {
          input {
            font-size: 14px;
            padding-left: 24px;
            padding-left: 18px;
          }
          label {
            font-size: 9px;
          }
          i {
            top: 28px;
            left: 10px;
            font-size: 14px;
          }
        }
        .edit2 {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          input {
            font-size: 14px;
            padding-left: 24px;
            padding-left: 18px;
          }
          label {
            font-size: 9px;
          }
          i {
            top: 28px;
            left: 10px;
            font-size: 14px;
          }
        }
        .inst {
          margin-top: 15px;
          p {
            font-size: 13px;
          }
        }
        button {
          width: 110px;
          height: 35px;
          font-size: 13px;
          margin-left: 4%;
        }
      }
    }
    .setDataSecurity {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        font-size: 17px;
        margin-left: 40px;
      }
      .field {
        .edit {
          input {
            font-size: 14px;
            padding-left: 24px;
          }
          label {
            font-size: 9px;
          }
          i {
            top: 29px;
            left: 10px;
            font-size: 14px;
          }
        }
        .edit2 {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 15px;
          input {
            font-size: 14px;
            padding-left: 24px;
            padding-left: 22px;
          }
          label {
            font-size: 9px;
          }
          i {
            top: 29px;
            left: 10px;
            font-size: 14px;
          }
        }
        .inst {
          margin-top: 15px;
          p {
            font-size: 13px;
          }
        }
        .edit3 {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          input {
            display: block;
            width: 90%;
            outline: none;
            border: none;
            padding-left: 28px;
            color: $textcolor;
            padding-left: 20px;
            font-size: 14px;
          }
          label {
            text-align: left !important;
            display: block;
            margin-bottom: 0;
            color: rgb(139, 138, 138);
            font-weight: bold;
            font-size: 11px;
          }
          i {
            position: absolute;
            top: 31px;
            left: 10px;
            color: rgb(160, 158, 158);
          }
        }
        button {
          width: 110px;
          height: 35px;
          font-size: 13px;
          margin-left: 4%;
        }
      }
    }
    .account {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        font-size: 17px;
        text-align: left;
        margin-left: 40px;
      }
      .opt {
        &:hover {
          h6 {
            color: $maincolor;
          }
          i {
            color: $maincolor;
            background-color: #fff;
            border: 1px solid #ccc;
          }
        }
        i {
          width: 40px;
          height: 40px;
          background-color: rgb(241, 241, 241);
          border-radius: 50%;
          line-height: 38px;
          text-align: center;
          margin-bottom: 5px;
          transition: all 0.3s ease-in-out;
          border: 1px solid transparent;
        }
        h6, p {
          margin-bottom: 0;
        }
        h6 {
          font-size: 15px;
        }
        p {
          font-size: 13px;
          color: $textcolor
        }
      }
    }
    .errorFeedback {
      font-size: 12px;
      margin-top: -10px;
      padding-bottom: 10px;
    }
    .inst {
      p {
        font-size: 11px;
      }
    }
  }

  /* SMALL SCREEN VIEW */
  @include sm {
    .profileInfoSection {
      z-index: 9;
      width: 250px;
      margin-left: -250px;
      img {
        width: 20px;
        height: 20px;
      }
      &.side {
        margin-left: 0;
      }
      i.wrong {
        display: block;
        position: absolute;
        top: 3%;
        right: 10%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      .imageP {
        width: 65px;
        height: 65px;
        img {
          width: 100%;
          height: 100%;
        }
        p.online {
          position: absolute;
          width: 18px;
          height: 18px;
          background-color: #1CE589;
          border-radius: 50%;
          top: 0;
          right: 0;
          border: 3px solid #fff;
        }
      }
      h6 {
        font-size: 18px;
      }
      p.bio {
        font-size: 12px;
      }
      .profileOptions {
        ul {
          li {
            font-size: 14px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
    .setDataGeneral {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        font-size: 19px;
        margin-left: 40px;
      }
      .field {
        .edit {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 20px;
          input {
            display: block;
            width: 90%;
            outline: none;
            border: none;
            padding-left: 22px;
            color: $textcolor;
          }
          label {
            text-align: left !important;
            display: block;
            margin-bottom: 0;
            color: rgb(139, 138, 138);
            font-weight: bold;
            font-size: 11px;
          }
          i {
            position: absolute;
            top: 30px;
            left: 10px;
            color: rgb(160, 158, 158);
          }
        }
        .edit2 {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          input {
            display: block;
            width: 90%;
            outline: none;
            border: none;
            padding-left: 22px;
            color: $textcolor;
          }
          label {
            text-align: left !important;
            display: block;
            margin-bottom: 0;
            color: rgb(139, 138, 138);
            font-weight: bold;
            font-size: 11px;
          }
          i {
            position: absolute;
            top: 30px;
            left: 10px;
            color: rgb(160, 158, 158);
          }
        }
        .inst {
          margin-top: 20px;
          p {
            text-align: left;
            font-weight: 500;
          }
        }
        button {
          background-color: $maincolor;
          color: #fff;
          border: none;
          width: 130px;
          height: 40px;
          margin-left: 2%;
          border-radius: 5px;
          outline: none;
          &:hover {
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    .setDataSecurity {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        margin-left: 40px;
      }
    }
    .account {
      margin-top: 100px;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      border: 1px solid #ccc;
      display: none;
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .show {
        display: block;
        left: 28px;
        top: 24px;
        z-index: 2;
        i {
          font-size: 17px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 5px 5px 5px 5px;
          cursor: pointer;
        }
      }
      h5 {
        text-align: left;
        color: rgb(136, 136, 136);
        font-weight: 400;
        margin-bottom: 20px;
        margin-left: 40px;
      }
      .opt {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        text-align: left;
        cursor: pointer;
        box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
        &:hover {
          h6 {
            color: $maincolor;
          }
          i {
            color: $maincolor;
            background-color: #fff;
            border: 1px solid #ccc;
          }
        }
        i {
          width: 40px;
          height: 40px;
          background-color: rgb(241, 241, 241);
          border-radius: 50%;
          line-height: 38px;
          text-align: center;
          margin-bottom: 5px;
          transition: all 0.3s ease-in-out;
          border: 1px solid transparent;
        }
        h6, p {
          margin-bottom: 0;
        }
        h6 {
          font-size: 15px;
        }
        p {
          font-size: 13px;
          color: $textcolor;
        }
      }
    }
    .errorFeedback {
      font-size: 15px;
    }
    .inst {
      p {
        font-size: 15px;
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
          margin-top: 5px;
          margin-left: 5px;
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
    .setDataGeneral {
      .field {
        .edit {
          i {
            left: 10px;
          }
        }
        .edit2 {
          i {
            left: 10px;
          }
        }
        .inst {
          margin-top: 20px;
          p {
            text-align: left;
            font-weight: 500;
          }
        }
        button {
          background-color: $maincolor;
          color: #fff;
          border: none;
          width: 130px;
          height: 40px;
          margin-left: 2%;
          border-radius: 5px;
          outline: none;
          &:hover {
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    .setDataSecurity {
      .field {
        .edit {
          i {
            left: 10px;
          }
        }
        .edit2 {
          i {
            left: 10px;
          }
        }
        .edit3 {
          i {
            left: 11px;
          }
        }
      }
    }
  }
}
</style>

<script>
import firebase from 'firebase'
import help from '../components/Help'
import $ from 'jquery'
export default {
  data() {
    return {
      userObject: '',
      firstName: '',
      lastName: '',
      newEmail: '',
      city: '',
      country: '',
      currentPassword: '',
      newPassword: '',
      repeatedPassword: '',
      phoneNumber: '',
      feedback: ''
    }
  },
  methods: {
    // SAVE GENERAL DATA
    saveChanges() {
      let currentUser = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').doc(currentUser).update({
        nickname: this.firstName + ' ' + this.lastName,
        email: this.newEmail,
        city: this.city,
        country: this.country
      }).then(() => {
        firebase.firestore().collection('users').doc(currentUser).get().then(doc => {
          this.userObject = doc.data();
        })
      })
    },
    
    // SAVE SECURITY DATA
    securityChanges(newPassword, currentPassword) {
      newPassword = this.newPassword;
      currentPassword = this.currentPassword;
      let currentUser = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
      if(credential != null) {
        if(this.newPassword.match(this.repeatedPassword)) {
          firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
            firebase.auth().currentUser.updatePassword(newPassword).then(() => {
              console.log('password updated');
              var currentUserUID = firebase.auth().currentUser.uid;
              firebase.firestore().collection('users').doc(currentUserUID).update({
                phone: this.phoneNumber
              })
            })
          }).catch(() => {
            this.feedback = 'The current password you entered is invalid.'
          })
        } else {
          this.feedback = "new password does't match!";
        }
      } else {
        console.log('wrong password');
      }
    },
    
    // LOGOUT METHOD FROM 'VUEX'
    logOut() {
      this.$store.dispatch('logOut');
    },
  },
  mounted() {
    // JQUERY FUNCTIONS OF NAVIGATION
    $('.profileOptions li').on('click', function() {
      $(this).addClass('active').siblings().removeClass('active');
      $('#' + $(this).attr('data-choose')).css({display: 'block'}).siblings().css({display: 'none'})
      $('i.wrong').click();
    })

    // SHOW SIDE BAR IN SMALL AND MOBILE SCREENS
    $('.show i').on('click', function() {
      $('.profileInfoSection').toggleClass('side');
    })
    $('i.wrong').on('click', function() {
      $('.profileInfoSection').toggleClass('side')
    })

  },
  created() {
    // WHEN OPEN THE PAGE YOU WILL FIND THE TOP OF IT
    window.scrollTo(0, 0)
    
    // CHANGE SETTINGS PAGE TITLE
    document.title = 'Settings | Friendster'

    /* كل اما تدخل صفحه غير البروفايل والتايم لاين هتلاقيه عمل واتش علي البوستات وهتعمل مشاكل ف الفانكشن دي هنا بتلغي 
    الواتش اول ما تدخل الصفحه دي علشان لما ترجع تاني ف التايم لاين او البروفايل متظهرلكش مشاكل الواتش اللي اتعمل من غير ما تاخد لبالك */ 
    this.$store.state.unsubscribe();
    this.$store.state.unsubscribeProfile();
    this.$store.state.unsubscribeReview();

    // CURRENT USER DATA
    let currentUser = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(currentUser).get().then(doc => {
      this.userObject = doc.data();
      this.firstName = doc.data().nickname.split(' ')[0];
      this.lastName = doc.data().nickname.split(' ')[1];
      this.newEmail = doc.data().email;
      this.city = doc.data().city;
      this.country = doc.data().country;
    })

    // CHECK IF CHAT DELETED AND OPEN START CHATING COMPONENT
    firebase.firestore().collection('chats').get().then(docs => {
      docs.forEach(doc => {
        console.log(docs)
        if(doc.data().deleted[firebase.auth().currentUser.uid] == false && (doc.data().users[0] == firebase.auth().currentUser.uid || doc.data().users[1] == firebase.auth().currentUser.uid)) {
          this.$store.state.chats.push(doc.data())
        }
      })
    }).then(() => {
      if(this.$store.state.chats.length > 0) {
        this.$store.state.firstChatRoomId = this.$store.state.chats[0].chatId
        console.log(this.$store.state.chats)
        console.log(this.$store.state.chats[0].chatId)
      } 
      else {
        this.$store.state.firstChatRoomId = 'startChating'
      }
    })
  },
  components: {
    help
  }
}
</script>