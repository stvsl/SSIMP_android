<template>
  <div class="login">
    <div class="header">
      <h1>北镇闾山巡查监测平台</h1>
    </div>
    <div class="container">
      <h2>请登录</h2>
      <input type="text" v-model="eidortel" placeholder="工号或电话号码">
      <input type="password" v-model="passwd" placeholder="密码">
      <div class="bottom">
        <button @click="login">登录</button>
        <a href="/passwdforgrt">忘记密码?</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { alertController } from '@ionic/vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const eidortel = ref('');
    const passwd = ref('');
    const login = () => {
      fetch('http://127.0.0.1:6521/api/account/employee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employid: eidortel.value,
          passwd: passwd.value,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          if (res.code === "SE200") {
            document.cookie = `eid=${eidortel.value};path=/`;
            document.cookie = `passwd=${passwd.value};path=/`;
            location.href = "/";
          } else {
            const alert = alertController.create({
              header: '登录失败',
              subHeader: '工号或密码错误',
              message: '请检查工号或密码是否正确',
              buttons: ['确定'],
            });
            (await alert).present();
          }
        }).catch(async () => {
          const alert = alertController.create({
            header: '登录失败',
            subHeader: '网络错误',
            message: '请检查网络是否正常',
            buttons: ['确定'],
          });
          (await alert).present();
        });
    }
    return {
      eidortel,
      passwd,
      login,
    };
  },
});
</script>

<style scoped>
.login {
  background-color: rgb(251, 251, 251);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  color: #00000092;
  text-align: center;
  padding: 20px 0;
  padding-top: 50px;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
}

.container {
  margin: auto;
  padding: 20px;
  margin-top: 0;
}

.container h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-left: 15px;
  font-weight: 800;
  color: #00000098;
  text-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
}

/* 圆角,毛玻璃输入框 */
input[type="text"],
input[type="password"] {
  width: 60%;
  border: none;
  padding: 10px 0;
  padding-left: 20px;
  font-size: 1.3rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 10px;
  margin-left: 20px;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  font-size: 1.3em;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}

button {
  background-color: var(--ion-color-primary);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1.3rem;
  cursor: pointer;
  width: 130px;
  margin-top: 20px;
  margin-left: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
}

button:hover {
  background-color: var(--ion-color-primary-shade);
}

.bottom {
  display: flex;
  justify-content: space-between;
}

a {
  color: #00000098;
  text-decoration: none;
  font-size: 1.2rem;
  display: inline-block;
  margin-top: 35px;
  margin-right: 30px;
}
</style>