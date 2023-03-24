<template>
  <div class="card">
    <div class="mainarea">
      <h1>{{ task?.name }}</h1>
      <h6>内容: &nbsp;{{ task?.content }}</h6>
      <h6>区域:&nbsp;{{ task?.area }}</h6>
      <div class="buttombar"><span>时长: {{ task?.duration }} 小时
          &nbsp;</span>任务周期:&nbsp;{{ cycleToText(task?.cycle) }}<span></span></div>
    </div>
    <div class="sidearea">
      <ion-button :href="'/work?tid=' + task?.tid">开始任务</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { defineProps } from 'vue';
defineProps({
  task: Object,
  default: () => ({
    tid: 0,
    name: '',
    content: '',
    area: '',
    poslo: 0,
    posli: 0,
    cycle: 0,
    state: 0,
    duration: 0,
  }),
});
const cycleToText = (cycle: number) => {
  switch (cycle) {
    case 0:
      return '每天';
    case 1:
      return '一周一次';
    case 2:
      return '一周两次';
    case 3:
      return '一周三次';
    case 4:
      return '一周四次';
    case 5:
      return '一周五次';
    case 6:
      return '一周六次';
    case 7:
      return '一月一次';
    case 8:
      return '一月两次';
    default:
      return '未知';
  }
}
</script>

<style scoped>
.card {
  display: flex;
  width: 100%;
  height: 100px;
  margin: 0;
  padding: 10px;
}

.item-inner {
  padding: 0;
}

.mainarea {
  flex: 1;
}

.mainarea h1 {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 5px;
}

.mainarea h6 {
  font-size: 0.8em;
}

.buttombar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.sidearea {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
}

ion-button {
  width: 100x;
  height: 35px;
  font-size: 1em;
}
</style>