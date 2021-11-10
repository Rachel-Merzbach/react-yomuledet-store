/*
display the phone animation on the site
*/

import React from "react"
import phone from './phone2.gif'
import Footer from "./Footer"
import logo from './logo192.png'
import AlertDialogSlide from '../cart/order'

export default () => {
        return (
            <div style={{ justifyContent: "center" }}>
                {localStorage.getItem("order") && <AlertDialogSlide />}
                <div>
                    <p className="textTitle">חולמים על מסיבה מהאגדות?</p>
                    <div >
                        <img src={phone} className="phoneAnimation" />
                    </div>

                    <p  className="textField">
                        <strong>אצלנו ב<img src={logo} style={{height:"17vh"}}/></strong>
                        <br/>
                        תוכלו להנות ממגוון אטרקציות ופעילויות
                        <br/>
                        שנועדו במיוחד עבור מסיבת יומולדת נהדרת עבור הילדים שלכם!
                        <br/>
                        כאן תוכלו לקבל עד אליכם הביתה אביזרים ואטרקציות
                        <br/>
                        שיהפכו את חגיגת היומולדת שלכם
                        <br/>
                        לוואו אמיתי 🤩
                    </p>
                </div>
                <Footer/>
            </div>

        )
}
