import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/pdf-to-image',
      name: 'pdf-to-image',
      component: () => import('../views/PDF-to-Image.vue')
    },
    {
      path: '/image-to-pdf',
      name: 'image-to-pdf',
      component: () => import('../views/Image-to-PDF.vue')
    }
  ]
})

export default router
