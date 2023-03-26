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
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ task.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>区域</ion-label>
            <ion-label>{{ task.area }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>位置</ion-label>
            <ion-label>{{ task.poslo }}&nbsp;,&nbsp;{{ task.posli }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>周期</ion-label>
            <ion-label>{{ cycleToText(task.cycle) }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>时长</ion-label>
            <ion-label>{{ task.duration }} &nbsp;小时</ion-label>
          </ion-item>
          <ion-item>
            <!-- 嵌入地图 -->
            <baidu-map class="map" ak="oRqbxhmwbE30ZgrbXzzUM19O6kyBjKQD" v="1.0" type="WebGL" :center="center"
              :mapStyle="mapStyle" :zoom="zoom" :scroll-wheel-zoom="true">
              <bm-marker :position="{ lng: center.lng, lat: center.lat }">
              </bm-marker>
            </baidu-map>
          </ion-item>
          <ion-item>
            <!-- 巨大的圆型按钮 -->
            <!-- 开始 -->
            <button id="btn" class="bigBtn" @click="btnClicked">正在加载</button>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonCardTitle,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { BaiduMap, BmMarker } from "vue-baidu-map-3x";
import { Geolocation } from '@capacitor/geolocation';

const mapStyle = ref({
  styleJson: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: {
        hue: "#007fff",
        saturation: 89,
      },
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: {
        color: "#ffffff",
      },
    },
  ],
});

const center = ref({ lng: 121, lat: 41 });
const zoom = ref(15);

const task = ref({
  tid: 0,
  name: "",
  content: "",
  area: "",
  poslo: 0,
  posli: 0,
  cycle: 0,
  state: 0,
  duration: 0,
});

const btnClicked = () => {
  const btn = document.getElementById("btn");
  if (btn?.innerText == "开始") {
    startTask();
  } else if (btn?.innerText == "继续") {
    setBtnToRunning(btn);
    startTimer();
  }
}
let timer: number;
const startTimer = () => {
  timer = setInterval(async () => {
    const position = await printCurrentPosition();
    const pos = {
      lng: position.poslo,
      lat: position.posli,
    };
    positions.push(pos);
    console.log(positions);
  }, 10000);
}

const stopTimer = () => {
  clearInterval(timer);
}

const tid = useRoute().query.tid;

const startTask = () => {
  // 从cookie中获取eid 查找cookie中name为eid的值
  const eid = document.cookie.split("; ").find((row) => row.startsWith("eid="))?.split("=")[1];
  const raw = JSON.stringify({
    "eid": eid,
    "tid": parseInt(tid as string)
  });
  const myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
  myHeaders.append("Content-Type", "application/json");

  // eslint-disable-next-line no-undef
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/employee/task/sign", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      // 获取result中的msg
      if (JSON.parse(result).msg === "签到成功" || JSON.parse(result).msg === "已签到") {
        const btn = document.getElementById("btn");
        if (btn) {
          setBtnToRunning(btn);
          startTimer();
        }
      }

    }
    )
    .catch(error => console.log('error', error));

}
const getTask = () => {

  fetch("http://127.0.0.1:6521/api/taskset/info?tid=" + tid)
    .then((response) => response.text())
    .then((result) => {
      task.value = JSON.parse(JSON.parse(result).data);
      // 经纬度数据处理
      center.value.lat = task.value.posli;
      center.value.lng = task.value.poslo;
      task.value.poslo = parseFloat(task.value.poslo.toFixed(4));
      task.value.posli = parseFloat(task.value.posli.toFixed(4));
    })
    .catch((error) => console.log("error", error));
};
getTask();

const loadStatus = () => {
  // 从cookie中获取eid 查找cookie中name为eid的值
  const eid = document.cookie.split("; ").find((row) => row.startsWith("eid="))?.split("=")[1];
  const raw = JSON.stringify({
    "eid": eid,
    "tid": parseInt(tid as string)
  });
  const myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
  myHeaders.append("Content-Type", "application/json");
  // eslint-disable-next-line no-undef
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:6521/api/employee/task/status", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      const btn = document.getElementById("btn");
      if (btn) {
        if (JSON.parse(result).msg === "未签到") {
          setBtnToStart(btn);
        } else if (JSON.parse(result).msg === "未完成") {
          setBtnToContinue(btn);
        }
      }
    })
    .catch(error => console.log('error', error));
}

loadStatus();

const positions: { lng: number, lat: number }[] = [];

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return {
    posli: coordinates.coords.latitude,
    poslo: coordinates.coords.longitude,
  };
};


const setBtnToStart = (btn: HTMLElement) => {
  btn.innerText = "开始";
  btn.style.backgroundColor = "var(--ion-color-primary)";
}

const setBtnToRunning = (btn: HTMLElement) => {
  btn.innerText = "正在进行";
  btn.style.backgroundColor = "var(--ion-color-warning)";
}

const setBtnToContinue = (btn: HTMLElement) => {
  btn.innerText = "继续";
  btn.style.backgroundColor = "var(--ion-color-success)";
}

const cycleToText = (cycle: number) => {
  switch (cycle) {
    case 0:
      return "每天";
    case 1:
      return "一周一次";
    case 2:
      return "一周两次";
    case 3:
      return "一周三次";
    case 4:
      return "一周四次";
    case 5:
      return "一周五次";
    case 6:
      return "一周六次";
    case 7:
      return "一月一次";
    case 8:
      return "一月两次";
    default:
      return "未知";
  }
};
</script>

<style scoped>
.bigBtn {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--ion-color-secondary);
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 5rem;
  margin: 15px auto;
  /* 变大变小动画 */
  animation: btnScale 10s infinite;
}

@keyframes btnScale {
  0% {
    transform: scale(0.95);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}

.bigBtn:hover {
  background-color: var(--ion-color-secondary);
}

.map {
  width: 100%;
  height: 200px;
  margin: auto;
}

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
