<template>
  <div>
    <div class="container">
      <h2>员工登录</h2>
      <form>
        <input type="text" placeholder="工号或电话号码">
        <input type="password" placeholder="密码">
        <button>登录</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoginView",
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style scoped></style>