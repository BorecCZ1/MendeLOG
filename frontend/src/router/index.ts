import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Logs from '@/views/Logs.vue';
import Suspicious from '@/views/Suspicious.vue';
import LogDetail from "../components/LogDetail.vue";

const routes = [
    { path: '/', component: Dashboard },
    { path: '/logs', component: Logs },
    { path: "/logs/:id", component: LogDetail },
    { path: '/suspicious', component: Suspicious },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
