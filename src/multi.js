import Mousetrap from 'mousetrap'
import { getText2, makeCorpus } from './lib/textManager'

require('./css/multi.scss')

// adapted from https://reneroth.org/marquees-in-css/

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

const partOfLine = (line, targetSize) => {
  if (line.length >= targetSize - 2 && line.length <= targetSize + 2) return line
  const start = range(0, line.length - targetSize)
  const frag = line.slice(start, start + targetSize)
  console.log(line.length, start, frag.length, frag)
  return frag
}

const cleanSlate = target => {
  const parent = document.getElementById(target)
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const marq = async _ => {
  //   const frags = await getText2(10)
  const ids = ['logo', 'first', 'services', 'projects', 'names', 'contact', 'terms']
  const [logo, first, services, projects, names, contact, terms] = ids.map(id => document.getElementById(id))

  cleanSlate('logo')
  const l = ce('div', { innerText: await getText2(10) })
  for (let i = 0; i < 2; i++) logo.append(l.cloneNode(true))

  cleanSlate('services')
  const s = ce('div', { innerText: await getText2(40) })
  for (let i = 0; i < 2; i++) services.append(s.cloneNode(true))

  cleanSlate('projects')
  const p = ce('div', { innerText: await getText2(20) })
  for (let i = 0; i < 2; i++) projects.append(p.cloneNode(true))

  cleanSlate('names')
  names.append(ce('div', { innerText: await getText2(40) }))

  cleanSlate('contact')
  const c = ce('div', { innerText: await getText2(7) })
  for (let i = 0; i < 6; i++) contact.append(c.cloneNode(true))

  cleanSlate('terms')
  terms.append(ce('div', { innerText: await getText2(40) }))

  cleanSlate('first')
  const t = await getText2(88)
  const f = ce('div', { innerText: `${t.slice(0, t.length / 2)}\n${t.slice(t.length / 2, t.length)}` })
  first.append(f)
}

// ugh the name
const redo = () => {
  cleanSlate()
  marq()
}

const mouseCommand = fn => _ => {
  fn()
  return false
}

// redo text lines (from existing corpus)
Mousetrap.bind('r', mouseCommand(() => {
  redo()
}))

// re-pull corpus
Mousetrap.bind('t', mouseCommand(() => {
  makeCorpus()
  redo()
}))

document.addEventListener('DOMContentLoaded', marq)
