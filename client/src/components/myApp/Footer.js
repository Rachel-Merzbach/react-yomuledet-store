/*
the Footer - contains contact details
*/
import React from 'react';
import border from './border.png'

export default () => {
    return (
        <div className="footer">
            <img src={border} className="myBorder" />
            <h4>יצירת קשר: </h4>
            <p>
                <strong>כתובת מחסן לוגיסטי (לאיסוף הזמנות): </strong>
                <a style={{ color: 'white' }} target="_blank " href="https://www.google.com/maps/place/%D7%94%D7%A1%D7%93%D7%A0%D7%94+86,+%D7%90%D7%95%D7%A8+%D7%99%D7%94%D7%95%D7%93%D7%94%E2%80%AD/@32.0341334,34.8552896,17z/data=!4m5!3m4!1s0x151d4a9741718be1:0x9d952b70643d3ec5!8m2!3d32.0339424!4d34.850526">הסדנה 86, אור יהודה</a>
            </p>

            <p>
                <strong >טלפון: </strong>
                <a style={{ color: 'white' }} target="_blank " href="tel://0525378635">0525378635</a>
            </p>
            <p>
                <strong >אימייל: </strong>
                <a style={{ color: 'white' }} target="_blank " href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=yomuledet4us@gmail.com#inbox">yomuledet4us@gmail </a>
            </p>
        </div>
    )
}