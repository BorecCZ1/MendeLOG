import { ref } from "vue";
import { Article } from "@/model/Article";
import {useArticleService} from "./articleService";

export const useStatisticsService = () => {
    const { logs } = useArticleService();

    const getBadStatusCountThisMonth = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const badStatusLogs = logs.value.filter((log: Article) => {
            const logDate = new Date(log.retrieved_at);
            return log.statuses_id && log.statuses_id > 0 && logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
        });

        return badStatusLogs.length;
    };

    const getMostFrequentBadStatus = () => {
        const badStatusLogs = logs.value.filter((log: Article) => log.statuses_id && log.statuses_id > 0);

        if (badStatusLogs.length === 0) return "No bad statuses recorded";

        const statusCount: Record<number, number> = {};

        badStatusLogs.forEach((log: Article) => {
            if (statusCount[log.statuses_id!]) {
                statusCount[log.statuses_id!] += 1;
            } else {
                statusCount[log.statuses_id!] = 1;
            }
        });

        const mostFrequentStatusId = Object.keys(statusCount).reduce((a, b) => statusCount[a] > statusCount[b] ? a : b);
        return `Status ID: ${mostFrequentStatusId} - Frequency: ${statusCount[mostFrequentStatusId]}`;
    };


    const getLastRecordedBadStatus = () => {
        const badStatusLogs = logs.value.filter((log: Article) => log.statuses_id && log.statuses_id > 0);

        if (badStatusLogs.length === 0) return "No bad statuses recorded";

        return `Last bad status ID: ${badStatusLogs[badStatusLogs.length - 1].statuses_id}`;
    };


    return {
        getBadStatusCountThisMonth,
        getMostFrequentBadStatus,
        getLastRecordedBadStatus,
    };
};
