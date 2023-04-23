<script setup lang="ts">
import StyleText from './components/style-text.vue'
import WorkText from './components/work-text.vue'

const styleText = ref<InstanceType<typeof StyleText> | null>(null)
const workText = ref<InstanceType<typeof WorkText> | null>(null)

onMounted(async () => {
  if (!styleText.value || !workText.value)
    return

  try {
    await styleText.value.write(0)
    await workText.value.write()
    await styleText.value.write(1)
    workText.value.showWorkBox()
    await delay(2000)
    await styleText.value.write(2)
  }
  catch (e) {}
})
</script>

<template>
  <div class="absolute bottom-20px left-0 right-0 top-0">
    <StyleText ref="styleText" />
    <WorkText ref="workText" />
  </div>
</template>
