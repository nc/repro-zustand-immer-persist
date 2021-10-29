import './style.css'

import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce, { enableMapSet } from 'immer';

enableMapSet();

type Store = {
  foo: Set<string>,
  addFoo: () => void
}

export const store = create<Store>(persist((set) => ({
  foo: new Set(),
  addFoo: () => {
    set(produce<Store>((state) => {
      state.foo.add('a foo');
    }))
  }
}), {
  name: 'persist-store'
}));

document.onreadystatechange = () => {
  store.getState().addFoo();
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
