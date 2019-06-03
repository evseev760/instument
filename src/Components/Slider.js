import React, { Component } from "react";
import Slider from "/Users/admin/Documents/instrument52/App/app/page1/node_modules/react-slick/lib/slider";
import './Slider.css';
import CatalogProduct from './CatalogProduct';



export default class SliderComponent extends Component {
  resize = () => this.forceUpdate()
  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  render() {
    const toShow = Math.floor(window.innerWidth / 320) < 2 ? 2 : Math.floor(window.innerWidth / 320);
    const settings = {
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: toShow > 5 ? 5 : toShow,
      slidesToScroll: toShow > 5 ? 5 : toShow
    };
    return (
      <div className='slider'>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <Slider {...settings}>
          {this.props.type.product.map((x, i) =>
            i < 10 ?
              <div key={this.props.type.product[i].id} className='slider_element'>
                <CatalogProduct product={this.props.type.product[i]} />
              </div> : false
          )}
        </Slider>
      </div>
    );
  }
}

