<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

ion-app>* {
  font-family: 'Montserrat', sans-serif;
}
</style>
