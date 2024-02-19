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
          <ion-title size="large">反馈</ion-title>
        </ion-toolbar>
      </ion-header>
      <FeedBack></FeedBack>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import FeedBack from '@/components/FeedBack.vue';
import {  IonPage, IonHeader, IonToolbar, IonTitle, IonContent  } from "@ionic/vue";

</script>

<style scoped></style>