import {SuspiciousActivity} from "../model/SuspiciousActivity";
import {useActivities} from "../services/activityService";

export const suspiciousActivityController = {

    async fetchAll(): Promise<SuspiciousActivity[]> {
        try {
            const activities = await useActivities.getAll();
            return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } catch (err) {
            console.error("Chyba při načítání suspicious activity:", err);
            throw err;
        }
    },

    async createActivity(activity: SuspiciousActivity): Promise<{ id: string }> {
        try {

            if (!activity.name || !activity.level) {
                throw new Error("Name a Level jsou povinné.");
            }

            const response = await useActivities.create(activity);
            return response;
        } catch (err) {
            console.error("Chyba při vytváření activity:", err);
            throw err;
        }
    },

    async deleteActivity(id: string): Promise<{ status: string; id: string }> {
        try {
            const response = await useActivities.delete(id);
            return response;
        } catch (err) {
            console.error(`Chyba při mazání activity s ID ${id}:`, err);
            throw err;
        }
    }
};
