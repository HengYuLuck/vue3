<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from 'vue'

const props = defineProps<{
  showPreview: {
    type: boolean
    default: false
  }
  imgUrl: {
    type: string
    default: ''
  }
}>()
const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const scale = ref<number>(1)
const offset = ref<any>({ left: 0, top: 0 })
const origin = ref<string>('center')
const initialData = ref<any>({ x: 0, y: 0 })
const startPoint = ref<any>({ x: 0, y: 0 }) // 记录初始触摸点位
const isTouching = ref<boolean>(false) // 标记是否正在移动
const isMove = ref<boolean>(false) // 正在移动中，与点击做区别
const touches = new Map() // 触摸点数组
const lastDistance = ref<number>(0)
const lastScale = ref<any>(1) // 记录下最后的缩放值
const scaleOrigin = ref<any>({ x: 0, y: 0 })

const { innerWidth: winWidth, innerHeight: winHeight } = window
const cloneEl = ref<any>(null)
const originalEl = ref<any>(null)
const dialog = ref<any>(false)

function cancelDialog() {
  emit('cancel')
}

function handleItemClick() {
  if (originalEl.value.classList) {
    cloneEl.value = originalEl.value
    openPreview()
  }
}

function openPreview() {
  dialog.value = true
  // 消除偏差
  const { offsetWidth, offsetHeight } = originalEl
  const { top, left } = originalEl.value.getBoundingClientRect()
  // 移动图片到屏幕中心位置
  const originalCenterPoint = { x: offsetWidth / 2 + left, y: offsetHeight / 2 + top }
  const winCenterPoint = { x: winWidth / 2, y: winHeight / 2 }
  const offsetDistance = { left: winCenterPoint.x - originalCenterPoint.x + left, top: winCenterPoint.y - originalCenterPoint.y + top }
  const diffs = { left: ((adaptScale() - 1) * offsetWidth) / 2, top: ((adaptScale() - 1) * offsetHeight) / 2 }
  setTimeout(() => {
    changeStyle(originalEl.value, ['transition: all 0s', 'left: 0', 'top: 0', `transform: translate(${offsetDistance.left - diffs.left}px, ${offsetDistance.top - diffs.top}px)`])
    offset.value = { left: offsetDistance.left - diffs.left, top: offsetDistance.top - diffs.top } // 记录值
    record()
  }, 300)
}

// 滚轮缩放
const zoom = (event) => {
  if (!event.deltaY)
    return

  event.preventDefault()
  origin.value = `${event.offsetX}px ${event.offsetY}px`

  if (event.deltaY < 0)
    scale.value += 0.1 // 放大
  else if (event.deltaY > 0)
    scale.value >= 0.2 && (scale.value -= 0.1) // 缩小

  changeStyle(originalEl.value, ['transition: all .15s', `transform-origin: ${origin.value}`, `transform: translate(${`${offset.value.left}px`}, ${`${offset.value.top}px`}) scale(${scale.value})`])
}

window.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  touches.set(e.pointerId, e) // TODO: 点击存入触摸点
  isTouching.value = true
  startPoint.value = { x: e.clientX, y: e.clientY }
  if (touches.size === 2) { // TODO: 判断双指触摸，并立即记录初始数据
    lastDistance.value = getDistance()
    lastScale.value = scale
  }
})
window.addEventListener('pointerup', (e) => {
  touches.delete(e.pointerId) // TODO: 抬起移除触摸点
  if (touches.size <= 0) {
    isTouching.value = false
  }
  else {
    const touchArr = Array.from(touches)
    // 更新点位
    startPoint.value = { x: touchArr[0][1].clientX, y: touchArr[0][1].clientY }
  }
  setTimeout(() => {
    isMove.value = false
  }, 300)
})
window.addEventListener('pointermove', (e) => {
  e.preventDefault()
  if (isTouching.value) {
    isMove.value = true
    if (touches.size < 2) { // 单指滑动
      offset.value = {
        left: offset.value.left + (e.clientX - startPoint.value.x),
        top: offset.value.top + (e.clientY - startPoint.value.y),
      }
      changeStyle(originalEl.value, ['transition: all 0s', `transform: translate(${`${offset.value.left}px`}, ${`${offset.value.top}px`}) scale(${scale.value})`, `transform-origin: ${origin.value}`])
      // 更新点位
      startPoint.value = { x: e.clientX, y: e.clientY }
    }
    else {
      // 双指缩放
      touches.set(e.pointerId, e)
      const ratio = getDistance() / lastDistance.value
      scale.value = ratio * lastScale.value
      offset.value = getOffsetCorrection()
      if (scale.value < initialData.value.scale)
        reduction()

      changeStyle(originalEl.value, ['transition: all 0s', `transform: translate(${`${offset.value.left}px`}, ${`${offset.value.top}px`}) scale(${scale.value})`, `transform-origin: ${origin.value}`])
    }
  }
})
window.addEventListener('pointercancel', (e) => {
  touches.clear() // 可能存在特定事件导致中断，真机操作时 pointerup 在某些边界情况下不会生效，所以需要清空
})

