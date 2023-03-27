<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet> </ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home/task">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>任务</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="tab3" href="/home/feedback">
          <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
          <ion-label>反馈</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/home/employeeinfo">
          <ion-icon :icon="person"></ion-icon>
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { person, list, chatboxEllipsesOutline } from 'ionicons/icons';
</script>
<style scoped>
svg {
  background-color: aqua;
}
</style>