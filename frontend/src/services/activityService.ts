import {ref} from 'vue';
import {SuspiciousActivity} from '@/model/SuspiciousActivity';
import {useSuspiciousActivityService} from '@/services/suspiciousActivityService';

export function useActivities() {
    const activities = ref<SuspiciousActivity[]>([]);
    const isLoading = ref(true);
    const initialLoad = ref(true);

    const fetchActivities = async () => {
        try {
            if (initialLoad.value) isLoading.value = true;
            activities.value = await useSuspiciousActivityService.getAll();
        } catch (error) {
            console.error("Chyba při načítání aktivit:", error);
        } finally {
            isLoading.value = false;
            initialLoad.value = false;
        }
    };

    const toggleSolved = async (activity: SuspiciousActivity) => {
        const updated = {...activity, solved: !activity.solved};
        try {
            await useSuspiciousActivityService.create(updated);
            if (activity.id) {
                await useSuspiciousActivityService.delete(activity.id);
            }
            await fetchActivities();
        } catch (error) {
            console.error("Chyba při změně stavu aktivity:", error);
        }
    };

    const deleteActivity = async (id: string) => {
        try {
            await useSuspiciousActivityService.delete(id);
            await fetchActivities();
        } catch (error) {
            console.error("Chyba při mazání aktivity:", error);
        }
    };

    const addActivity = async (activity: SuspiciousActivity): Promise<boolean> => {
        try {
            await useSuspiciousActivityService.create(activity);
            await fetchActivities();
            return true;
        } catch (error) {
            console.error("Chyba při přidávání aktivity:", error);
            return false;
        }
    };

    return {
        activities,
        isLoading,
        initialLoad,
        fetchActivities,
        toggleSolved,
        deleteActivity,
        addActivity,
    };
}
