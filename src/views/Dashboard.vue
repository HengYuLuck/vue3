<script setup lang="ts">
import {onMounted, ref} from "vue";

const poem = ref<string>('加载中...')
const backgroundColor = ref<string>('#fff')

function getRandomPoem() {
  const poems = [
    "千山鸟飞绝，万径人踪灭。",
    "黄沙百战穿金甲，不破楼兰终不还。",
    "青青园中葵，朝露待日晞。",
    "落红不是无情物，化作春泥更护花。",
  ];
  return poems[Math.floor(Math.random() * poems.length)];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePage() {
  const bgColor = getRandomColor();
  const newPoem = getRandomPoem();

  backgroundColor.value = bgColor;
  poem.value = newPoem;

  setTimeout(updatePage, 5000); // 每5秒更新一次
}

onMounted(async () => {
  updatePage()
})
</script>

<template>
  <div id="app" class="w-full h-full" :style="{ backgroundColor: backgroundColor }">
    <p id="quote">{{ poem }}</p>
  </div>
</template>
