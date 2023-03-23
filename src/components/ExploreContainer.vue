<template>
  <div id="container">
    <ion-card v-if="tasks.length !== 0">
      <ion-card-header>
        <ion-card-title>任务列表</ion-card-title>
        <ion-card-subtitle>Task&nbsp;List</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list v-for="task in tasks" :key="task">
          <ion-item>
            111
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
    <Empty v-else description="暂时没有任务哦~" image-size="200">
      <p>请先向管理员申请任务或者点击下方按钮重试</p>
      <button round class="bottom-button" @click="getTaskList">刷新</button>
    </Empty>
  </div>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem } from '@ionic/vue';
import { ref } from 'vue';
import { alertController } from '@ionic/vue'
import { Empty } from 'vant';

const prop = defineProps({
  eid: String,
});
const tasks = ref([]);
const getTaskList = () => {
  fetch(`http://localhost:6521/api/employee/task/list?eid=${prop.eid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      tasks.value = JSON.parse(data.data);
    }).catch(async () => {
      const alert = alertController.create({
        header: '加载任务失败',
        subHeader: '网络错误',
        message: '请检查网络是否正常',
        buttons: ['确定'],
      });
      (await alert).present();
    });
}
getTaskList();
</script>

<style scoped>
#container {
  width: 100%;
}

ion-item {
  --padding-start: 0;
}

ion-card-title {
  font-size: 1.5rem;
  font-weight: 600;
}

ion-card-subtitle {
  font-size: 1rem;
  font-weight: 400;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

.bottom-button {
  width: 140px;
  height: 40px;
  background-color: var(--ion-color-primary);
  border-radius: 10px;
  color: aliceblue;
  font-size: 1em;
  display: block;
  margin: auto;
  margin-top: 40px;
}

.van-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>
