<script setup lang="ts">
import { marked } from 'marked'
import workText from '~/configs/work.md?raw'

const flipped = ref(false)
const preview = ref(true)
const show = ref(false)
const root = ref<HTMLElement | null>(null)
const mdText = marked.parse(workText)
const { text, writeTo } = useWrite()
function write() {
  show.value = true
  return writeTo({ el: root.value!, message: workText, index: 0, mirrorToStyle: false, charsPerInterval: 1 })
}
async function showWorkBox() {
  if (!root.value)
    return

  show.value = true
  preview.value = false
  flipped.value = true
  await nextTick()
  root.value.scrollTop = 9999
  let flipping = false
  root.value.addEventListener('wheel', async (e) => {
    if (flipping || !root.value)
      return

    const dy = e.deltaY
    e.preventDefault()
    const half = (root.value.scrollHeight - root.value.clientHeight) / 2
    const pastHalf = flipped.value ? root.value.scrollTop < half : root.value.scrollTop > half

    if (pastHalf) {
      flipped.value = !flipped.value
      flipping = true
      await delay(500)
      root.value.scrollTop = flipped.value ? 9999 : 0
      flipping = false
      return
    }

    root.value.scrollTop += (dy * (flipped.value ? -1 : 1))
  })
}
defineExpose({ write, showWorkBox })
</script>

<template>
  <pre v-show="show" id="work-text" ref="root" :class="{ flipped }" class="my-12px">
    <div v-if="preview" v-html="text" /><div v-else>
      <div class="text pb-1200px" v-html="workText" />
      <div class="md" v-html="mdText" />
    </div>
  </pre>
</template>
