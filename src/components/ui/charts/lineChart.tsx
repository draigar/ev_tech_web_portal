import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

interface LineChartProps {
    data: number[];
    labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: 'My Line Chart',
                data,
                fill: '#28A745',
                backgroundColor: "#28A745",
                borderColor: "#28A745",
            },
        ],
    };

    const options: any = {
        maintainAspectRatio: false,
        responsive: true,
        tension: 0.4,
        fill: '#28A745',
        scaleShowLabels: false,
        pointBackgroundColor: "#28A745",
        pointBorderColor: "#28A745",
        pointBorderWidth: 3,
        borderWidth: 2,
        plugins: {
            title: {
                display: false,
                text: "Chart",
                fontColor: "white",
            },
            legend: {
                display: false,
            }
        },
        scales: {
            yAxis: {
                display: true,
                grid: {
                    borderDash: [1],
                    borderDashOffset: [1],
                    drawBorder: false,
                    // color: "#ACB0C5",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                },
            },
            xAxis: {
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                },
                grid: {
                    display: false,
                    drawBorder: false,
                    borderWidth: 0,
                },
            }
        }
    }

    return (
        <div className='w-100' style={{ height: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;