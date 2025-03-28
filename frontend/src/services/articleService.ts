import api from "./api";
import {Article} from "../model/Article";

export const fetchLogs = async (): Promise<Article[]> => {
    try {
        const response = await api.get("/database");
        console.log(response.data.articles)
        return response.data.articles;
    } catch (error) {
        console.error("❌ Error fetching logs:", error);
        return [];
    }
};