import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';
import type { Article } from "@/model/Article";

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

export const useChartService = () => {
    const getColorForValue = (value: number) => {
        if (value <= 15) return 'rgba(255, 99, 132, 0.8)';
        if (value <= 25) return 'rgba(255, 206, 86, 0.8)';
        return 'rgba(75, 192, 192, 0.8)';
    };

    /*
    const generateHourlyChartData = (logs: Article[]) => {
        const todayLogs = filterTodayLogs(logs);

        const hoursMap = new Map<string, number>();

        todayLogs.forEach(log => {
            const hour = new Date(log.retrieved_at).getHours().toString().padStart(2, '0') + ':00';
            hoursMap.set(hour, (hoursMap.get(hour) || 0) + 1);
        });

        const sortedHours = Array.from(hoursMap.keys()).sort();
        const values = sortedHours.map(hour => hoursMap.get(hour) || 0);

        return {
            labels: sortedHours,
            datasets: [
                {
                    label: 'Počet reportů',
                    data: values,
                    backgroundColor: values.map(getColorForValue),
                    borderColor: values.map(getColorForValue),
                    borderWidth: 1
                }
            ]
        };
    };
    */


    const generateHourlyChartData = (logs: Article[]) => {
        const hoursMap = new Map<string, number>();
        console.log("LOGY JAK CYP")
        console.log(logs)

        logs.forEach(log => {
            const hour = new Date(log.retrieved_at).getHours().toString().padStart(2, '0') + ':00';
            hoursMap.set(hour, (hoursMap.get(hour) || 0) + 1);
        });

        const sortedHours = Array.from(hoursMap.keys()).sort();
        const values = sortedHours.map(hour => hoursMap.get(hour) || 0);

        return {
            labels: sortedHours,
            datasets: [
                {
                    label: 'Počet reportů',
                    data: values,
                    backgroundColor: values.map(getColorForValue),
                    borderColor: values.map(getColorForValue),
                    borderWidth: 1
                }
            ]
        };
    };

    const renderChart = (canvas: HTMLCanvasElement, logs: Article[], existingChart: Chart | null): Chart => {
        const data = generateHourlyChartData(logs);

        if (existingChart) {
            existingChart.destroy();
        }

        return new Chart(canvas, {
            type: 'bar',
            data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Čas',
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Počet reportů',
                        },
                        min: 0,
                    }
                }
            }
        });
    };

    const filterTodayLogs = (logs: Article[]): Article[] => {
        const today = new Date();
        return logs.filter(log => {
            const date = new Date(log.retrieved_at);
            return (
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
            );
        });
    };


    return {
        renderChart,
        generateHourlyChartData,
    };
};
