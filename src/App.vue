<script setup lang="ts">
import Footer from './components/footer.vue'
import StyleText from './components/style-text.vue'
import WorkText from './components/work-text.vue'

const styleText = ref<InstanceType<typeof StyleText> | null>(null)
const workText = ref<InstanceType<typeof WorkText> | null>(null)
const footer = ref<InstanceType<typeof Footer> | null>(null)

onMounted(async () => {
  if (!styleText.value || !workText.value || !footer.value)
    return

  try {
    await styleText.value.write(0)
    await workText.value.write()
    await styleText.value.write(1)
    workText.value.showWorkBox()
    await delay(2000)
    await styleText.value.write(2)
  }
  catch (e: unknown) {
    if ((e as Error).message === 'SKIP IT') {
      styleText.value.writeToEnd()
      workText.value.showWorkBox()
      footer.value.end()
    }
  }
})
</script>

<template>
  <div class="absolute bottom-30px left-0 right-0 top-0">
    <StyleText ref="styleText" />
    <WorkText ref="workText" />
    <Footer ref="footer" />
  </div>
</template>
