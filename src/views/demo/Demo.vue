<script setup lang="ts">
import {onMounted} from "vue";
import {getTableData} from "@/views/demo/demoService";

async function getData() {
  const res = await getTableData()
  const {code, data, msg} = res.data
  if (code === 200)
    console.log('成功')
  else
    console.log('失败')
}


onMounted(() => {
  getData()
})
</script>

<template>
  <div class="tw-flex tw-item-center tw-justify-center tw-m-24 tw-bg-amber-300">
    <a-button type="primary" @click="getData">Primary Button</a-button>
  </div>
</template>

<style scoped>

</style>
