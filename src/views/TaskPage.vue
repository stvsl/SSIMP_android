<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>北镇闾山巡查监测平台</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">任务</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer :eid="eid" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
// 读取cookie中的eid
const eid = document.cookie.split(';').filter((item) => item.includes('eid'))[0].split('=')[1];
</script>

<style scoped>
ion-title {
  font-weight: 600;
}

ion-content {
  --background: #f4f5f8;
}
</style>
