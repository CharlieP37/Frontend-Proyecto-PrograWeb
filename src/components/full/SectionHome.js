import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import Top3CardSong from '../basic/Top3CardSong.js';
import { recommendationsLatest, dashboard } from '../../services/api.js';
import './SectionHome.css';

const SectionHome = () => {
    const [songs, setSongs] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#E7DFC6',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 12
                }
            },
            tooltip: {
                backgroundColor: 'rgba(4, 13, 18, 0.8)',
                titleColor: '#E7DFC6',
                bodyColor: '#F1E9DB',
                borderColor: '#5C8374',
                borderWidth: 1,
                padding: 8,
                boxPadding: 4
            }
        },
        scales: {
            r: {
                grid: {
                    color: 'rgba(92, 131, 116, 0.4)'
                },
                angleLines: {
                    color: 'rgba(92, 131, 116, 0.4)'
                },
                pointLabels: {
                    color: '#E7DFC6',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: '#E7DFC6',
                    backdropColor: 'rgba(4, 13, 18, 0.6)',
                    backdropPadding: 3,
                    font: {
                        size: 11
                    },
                    z: 1,
                    showLabelBackdrop: true,
                    count: 4 
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');

                const recData = await recommendationsLatest({ token });
                if (recData?.result) {
                    setSongs(recData.result);
                }
                
                const summaryData = await dashboard({ token });
                if (summaryData?.emotionChart) {
                    const labels = Object.keys(summaryData.emotionChart);
                    const data = Object.values(summaryData.emotionChart);

                    const colors = [
                        '#5C8374', '#93B1A6', '#E7DFC6',
                        '#F1E9DB', '#183D3D', '#B68973',
                        '#8E806A', '#B2C8BA', '#FFF2D7'
                    ];

                    setChartData({
                        labels,
                        datasets: [{
                            data,
                            backgroundColor: colors.slice(0, labels.length),
                            borderColor: '#040D12',
                            borderWidth: 1
                        }]
                    });
                }
            } catch (err) {
                console.error("Error en SectionHome:", err);
                setError("Hubo un error al obtener los datos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="section-home">
            <h1 className="section-title">Tu estado de ánimo, tu música. La playlist perfecta para cada emoción.</h1>
            
            <div className="content-wrapper">
                <div className="chart-container">
                    {chartData ? (
                        <Chart 
                            type="polarArea" 
                            data={chartData} 
                            options={chartOptions} 
                        />
                    ) : (
                        <p className="status-message">Cargando gráfica de emociones...</p>
                    )}
                </div>
                
                <div className="recommendations-container">
                    {isLoading ? (
                        <p className="status-message">Cargando recomendaciones...</p>
                    ) : error ? (
                        <p className="status-message error">{error}</p>
                    ) : songs.length === 0 ? (
                        <div className="top3-container">
                            <h2 className="top3-title">Últimas recomendaciones</h2>
                            <p className="status-message">No hay últimas recomendaciones.</p>
                        </div>
                    ) : (
                        <Top3CardSong songList={songs} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default SectionHome;
