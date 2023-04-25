<script setup lang="ts">
enum State {
  running,
  paused,
}
const isEnd = ref(false)
const state = ref(State.running)
const text = computed(() => state.value === State.paused ? '继续 >>' : '暂停 ||')
function togglePause() {
  state.value = state.value === State.paused ? State.running : State.paused
  store.paused = state.value === State.paused
}
function skip() {
  store.animationSkipped = true
}
function end() {
  isEnd.value = true
}
defineExpose({ end })
</script>

<template>
  <footer class="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-x-8px">
    <a v-show="!isEnd" href="#" @click.prevent="togglePause">{{ text }}</a>
    <a v-show="!isEnd" href="#" @click.prevent="skip">跳过动画 --></a>
    <svg width="26" height="28" class="icon" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path
      fill-rule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    /></svg>
    <a href="https://github.com/evan-lc/">Github</a>
  </footer>
</template>