// 获取距离
function getDistance() {
  const touchArr = Array.from(touches)
  if (touchArr.length < 2)
    return 0

  const start = touchArr[0][1]
  const end = touchArr[1][1]
  return Math.hypot(end.x - start.x, end.y - start.y)
}

// 获取中心改变的偏差
function getOffsetCorrection(x = 0, y = 0) {
  const touchArr = Array.from(touches)
  if (touchArr.length === 2) {
    const start = touchArr[0][1]
    const end = touchArr[1][1]
    x = (start.offsetX + end.offsetX) / 2
    y = (start.offsetY + end.offsetY) / 2
  }
  origin.value = `${x}px ${y}px`
  const offsetLeft = (scale.value - 1) * (x - scaleOrigin.value.x) + offset.value.left
  const offsetTop = (scale.value - 1) * (y - scaleOrigin.value.y) + offset.value.top
  scaleOrigin.value = { x, y }
  return { left: offsetLeft, top: offsetTop }
}

// 记录初始化数据
function record() {
  initialData.value = Object.assign({}, { offset, origin, scale })
}

// 计算自适应屏幕的缩放值
function adaptScale() {
  const { offsetWidth: w, offsetHeight: h } = originalEl
  let scale = 0
  scale = winWidth / w
  if (h * scale > winHeight - 80)
    scale = (winHeight - 80) / h

  return scale
}

// 还原记录，用于边界处理
let timer = null

function reduction() {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    offset.value = initialData.value.offset
    origin.value = initialData.value.origin
    scale.value = initialData.value.scale
    changeStyle(originalEl.value, [`transform: translate(${`${offset.value.left}px`}, ${`${offset.value.top}px`}) scale(${scale.value})`, `transform-origin: ${origin.value}`])
  }, 300)
}

function changeStyle(el, arr) {
  const original = el.getAttribute('style') || ''
  el.setAttribute('style', `${original};${arr.join(';')}`)
}

// 点击页面其他地方关闭 dialog
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const hasClickedInside = ref<boolean>(false)

function handleClickOutside(event) {
  console.log(222)
  if (!originalEl.value)
    return

  const isOutside = !originalEl.value.contains(event.target)
  console.log(isOutside, 'isOutside')
  console.log(hasClickedInside.value, 'inside')
  if (isOutside) {
    if (hasClickedInside.value) {
      // 第二次点击外面，隐藏 dialog
      dialog.value = false
    }
    else {
      // 第一次点击外面，标记状态
      hasClickedInside.value = true
    }
  }
}
watch(() => props.showPreview, (newVal, oldVal) => {
  if (newVal !== oldVal)
    dialog.value = newVal
}, { immediate: true })

// watchEffect(() => {
//   if (props.showPreview !== dialog.value)
//     dialog.value = props.showPreview
// })
</script>

<template>
  <v-dialog v-model="dialog" @update:model-value="cancelDialog">
    <div id="list" ref="originalEl" class="previewModal tw-px-3" @click="handleItemClick" @wheel="zoom">
      <v-img class="tw-my-2" :src="imgUrl" />
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
/* 图片预览 */
.previewModal {
  touch-action: none;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.75);
}

.previewModal > img {
  position: absolute;
  padding: 0;
  margin: 0;
  /* transition: all var(--delay_time); */
  transform: translateZ(0);
}
</style>
