import Mousetrap from 'mousetrap'
import { getText } from './lib/textManager'

const randomId = _ => (Math.random() * 0x1000000000).toString(36)

// exclusive of max
function range (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const ce = (e, params = {}) => {
  const el = document.createElement(e)
  for (const key in params) {
    el[key] = params[key]
  }
  return el
}

const partOfLine = line => {
  if (line.length <= 25) return line
  const start = range(0, line.length / 2)
  const end = Math.min(Math.max(range(start + 20, line.length), 25), line.length) // ouch, it can be loooooooooong
  const frag = line.slice(start, end)
  console.log(line.length, start, end, frag.length, frag)
  return frag
}

const buildMarqueeBlock = line => {
  const item = ce('div', { className: 'menu__item', id: randomId() })
  const link = ce('a', { className: 'menu__item-link', textContent: partOfLine(line) })
  const marquee = ce('div', { className: 'marquee' })
  const inner = ce('div', { className: 'marquee__inner', ariaHidden: 'true' })
  const spans = new Array(4).fill(1).map(_ => ce('span', { textContent: line }))
  inner.append(...spans)
  marquee.append(inner)
  item.append(link)
  item.append(marquee)
  return item
}

const cleanSlate = () => {
  const parent = document.getElementById('target')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const marq = async _ => {
  const frags = await getText(10)
  const target = document.getElementById('target')
  target.append(...frags.map(buildMarqueeBlock))
}

const mouseCommand = fn => _ => {
  fn()
  return false
}

Mousetrap.bind('r', mouseCommand(() => {
  cleanSlate()
  marq()
}))

document.addEventListener('DOMContentLoaded', marq)
