import { store } from '~/store'
import { delay, handleChar } from '~/utils'

export interface WriteParams {
  appendStyle: (style: string) => void
  speed?: number
}

export interface WriteToParams {
  el: HTMLElement
  message: string
  index: number
  mirrorToStyle: boolean
  charsPerInterval: number
}

const endOfSentence = /[？！。~：]$/
const comma = /\D[，；、]$/
const endOfBlock = /[^/]\n\n$/

export function write({ appendStyle, speed = 16 }: WriteParams) {
  let styleBuffer = ''
  const text = ref('')
  const writeSimpleChar = (char: string) => {
    text.value += char
  }
  const writeChar = (char: string) => {
    text.value = handleChar(text.value, char)
    styleBuffer += char
    if (char === ';') {
      appendStyle(styleBuffer)
      styleBuffer = ''
    }
  }
  const writeTo = async ({ el, message, index, mirrorToStyle, charsPerInterval }: WriteToParams): Promise<void> => {
    if (store.animationSkipped)
      throw new Error('SKIP IT')

    const chars = message.slice(index, index + charsPerInterval)
    index += charsPerInterval

    el.scrollTop = el.scrollHeight

    if (mirrorToStyle)
      writeChar(chars)

    else
      writeSimpleChar(chars)

    if (index < message.length) {
      let interval = speed
      let thisSlice = message.slice(index - 2, index)
      if (comma.test(thisSlice))
        interval = interval * 30

      if (endOfSentence.test(thisSlice))
        interval = interval * 70

      thisSlice = message.slice(index - 2, index + 1)
      if (endOfBlock.test(thisSlice))
        interval = interval * 50

      do
        await delay(interval)
      while (store.paused)

      return writeTo({ el, message, index, mirrorToStyle, charsPerInterval })
    }
  }

  return { text, writeTo }
}
