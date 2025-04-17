import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Logs from '@/views/Logs.vue';
import LogDetail from "../components/LogDetail.vue";
import SuspiciousActivity from "../views/SuspiciousActivity.vue";

const routes = [
    { path: '/', component: Dashboard },
    { path: '/logs', component: Logs },
    { path: "/logs/:id", component: LogDetail },
    { path: '/suspicious_activity', component: SuspiciousActivity },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
