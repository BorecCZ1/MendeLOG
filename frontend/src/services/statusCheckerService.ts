import { computed, ComputedRef } from "vue";
import type { Article } from "@/model/Article";

export function useStatusCheckerService(logs: ComputedRef<Article[]>, serverName: string) {
    const filteredLogs = computed(() => {
        if (!logs.value.length) return [];
        const lowerName = serverName.toLowerCase();
        if (lowerName === "dita") {
            return logs.value.filter(log => log.processed_by?.startsWith("dita"));
        } else if (lowerName === "afrodita") {
            return logs.value.filter(log => log.processed_by?.startsWith("aphrodita"));
        }
        return [];
    });

    const lastRetrieved = computed(() => {
        if (!filteredLogs.value.length) return null;
        const sortedLogs = [...filteredLogs.value].sort((a, b) => new Date(b.retrieved_at).getTime() - new Date(a.retrieved_at).getTime());
        return new Date(sortedLogs[0].retrieved_at);
    });

    const status = computed(() => {
        if (!lastRetrieved.value) {
            return { color: "#808080", text: `No logs for ${serverName}`, icon: "ℹ️", border: "2px solid #808080" };
        }

        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - lastRetrieved.value.getTime()) / 60000);

        if (diffMinutes <= 10) {
            return { color: "#28a745", text: "All systems operational", icon: "✅", border: "2px solid #28a745", time: diffMinutes };
        }
        if (diffMinutes <= 20) {
            return { color: "#ffc107", text: "Minor delays", icon: "⚠️", border: "2px solid #ffc107", time: diffMinutes };
        }
        return { color: "#dc3545", text: "Critical issue", icon: "❌", border: "2px solid #dc3545", time: diffMinutes };
    });

    return {
        filteredLogs,
        lastRetrieved,
        status,
    };
}
