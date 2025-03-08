import { createRouter, createWebHistory } from "vue-router";
import WebSocketComponent from "../components/websocket/WebSocketComponent.vue";
import HomeView from "../views/HomeView.vue"

const routes = [
    { path: "/", component: HomeView },  // hlavní stránka
    { path: "/ws", component: WebSocketComponent },  // WebSocket komponenta
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
