<script setup lang="ts">
import styleText0 from '~/configs/styles0.css?raw'
import styleText1 from '~/configs/styles1.css?raw'
import styleText2 from '~/configs/styles2.css?raw'

const { text, writeTo } = useWrite()
const styleText = [styleText0, styleText1, styleText2]
const root = ref<HTMLElement | null>(null)
function write(index: number) {
  return writeTo({ el: root.value!, message: styleText[index], index: 0, mirrorToStyle: true, charsPerInterval: 1 })
}
function writeToEnd() {
  const txt = styleText.join('\n')

  let styleHTML = ''
  for (let i = 0; i < txt.length; i++)
    styleHTML = handleChar(styleHTML, txt[i])

  text.value = styleHTML
  overWriteStyleTag(`#work-text * {transition: none; }${txt}`)
}
defineExpose({ write, writeToEnd })
</script>

<template>
  <pre id="style-text" ref="root" contenteditable class="my-12px" v-html="text" />
</template>
