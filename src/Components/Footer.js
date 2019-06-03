import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component{
    render(){
        return(
            <div id='footer' className='row'>
                <div className='row col-6 '>
                <div className='col-xl-6 col-lg-12'>
                    <span>Компания</span><br/>
                    <a href='#'>Новости</a><br/>
                    <a href='#'>Сертификаты</a><br/>
                    <a href='#'>Контакты</a><br/>
                </div> 
                <div className='col-xl-6 col-lg-12'>
                    <span>Поддержка</span><br/>
                    <a href='#'>Сервисные центры</a><br/>
                    <a href='#'>Оплата</a><br/>
                    <a href='#'>Доставка</a><br/>
                    <a href='#'>Обмен и возврат</a><br/>
                </div>
                </div>
                <div className='col-6 row'>
                    <div className='col-xl-6 col-lg-12'>
                    <span>Каталог</span><br/>
                    <a href='#'>Металлорежущий инструмент</a><br/>
                    <a href='#'>Измерительный инструмент</a><br/>
                    <a href='#'>Слесарно-монтажный инструмент</a><br/>
                    <a href='#'>Станочные принадлежности и оснастка</a><br/>
                    <a href='#'>Абазивный инструмент</a><br/>
                    <a href='#'>Алмазный инструмент</a><br/>
                    </div>
                    <div className='col-xl-6 col-lg-12'>
                    <div  id='psevdoBloсk'><br/></div>
                    <a href='#'>Электроинструмент</a><br/>
                    <a href='#'>Сварочное оборудование<br/> и паяльные приналежности</a><br/>
                    <a href='#'>Пневмоинструмент</a><br/>
                    <a href='#'>Прочий инструмент</a><br/>
                    </div> 
                </div>
                <hr/>
                <div id='underline'>&copy;2018 ООО "Инструмент" - интернет-магазин инструментов. Все права защищены. Условия пользования и политика конфиденциальности</div>
            </div>
        );
    }
}
export default Footer;