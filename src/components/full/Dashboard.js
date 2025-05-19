import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import './Dashboard.css';
import { dashboard } from '../../services/api';

const Dashboard = ({ token }) => {
    const [emotionChart, setEmotionChart] = useState({});
    const [emotionTypeChart, setEmotionTypeChart] = useState({});
    const [dailyChart, setDailyChart] = useState({});

    const colors = {
        background: '#183D3D',
        main: '#040D12',
        fontPrimary: '#E7DFC6',
        detail1: '#3F4E4F',
        detail2: '#93B1A6',
        detail3: '#F1E9DB',
        detail4: '#5C8374'
    };

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const result = await dashboard({ token });
                setEmotionChart(result.emotionChart || {});
                setEmotionTypeChart(result.emotionTypeChart || {});
                setDailyChart(result.dailyChart || {});
            } catch (error) {
                console.error('Error cargando dashboard:', error);
            }
        };
        loadDashboard();
    }, [token]);

    const emotionsData = {
        labels: Object.keys(emotionChart),
        datasets: [{
            label: 'Emociones',
            backgroundColor: [
                colors.detail4,
                colors.detail1,
                colors.detail2,
                colors.detail3,
                colors.fontPrimary
            ],
            borderColor: colors.main,
            data: Object.values(emotionChart)
        }]
    };

    const positiveNegativeData = {
        labels: ['Positivas', 'Negativas', 'Neutras'],
        datasets: [{
            data: [
                emotionTypeChart.Positiva || 0,
                emotionTypeChart.Negativa || 0,
                emotionTypeChart.Neutra || 0
            ],
            backgroundColor: [colors.detail4, colors.detail1, colors.detail2],
            borderColor: colors.main,
            hoverBackgroundColor: [colors.detail2, colors.detail3, colors.fontPrimary]
        }]
    };

    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const iso = date.toISOString().split('T')[0];
            const label = date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
            days.push({ iso, label });
        }
        return days;
    };

    const last7Days = getLast7Days();
    const analysisPerDayData = {
        labels: last7Days.map(day => day.label.charAt(0).toUpperCase() + day.label.slice(1)),
        datasets: [{
            label: 'Análisis',
            backgroundColor: colors.detail4,
            borderColor: colors.main,
            data: last7Days.map(day => dailyChart[day.iso] || 0)
        }]
    };

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    color: colors.fontPrimary,
                    font: { size: 14 }
                },
                position: 'bottom'
            }
        },
        layout: {
            padding: { top: 20, bottom: 20 }
        },
        maintainAspectRatio: false
    };

    const barOptions = {
        plugins: {
            legend: {
                labels: {
                    color: colors.fontPrimary,
                    font: { size: 14 }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: colors.fontPrimary },
                grid: { color: colors.detail1 }
            },
            y: {
                ticks: { color: colors.fontPrimary },
                grid: { color: colors.detail1 }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="moodify-dashboard">
            <div className="moodify-dashboard-header">
                <h2 className="moodify-dashboard-title">Dashboard de Emociones</h2>
                <p className="moodify-dashboard-subtitle">Resumen de análisis emocionales</p>
            </div>

            <div className="moodify-charts-grid">
                <div className="moodify-chart-card">
                    <h3 className="moodify-chart-title">Emociones detectadas</h3>
                    <div className="moodify-chart-wrapper pie-chart">
                        <Chart
                            type="pie"
                            data={emotionsData}
                            options={pieOptions}
                        />
                    </div>
                </div>

                <div className="moodify-chart-card">
                    <h3 className="moodify-chart-title">Positivas vs Negativas</h3>
                    <div className="moodify-chart-wrapper pie-chart">
                        <Chart
                            type="doughnut"
                            data={positiveNegativeData}
                            options={pieOptions}
                        />
                    </div>
                </div>

                <div className="moodify-chart-card full-width">
                    <h3 className="moodify-chart-title">Análisis por día</h3>
                    <div className="moodify-chart-wrapper">
                        <Chart
                            type="bar"
                            data={analysisPerDayData}
                            options={barOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
