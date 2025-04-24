import {Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController} from 'chart.js';
import type {Article} from "@/model/Article";

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale, BarController);

export const useChartService = () => {

    const generateHourlyChartData = (logs: Article[]) => {
        type TimeLabel = string;

        const timeMap = new Map<TimeLabel, { processed: number; unprocessed: number }>();

        logs.forEach(log => {
            const date = new Date(log.retrieved_at);
            const label = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}. ${date.getHours().toString().padStart(2, '0')}:00`;

            const isProcessed =
                log.articles_sentiments_id != null &&
                log.short_summary_id != null &&
                log.long_summary_id != null;

            const entry = timeMap.get(label) || { processed: 0, unprocessed: 0 };
            if (isProcessed) {
                entry.processed++;
            } else {
                entry.unprocessed++;
            }

            timeMap.set(label, entry);
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

        const processedValues = sortedLabels.map(label => timeMap.get(label)?.processed || 0);
        const unprocessedValues = sortedLabels.map(label => timeMap.get(label)?.unprocessed || 0);

        const minValue = Math.min(...processedValues);
        const maxValue = Math.max(...processedValues);

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
                    label: 'Zpracované články',
                    data: processedValues,
                    backgroundColor: processedValues.map(getDynamicColor),
                    stack: 'stack1',
                },
                {
                    label: 'Nezpracované články',
                    data: unprocessedValues,
                    backgroundColor: 'rgba(100, 100, 100, 0.8)', // šedá pro nezpracované
                    stack: 'stack1',
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
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const dataset = context.dataset;
                                const value = context.raw as number;
                                const dataIndex = context.dataIndex;

                                const processed = context.chart.data.datasets[0].data[dataIndex] as number;
                                const unprocessed = context.chart.data.datasets[1].data[dataIndex] as number;
                                const total = processed + unprocessed;

                                const percent = ((value / total) * 100).toFixed(1);

                                return `${dataset.label}: ${value} (${percent}%)`;
                            }
                        }
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
                            text: 'Počet článků'
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
