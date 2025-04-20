import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController } from 'chart.js';
import type { Article } from "@/model/Article";

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

export const useChartService = () => {

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


    // const generateHourlyChartData = (logs: Article[]) => {
    //     const hoursMap = new Map<string, number>();
    //     console.log("LOGY JAK CYP")
    //     console.log(logs)
    //
    //     logs.forEach(log => {
    //         const hour = new Date(log.retrieved_at).getHours().toString().padStart(2, '0') + ':00';
    //         hoursMap.set(hour, (hoursMap.get(hour) || 0) + 1);
    //     });
    //
    //     const sortedHours = Array.from(hoursMap.keys()).sort();
    //     const values = sortedHours.map(hour => hoursMap.get(hour) || 0);
    //
    //     return {
    //         labels: sortedHours,
    //         datasets: [
    //             {
    //                 label: 'Počet reportů',
    //                 data: values,
    //                 backgroundColor: values.map(getColorForValue),
    //                 borderColor: values.map(getColorForValue),
    //                 borderWidth: 1
    //             }
    //         ]
    //     };
    // };

    const generateHourlyChartData = (logs: Article[]) => {
        type TimeLabel = string;

        const timeMap = new Map<TimeLabel, number>();

        logs.forEach(log => {
            const date = new Date(log.retrieved_at);

            const label = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}. ${date.getHours().toString().padStart(2, '0')}:00`;

            timeMap.set(label, (timeMap.get(label) || 0) + 1);
        });

        const sortedLabels = Array.from(timeMap.keys()).sort((a, b) => {
            const parseLabel = (label: string) => {
                const [datePart, hourPart] = label.split(' ');
                const [day, month] = datePart.split('.').map(Number);
                const hour = Number(hourPart.split(':')[0]);
                return new Date(new Date().getFullYear(), month - 1, day, hour);
            };

            return parseLabel(a).getTime() - parseLabel(b).getTime();
        });

        const values = sortedLabels.map(label => timeMap.get(label) || 0);

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const getDynamicColor = (value: number): string => {
            if (maxValue === minValue) {
                return 'rgba(0, 255, 0, 0.8)';
            }

            const ratio = (value - minValue) / (maxValue - minValue);

            const r = Math.round(255 * (1 - ratio));
            const g = Math.round(255 * ratio);
            const b = Math.round(50 * (1 - ratio));

            return `rgba(${r}, ${g}, ${b}, 0.8)`;
        };

        return {
            labels: sortedLabels,
            datasets: [
                {
                    label: 'Počet reportů',
                    data: values,
                    backgroundColor: values.map(getDynamicColor),
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
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
                    title: {
                        display: true,
                        text: 'Počet reportů po hodinách podle dne'
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Čas (hodiny)'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Počet reportů'
                        },
                        beginAtZero: true
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
