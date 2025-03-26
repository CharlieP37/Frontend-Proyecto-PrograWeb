import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

function HomeScreen(){
    
    const [date, setDate] = useState(null);

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} dateTemplate={dateTemplate} />
        </div>
    );

};

export default HomeScreen;