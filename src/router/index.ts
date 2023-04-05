import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home/task",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/work",
    component: () => import("@/views/WorkPage.vue"),
  },
  {
    path: "/home",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/task",
      },
      {
        path: "task",
        component: () => import("@/views/TaskPage.vue"),
      },
      {
        path: "employeeinfo",
        component: () => import("@/views/EmployeeInfoPage.vue"),
      },
      {
        path: "feedback",
        component: () => import("@/views/FeedbackPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const getCookies = () => {
    return document.cookie;
  };
  const cookies = getCookies();
  // 查找eid和passwd
  const eid = cookies.match(/eid=([^;]+)/);
  const passwd = cookies.match(/passwd=([^;]+)/);
  // 如果没有eid或者passwd,则跳转到登录页面
  if (!eid || !passwd) {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
