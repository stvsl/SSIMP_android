<template>
  <div class="all">
    <div>
      <ion-card>
        <ion-card-header>
          <ion-card-title class="title">个人信息</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-thumbnail slot="end">
                <img :src="employee?.avatar" />
              </ion-thumbnail>
              <ion-label>头像</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>员工编号</ion-label>
              <ion-label slot="end">
                <p>{{ employee?.employid }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>姓名</ion-label>
              <ion-label slot="end">
                <p>{{ employee?.name }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>出生日期</ion-label>
              <ion-label slot="end">
                <p>{{ formatDate(employee?.birthDay) }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>入职日期</ion-label>
              <ion-label slot="end">
                <p>{{ formatDate(employee?.employDay) }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>身份证号</ion-label>
              <ion-label slot="end">
                <p>{{ employee?.idcard }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>家庭住址</ion-label>
              <ion-label slot="end">
                <p>{{ employee?.address }}</p>
              </ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-label>联系方式</ion-label>
              <ion-label slot="end">
                <p>{{ employee?.telephone }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </div>

    <ion-card>
      <ion-card-content>
        <van-config-provider :theme-vars="themeVars">
          <van-cell is-link @click="showPopup" title="修改密码"></van-cell>
          <van-cell is-link @click="logout" title="退出登录"></van-cell>
        </van-config-provider>
      </ion-card-content>
    </ion-card>
    <van-popup v-model:show="show" round :style="{ padding: '50px' }">
      <!-- 输入密码 -->
      <van-field v-model="oldpassword" type="password" label="旧密码:" />
      <van-field v-model="newpassword" type="password" label="新密码:" />
      <van-field v-model="confirmpassword" type="password" label="确认密码:" />
      <van-button type="primary" @click="confirm" class="left">确认</van-button>
      <van-button type="primary" @click="cancle" class="right">取消</van-button>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonList, IonThumbnail, alertController } from "@ionic/vue";
import { ref, reactive } from 'vue';

const themeVars = reactive({
  cellHorizontalPadding: '0px',
  cellFontSize: '16px',
  cellTextColor: '#000',
})
const cancle = () => {
  show.value = false;
};
const logout = () => {
  document.cookie.split(";").forEach(function (cookie) {
    const name = cookie.split("=")[0].trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });

  window.location.href = '/login';
};
const confirm = async () => {
  const passwd = document.cookie.split(';').filter((item) => item.includes('passwd'))[0].split('=')[1];

  if (oldpassword.value !== passwd) {
    const alert = alertController.create({
      header: '原密码错误',
      message: '请检查原密码是否正确',
      buttons: ['确定'],
    });
    (await alert).present();
    return;
  }
  if (newpassword.value !== confirmpassword.value) {
    const alert = alertController.create({
      header: '两次密码不一致',
      message: '请检查密码是否正确',
      buttons: ['确定'],
    });
    (await alert).present();
    return;
  }
  const my = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");

  // eslint-disable-next-line no-undef
  const requestO: RequestInit = {
    method: 'POST',
    headers: my,
    body: JSON.stringify({
      eid: document.cookie.split(';').filter((item) => item.includes('eid'))[0].split('=')[1],
      oldpasswd: oldpassword.value,
      newpasswd: newpassword.value,
    }),
    redirect: 'follow'
  };
  console.log(requestO);
  fetch("http://localhost:6521/api/employee/updatepasswd", requestO)
    .then(response => response.text())
    .then(async result => {
      if (JSON.parse(result).code === "SE200") {
        const alert = alertController.create({
          header: '修改成功',
          message: '请重新登录',
          buttons: ['确定'],
        });
        (await alert).present();
        document.cookie.split(";").forEach(function (cookie) {
          const name = cookie.split("=")[0].trim();
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });

        window.location.href = '/login';
      }
    })

};
const oldpassword = ref('');
const newpassword = ref('');
const confirmpassword = ref('');
const show = ref(false);
const showPopup = () => {
  show.value = true;
};
const myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");

// eslint-disable-next-line no-undef
const requestOptions: RequestInit = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};
const eid = document.cookie.split(';').filter((item) => item.includes('eid'))[0].split('=')[1];
interface Employee {
  employid: string;
  passwd: string;
  name: string;
  birthDay: string;
  employDay: string;
  idcard: string;
  address: string;
  telephone: string;
  bustPhoto: string;
  avatar: string;
}
const formatDate = (dateString?: string) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

const employee = ref<Employee>();
fetch("http://localhost:6521/api/employee/info?eid=" + eid, requestOptions)
  .then(response => response.text())
  .then(result => {
    employee.value = JSON.parse(JSON.parse(result).data);
  })
</script>

<style scoped>
.van-button {
  margin-top: 40px;
  height: 30px;
  width: 100px;
}

.right {
  float: right;
  margin-right: 20px;
}

.left {
  float: left;
  margin-left: 20px;
}

.all {
  height: 100%;
  background-color: rgba(169, 169, 169, 0.258);
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

.title {
  text-align: center;
}

ion-item {
  --padding-start: 0;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
