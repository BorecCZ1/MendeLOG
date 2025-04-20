import api from "./api";
import {SuspiciousActivity} from "@/model/SuspiciousActivity";

export const useSuspiciousActivityService = {

    async getAll(): Promise<SuspiciousActivity[]> {
        const res = await api.get("/suspicious-activity");
        return res.data;
    },

    async create(activity: SuspiciousActivity): Promise<{ id: string }> {
        const res = await api.post(`/suspicious-activity`, activity);
        return res.data;
    },

    async delete(id: string): Promise<{ status: string; id: string }> {
        const res = await api.delete(`/suspicious-activity/${id}`);
        return res.data;
    },



};