<script lang="ts" setup>
</script>
<template>
  <div class="container">
    <a-button type="primary">Primary Button</a-button>
    <h1 class="not-found-text">404 - 页面未找到</h1>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.not-found-text {
  font-size: 24px;
  margin-top: 20px;
}
</style>
