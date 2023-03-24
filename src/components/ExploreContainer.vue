<template>
  <div id="container">
    <ion-card v-if="tasks.length !== 0">
      <ion-card-header>
        <ion-card-title>任务列表</ion-card-title>
        <ion-card-subtitle>Task&nbsp;List</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list v-for="task in tasks" :key="task.tid">
          <ion-item>
            <ion-label>
              <TaskCard :task="task" />
            </ion-label>
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
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref } from 'vue';
import { alertController } from '@ionic/vue'
import { Empty } from 'vant';
import TaskCard from "@/components/TaskCard.vue";

const prop = defineProps({
  eid: String,
});
const tasks = ref<Array<{ tid: number, name: string, content: string, area: string, poslo: number, posli: number, cycle: number, state: number, duration: number }>>([]);
const getTaskList = () => {
  fetch(`http://localhost:6521/api/employee/task/list?eid=${prop.eid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const taskList = JSON.parse(data.data);
      tasks.value = [...taskList];
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

.list-md {
  margin-top: 0;
  margin-bottom: 5px;
  padding: 0;
}

.sc-ion-label-md-h {
  margin: 0;
  margin-bottom: 5px;
}


.item-native {
  padding: 0;
  margin: 0;
}

.item-inner {
  padding: 0;
}
</style>
