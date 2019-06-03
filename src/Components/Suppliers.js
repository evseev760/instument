import React from 'react';
import Supplier from './Supplier';

import './Suppliers.css';

import spt from './img/logo/cpt.png';
import spt_ from './img/logo/cpt_.png';
import gerardi from './img/logo/gerardi_0.png';
import gerardi_ from './img/logo/gerardi_0_.png';
import helion from './img/logo/helion_0.png';
import helion_ from './img/logo/helion_0_.png';
import insize from './img/logo/insize_logo_0.png';
import insize_ from './img/logo/insize_logo_0_.png';
import instools from './img/logo/instools_0.png';
import instools_ from './img/logo/instools_0_.png';
import izar from './img/logo/izar.png';
import izar_ from './img/logo/izar_.png';
import somta from './img/logo/somta.png';
import somta_ from './img/logo/somta_.png';
import ufs from './img/logo/ufs.png';
import ufs_ from './img/logo/ufs_.png';
import utilis from './img/logo/utilis-logo_0.png';
import utilis_ from './img/logo/utilis-logo_0_.png';
import wto from './img/logo/wto_0.png';
import wto_ from './img/logo/wto_0_g.png';
import zcc from './img/logo/zcc_0.png';
import zcc_ from './img/logo/zcc_0_.png';
import axis from './img/logo/axis.png';

import diamil from './img/logo/diamil.png';
import horn from './img/logo/horn.png';
import leave1 from './img/logo/leave1.png';
import tungaloy from './img/logo/tungaloy.png';
import logo_serinex from './img/logo/logo_serinex.png';
import pagnoni from './img/logo/pagnoni.png';
import roll from './img/logo/roll.png';
import rp from './img/logo/rp.png';
import tc from './img/logo/tc.png';
import yes from './img/logo/yes.png';
import diamil2 from './img/logo/diami2.png';
import horn2 from './img/logo/horn2.png';
import leave2 from './img/logo/leave2.png';
import tungaloy2 from './img/logo/tungaloy2.png';
import logo_serinex2 from './img/logo/logo_serine2.png';
import pagnoni2 from './img/logo/pagnoni2.png';
import roll2 from './img/logo/roll2.png';
import rp2 from './img/logo/rp2.png';
import tc2 from './img/logo/tc2.png';
import yes2 from './img/logo/yes2.png';



function Suppliers(props) {
    return (
        <div id='suppliers'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-10 paragraf'><h5 id={'postavchiki'}>Партнеры</h5></div>
            <div className='row'>
                <Supplier link={'https://www.cpt-gewindewerkzeuge.de/'} img={spt} img1={spt_} />
                <Supplier link={'https://www.wto-tools.com/de/start/'} img={wto} img1={wto_} />
                <Supplier link={'http://www.izartool.com/en/'} img={izar} img1={izar_} />
                <Supplier link={'http://www.somta.co.za/'} img={somta} img1={somta_} />
                <Supplier link={'http://www.gerardispa.com/company'} img={gerardi} img1={gerardi_} />
                <Supplier link={'https://helion.tools/en/c/helion-tools-with-seal-of-quality-1'} img={helion} img1={helion_} />
                <Supplier link={'http://www.instrument52.ru/about'} img={instools} img1={instools_} />
                <Supplier link={'http://zccct-europe.net/web/index.php/ru/'} img={zcc} img1={zcc_} />
                <Supplier link={'https://utilis.com/en/shop'} img={utilis} img1={utilis_} />
                <Supplier link={'http://insize.com/'} img={insize} img1={insize_} />
                <Supplier link={'http://ufs.it/'} img={ufs} img1={ufs_} />
                <Supplier  img={axis} img1={axis} />
                <Supplier link={'https://www.harditalia.com/diamil.php'} img={diamil} img1={diamil2} />
                <Supplier link={'https://www.phorn.de/'} img={horn} img1={horn2} />
                <Supplier link={'http://www.leave.com.tw/'} img={leave1} img1={leave2} />
                <Supplier link={'https://www.tungaloy.com/'} img={tungaloy} img1={tungaloy2} />
                <Supplier link={'http://www.serinex.it/'} img={logo_serinex} img1={logo_serinex2} />
                <Supplier link={'http://www.pagnoni.com/'} img={pagnoni} img1={pagnoni2} />
                <Supplier link={'https://www.rollwalztechnik.de/en/'} img={roll} img1={roll2} />
                <Supplier link={'https://www.rose-plastic.de/en/'} img={rp} img1={rp2} />
                <Supplier link={'https://www.schwarz-cuttingtools.com/'} img={tc} img1={tc2} />
                <Supplier link={'http://www.yestool.co.kr/yestoolweb/index.asp'} img={yes} img1={yes2} />

                <div className='col-12 col-sm-12 col-md-12 col-lg-10 paragraf'><h5>Компания</h5><p>
                    Более 12 лет мы успешно осуществляем комплексные поставки промышленного инструмента и техоснастки. На сегодняшний день наша компания является одним из лидеров рынка по поставкам инструмента в России.
                    <br /><br />
                    Мы работаем исключительно с юридическими лицами. Наши клиенты — это предприятия, занятые производством в различных отраслях промышленности на территории РФ. <a href='http://www.instrument52.ru/ru'>Узнайте больше о компании.</a>
                </p></div>
            </div>
        </div>
    );
}
export default Suppliers;