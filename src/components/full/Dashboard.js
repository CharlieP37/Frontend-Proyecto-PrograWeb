import React from 'react';
import { Chart } from 'primereact/chart';
import './Dashboard.css';

const Dashboard = () => {
    const colors = {
        background: '#183D3D',
        main: '#040D12',
        fontPrimary: '#E7DFC6',
        detail1: '#3F4E4F',
        detail2: '#93B1A6',
        detail3: '#F1E9DB',
        detail4: '#5C8374'
    };

    const emotionsData = {
        labels: ['Feliz', 'Triste', 'Enojado', 'Sorprendido', 'Neutral'],
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
            data: [15, 10, 5, 8, 12]
        }]
    };

    const analysisPerDayData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
            label: 'análisis',
            backgroundColor: colors.detail4,
            borderColor: colors.main,
            data: [7, 5, 8, 10, 6, 12, 4]
        }]
    };

    const positiveNegativeData = {
        labels: ['Positivas', 'Negativas'],
        datasets: [{
            data: [35, 15],
            backgroundColor: [colors.detail4, colors.detail1],
            borderColor: colors.main,
            hoverBackgroundColor: [colors.detail2, colors.detail3]
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
        scales: {
            display: false 
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20
            }
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