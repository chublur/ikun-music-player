<template>
  <div class="box">
    <div class="content">
      <div class="text">欢迎登录</div>
      <div>
        <div class="field">
          <input type="text" v-model="phone" />
          <span class="fas fa-user"></span>
          <label>请输入手机号码</label>
        </div>
        <div class="field">
          <input type="password" v-model="pwd" />
          <span class="fas fa-lock"></span>
          <label>请输入密码</label>
        </div>
        <div class="forgot-pass"></div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getloginuser } from "@/request/api/home";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("getlogin", {
        phone: this.phone,
        password: this.pwd,
      });
      console.log(res);
      if (res.data.code===200) {
        this.$store.commit('updateislogin',true);
        this.$store.commit('updatetoken',res.data.token);
        let result= await getloginuser(res.data.account.id);
        console.log('aa',result);
        this.$store.commit('updateuser',result);
        this.$router.push('/infouser')
      }else{
        alert('手机号码或者密码错误！');
        this.password='';
      }
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  position: relative;
  height: 19rem;
  width: 100%;
  background: linear-gradient(135deg, #09f, #f66, #f90, #3c9, #66f) top
    center/100% 200%;
  text-align: center;
  overflow: hidden;
}

.content {
  position: absolute;
  top: 2rem;
  width: 100%;
  z-index: 999;
  padding: 0.8rem 0.6rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0.2rem;
  box-shadow: -0.06rem -0.06rem 0.14rem #ffffff73,
    0.04rem 0.04rem 0.1rem rgba(94, 104, 121, 0.288);
}

.content .text {
  font-size: 0.66rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: #595959;
}

.field {
  height: 1rem;
  width: 100%;
  display: flex;
  position: relative;
}

.field:nth-child(2) {
  margin-top: 0.4rem;
}

.field input {
  height: 100%;
  width: 100%;
  padding-left: 0.9rem;
  outline: none;
  border: none;
  font-size: 0.36rem;
  background: #dde1e7;
  color: #595959;
  border-radius: 0.5rem;
  box-shadow: inset 0.04rem 0.04rem 0.1rem #babecc,
    inset -0.1rem -0.1rem 0.2rem #ffffff73;
}

.field input:focus {
  box-shadow: inset 0.02rem 0.02rem 0.04rem #babecc,
    inset -0.02rem -0.02rem 0.04rem #ffffff73;
}

.field span {
  position: absolute;
  color: #595959;
  width: 1rem;
  line-height: 1rem;
}

.field label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.9rem;
  pointer-events: none;
  color: #666666;
}

.field input:valid ~ label {
  opacity: 0;
}

.forgot-pass {
  text-align: left;
  margin: 0.2rem 0 0.2rem 0.1rem;
}

.forgot-pass a {
  font-size: 0.32rem;
  color: #3498db;
  text-decoration: none;
}

.forgot-pass:hover a {
  text-decoration: underline;
}

button {
  margin: 0.8rem 0;
  width: 100%;
  height: 1rem;
  font-size: 0.36rem;
  line-height: 1rem;

  font-weight: 600;

  background: #dde1e7;

  border-radius: 0.5rem;

  border: none;

  outline: none;

  cursor: pointer;

  color: #595959;

  box-shadow: 0.04rem 0.04rem 0.1rem #babecc, -0.1rem -0.1rem 0.2rem #ffffff73;
}

button:focus {
  color: #3498db;

  box-shadow: inset 0.04rem 0.04rem 0.1rem #babecc,
    inset -0.1rem -0.1rem 0.2rem #ffffff73;
}

.sign-up {
  margin: 0.2rem 0;

  color: #595959;

  font-size: 0.32rem;
}

.sign-up a {
  color: #3498db;

  text-decoration: none;
}

.sign-up a:hover {
  text-decoration: underline;
}
</style>