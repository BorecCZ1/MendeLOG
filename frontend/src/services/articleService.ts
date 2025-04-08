import { ref, watch } from "vue";
import { Article } from "@/model/Article";
import api from "./api";

export const useArticleService = () => {
    const logs = ref<Article[]>([]);
    const filteredLogs = ref<Article[]>([]);
    const searchQuery = ref("");
    const startDate = ref<string>('');
    const endDate = ref<string>('');
    const selectedStatuses = ref<number[]>([]);

    const availableStatuses = [
        { id: 1, description: 'OK' },
        { id: 2, description: 'Too short to summarize' },
        { id: 3, description: 'Unable to summarize. Probably non-textual content' },
        { id: 4, description: 'Sentiment error' },
        { id: 5, description: 'Area error' },
        { id: 6, description: 'Response timeout' },
        { id: 7, description: 'Summary error' },
    ];

    const fetchLogs = async (): Promise<Article[]> => {
        try {
            const response = await api.get("/logs");
            console.log("FETCHUJU LOGY 1X")
            console.log(response.data.articles);

            return response.data.articles;
        } catch (error) {
            console.error("❌ Error fetching logs:", error);
            return [];
        }
    };

    const fetchRecentLogs = async (): Promise<Article[]> => {
        try {
            const response = await api.get("/logs");
            const allArticles = response.data.articles;
            return allArticles.slice(0, 5);
        } catch (error) {
            console.error("❌ Error fetching logs:", error);
            return [];
        }
    };


    const fetchSingleLog = async (id: number): Promise<Article | null> => {
        try {
            const response = await api.get(`/logs/${id}`);
            console.log(response.data.article)
            return response.data.article;
        } catch (error) {
            console.error("❌ Error fetching single log:", error);
            return null;
        }
    };

    const fetchAndFilterLogs = async () => {
        const fetchedLogs = await fetchLogs();
        logs.value = Array.isArray(fetchedLogs) ? fetchedLogs : [];
        applyFilters();
    };

    const applyFilters = () => {
        filteredLogs.value = logs.value.filter(log => {
            const retrievedDate = new Date(log.retrieved_at);
            const start = startDate.value ? new Date(startDate.value) : null;
            const end = endDate.value ? new Date(endDate.value) : null;

            const dateMatches = (
                (!start || retrievedDate >= start) &&
                (!end || retrievedDate <= end)
            );

            const searchMatches = log.article_title.toLowerCase().includes(searchQuery.value.toLowerCase());

            const statusMatches = selectedStatuses.value.length === 0 || selectedStatuses.value.includes(log.statuses_id || 0);

            return dateMatches && searchMatches && statusMatches;
        });
    };

    const resetFilters = () => {
        startDate.value = '';
        endDate.value = '';
        selectedStatuses.value = [];
        applyFilters();
    };

    watch([searchQuery, startDate, endDate, selectedStatuses], () => {
        applyFilters();
    });

    return {
        logs,
        filteredLogs,
        searchQuery,
        startDate,
        endDate,
        selectedStatuses,
        availableStatuses,
        fetchLogs,
        fetchRecentLogs,
        fetchSingleLog,
        fetchAndFilterLogs,
        resetFilters,
    };
};
