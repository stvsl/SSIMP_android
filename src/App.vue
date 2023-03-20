<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  created() {
    const getCookies = () => {
      return document.cookie;
    };
    const cookies = getCookies();
    // 查找eid和passwd
    const eid = cookies.match(/eid=([^;]+)/);
    const passwd = cookies.match(/passwd=([^;]+)/);
    // 如果没有eid或者passwd,则跳转到登录页面
    if (!eid || !passwd) {
      this.$router.push('/login');
    }
  },

});
</script>
