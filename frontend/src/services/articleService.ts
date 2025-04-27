import {computed, ref, watch} from "vue";
import {Article} from "@/model/Article";
import api from "./api";

export const useArticleService = () => {
    const logs = ref<Article[]>([]);
    const filteredLogs = ref<Article[]>([]);
    const searchQuery = ref("");
    const startDate = ref<string>('');
    const endDate = ref<string>('');
    const selectedStatuses = ref<number[]>([]);

    const availableStatuses = [
        {id: 1, description: 'OK'},
        {id: 2, description: 'Too short to summarize'},
        {id: 3, description: 'Unable to summarize. Probably non-textual content'},
        {id: 4, description: 'Sentiment error'},
        {id: 5, description: 'Area error'},
        {id: 6, description: 'Response timeout'},
        {id: 7, description: 'Summary error'},
    ];

    const fetchLogs = async (): Promise<Article[]> => {
        try {
            const response = await api.get("/logs");
            const articles = response.data.articles;

            console.log("FETCHUJU LOGY 1X");
            console.log(articles);

            return articles.sort((a: Article, b: Article) => {
                return new Date(b.retrieved_at).getTime() - new Date(a.retrieved_at).getTime();
            });
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
        logs.value = Array.isArray(fetchedLogs) ? [...fetchedLogs] : [];
        applyFilters();
    };


    const applyFilters = () => {
        filteredLogs.value = logs.value
            .filter(log => {
                const retrievedDate = new Date(log.retrieved_at);
                const start = startDate.value ? new Date(startDate.value) : null;
                const end = endDate.value ? new Date(endDate.value) : null;

                const dateMatches = (!start || retrievedDate >= start) && (!end || retrievedDate <= end);
                const searchMatches = log.article_title.toLowerCase().includes(searchQuery.value.toLowerCase());
                const statusMatches = selectedStatuses.value.length === 0 || selectedStatuses.value.includes(log.statuses_id || 0);

                return dateMatches && searchMatches && statusMatches;
            })
            .sort((a, b) => new Date(b.retrieved_at).getTime() - new Date(a.retrieved_at).getTime());
    };


    const resetFilters = () => {
        startDate.value = '';
        endDate.value = '';
        selectedStatuses.value = [];
        applyFilters();
    };

    watch([searchQuery, startDate, endDate, selectedStatuses], () => {
        if (startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value)) {
            endDate.value = startDate.value;
        }

        if (endDate.value && startDate.value && new Date(endDate.value) < new Date(startDate.value)) {
            startDate.value = endDate.value;
        }

        applyFilters();
    });

    const badStatuses = computed(() =>
        logs.value.filter((log) => log.statuses_id && log.statuses_id !== 1)
    );

    const mostFrequentBadStatus = computed(() => {
        const countMap = new Map<number, number>();

        for (const log of badStatuses.value) {
            const id = log.statuses_id!;
            countMap.set(id, (countMap.get(id) || 0) + 1);
        }

        let maxId: number | null = null;
        let maxCount = 0;

        countMap.forEach((count, id) => {
            if (count > maxCount) {
                maxId = id;
                maxCount = count;
            }
        });

        if (maxId !== null) {
            const status = availableStatuses.find((s) => s.id === maxId);
            return {
                id: maxId,
                count: maxCount,
                description: status?.description || "Unknown",
            };
        } else {
            return {
                id: "-",
                count: 0,
                description: "—",
            };
        }
    });


    const lastBadStatus = computed(() => {
        if (badStatuses.value.length === 0) return null;

        const last = [...badStatuses.value].sort((a, b) =>
            new Date(b.retrieved_at).getTime() - new Date(a.retrieved_at).getTime()
        )[0];

        const date = new Date(last.retrieved_at);
        const formatted = date.toLocaleString("cs-CZ", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        return {...last, formattedTime: formatted};
    });

    const badStatusCountLastTwoDays = computed(() => {
        const now = new Date();
        const twoDaysAgo = new Date(now);
        twoDaysAgo.setDate(now.getDate() - 2);
        twoDaysAgo.setHours(0, 0, 0, 0);

        return badStatuses.value.filter((log) => {
            const retrievedDate = new Date(log.retrieved_at);
            return retrievedDate >= twoDaysAgo;
        }).length;
    });

    const badStatusRatio = computed(() => {
        if (logs.value.length === 0) return 0;
        return ((badStatuses.value.length / logs.value.length) * 100).toFixed(1);
    });

    return {
        logs,
        filteredLogs,
        searchQuery,
        startDate,
        endDate,
        selectedStatuses,
        availableStatuses,
        mostFrequentBadStatus,
        lastBadStatus,
        badStatusCountLastTwoDays,
        badStatusRatio,
        fetchLogs,
        fetchRecentLogs,
        fetchSingleLog,
        fetchAndFilterLogs,
        resetFilters,
    };
};
