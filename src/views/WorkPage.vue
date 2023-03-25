<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-button fill="clear" size="large" href="/home/task">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            任务</ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">任务</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';

</script>

<style scoped>
ion-button {
  --background: transparent;
  --background-activated: transparent;
  --background-hover: transparent;
  --background-focused: transparent;
  --color: #000;
  --padding-start: 0;
  /* 点击动画取消 */
  --ripple-color: transparent;
  --ripple-opacity: 0;
}

svg {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>