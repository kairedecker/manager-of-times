import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Manual from "../views/Tracking.vue";
import Overview from "../views/Overview.vue";
import Settings from "../views/Settings.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/tracking',
        name: 'Tracking',
        component: Manual
    },
    {
        path: '/overview',
        name: 'Overview',
        component: Overview
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;