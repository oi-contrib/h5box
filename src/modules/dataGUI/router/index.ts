import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/index.vue')
        },
        {
            path: '/zoom-line',
            name: 'zoom-line',
            component: () => import('../views/zoom-line/index.vue')
        },
        {
            path: '/bigview',
            name: 'bigview',
            component: () => import('../views/bigview/index.vue')
        },
        {
            path: '/h2o',
            name: 'h2o',
            component: () => import('../views/h2o/index.vue')
        },
        {
            path: '/manual-unlocking',
            name: 'manual-unlocking',
            component: () => import('../views/manual-unlocking.vue')
        },
        {
            path: '/ring3d',
            name: 'ring3d',
            component: () => import('../views/ring3d/index.vue')
        }, {
            path: '/tree-orient-top-bottom',
            name: 'tree-orient-top-bottom',
            component: () => import('../views/tree-orient-top-bottom.vue')
        },
        {
            path: '/sankey',
            name: 'sankey',
            component: () => import('../views/sankey/index.vue')
        },
        {
            path: '/tree-radial',
            name: 'tree-radial',
            component: () => import('../views/tree-radial.vue')
        }
    ]
});

export default router;
