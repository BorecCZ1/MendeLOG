import { ref } from 'vue';
import api from './api';
import { SuspiciousActivity } from '@/model/SuspiciousActivity';

export function useActivities() {
    const activities = ref<SuspiciousActivity[]>([]);
    const isLoading = ref(true);
    const initialLoad = ref(true);

    const evaluating = ref(false);
    const evaluateStatus = ref<null | { status: string; message: string }>(null);

    const getAllActivities = async (): Promise<SuspiciousActivity[]> => {
        const res = await api.get("/suspicious-activity");
        return res.data;
    };

    const createActivity = async (activity: SuspiciousActivity): Promise<{ id: string }> => {
        const res = await api.post("/suspicious-activity", activity);
        return res.data;
    };

    const deleteActivityById = async (id: string): Promise<{ status: string; id: string }> => {
        const res = await api.delete(`/suspicious-activity/${id}`);
        return res.data;
    };

    const fetchActivities = async () => {
        try {
            if (initialLoad.value) isLoading.value = true;
            activities.value = await getAllActivities();
        } catch (error) {
            console.error("Chyba při načítání aktivit:", error);
        } finally {
            isLoading.value = false;
            initialLoad.value = false;
        }
    };

    const toggleSolved = async (activity: SuspiciousActivity) => {
        const updated = { ...activity, solved: !activity.solved };
        try {
            await createActivity(updated);
            if (activity.id) {
                await deleteActivityById(activity.id);
            }
            await fetchActivities();
        } catch (error) {
            console.error("Chyba při změně stavu aktivity:", error);
        }
    };

    const deleteActivity = async (id: string) => {
        try {
            await deleteActivityById(id);
            await fetchActivities();
        } catch (error) {
            console.error("Chyba při mazání aktivity:", error);
        }
    };

    const addActivity = async (activity: SuspiciousActivity): Promise<boolean> => {
        try {
            await createActivity(activity);
            await fetchActivities();
            return true;
        } catch (error) {
            console.error("Chyba při přidávání aktivity:", error);
            return false;
        }
    };

    const evaluateFeed = async (): Promise<{ status: string; message: string }> => {
        const res = await api.post("/suspicious-activity/evaluate-feed");
        return res.data;
    };

    const runEvaluation = async () => {
        evaluating.value = true;
        evaluateStatus.value = null;
        try {
            evaluateStatus.value = await evaluateFeed();
            await fetchActivities();
        } catch (error: any) {
            console.error("Chyba při vyhodnocení feedu:", error);
            evaluateStatus.value = {
                status: "error",
                message: error?.response?.data?.detail || "Nastala chyba při volání backendu.",
            };
        } finally {
            evaluating.value = false;

            setTimeout(() => {
                evaluateStatus.value = null;
            }, 5000);
        }
    };

    return {
        activities,
        isLoading,
        initialLoad,
        evaluateStatus,
        evaluating,
        fetchActivities,
        toggleSolved,
        deleteActivity,
        addActivity,
        evaluateFeed,
        runEvaluation
    };
}
