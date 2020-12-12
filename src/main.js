// import Mousetrap from 'mousetrap'
import { getText } from './lib/textManager'

// const defaultText = [
//   "of receiving images need to system. Amerika...-'````",
//   '::}',
//   "'._ SSS how you are two cartoon characters from writer's Phoneticdirectly",
//   'with',
//   'ms word "xerox"',
//   'took effect in ascii rendering of typographic traditions, and reload your information, see hurry up! :| yawn',
//   'drooling =Dthese projects concerning 3D working',
//   'methods) start'
// ]

const createTextElements = async _ => {
  const frags = await getText(10)
  const items = buildListElements(frags)
  return group(items)
}

const randomId = _ => (Math.random() * 0x1000000000).toString(36)

const ce = (e, params = {}) => {
  const el = document.createElement(e)
  for (const key in params) {
    el[key] = params[key]
  }
  return el
}

const buildMarqueeBlock = line => {
  const item = ce('div', { className: 'menu__item', id: randomId() })
  const link = ce('a', { className: 'menu__item-link', textContent: line })
  const marquee = ce('div', { className: 'marquee' })
  const inner = ce('div', { className: 'marquee__inner', ariaHidden: 'true' })
  const spans = new Array(4).fill(1).map(_ => ce('span', { textContent: line }))
  inner.append(...spans)
  marquee.append(inner)
  item.append(link)
  item.append(marquee)
  return item
}

const marq = async _ => {
  // const frags = await getText(10)
  // const items = buildListElements(frags)
  // return group(items)
  const frags = await getText(10)
  const target = document.getElementById('target')
  target.append(...frags.map(buildMarqueeBlock))
}

document.addEventListener('DOMContentLoaded', marq)
