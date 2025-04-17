export type SuspiciousLevel = "warning" | "error";

export interface SuspiciousActivity {
    id?: string;
    name: string;
    level: SuspiciousLevel;
    timestamp: string;
    description?: string;
    solved: boolean;
}
