import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

const routes = generatedRoutes;

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
