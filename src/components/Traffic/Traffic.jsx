import React from 'react';
import './Traffic.scss';

const Swiper = window.Swiper;


class Traffic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperContainerStyle: null,
            currentSlide: 0,
        }
    }

    componentDidMount() {
        new Swiper(this.swiperID, {
            direction: 'vertical',
            pagination: {
                el: this.paginateID,
                // observer: true,
                type: 'bullets',
                clickable: true,
                loop: true,
                // preloadImages: false,
                // lazy:true,
            },
        });

        // 在每一次slide換頁的時候，觸發更新state.currentSlide
        this.swiperID.swiper.on('slideChange', this.updateCurrentSwiperIndex.bind(this));
    }

    // 點擊menu，切換到對應的slide
    handleMenuClick(goToSlideIndex) {
        let thisPageSwiper = this.swiperID.swiper;  //為了要使用swiper的method
        // let mySwiper = document.querySelector('.swiper-container').swiper;  //為了要使用swiper的method的官方文檔寫法

        thisPageSwiper.slideTo(goToSlideIndex);    // mySwiper.slideTo(index, speed, runCallbacks);
        // console.log(thisPageSwiper.activeIndex);
    }

    // 更新目前slide的index到state (方在state.currentSlide)
    updateCurrentSwiperIndex() {
        this.setState({
            currentSlide: this.swiperID.swiper.activeIndex,
        });
        // console.log(this.state.currentSlide);
    }

    render() {
        return (
            <div className="trafficContainer">


                <div className="swiper-container" ref={self => this.swiperID = self} style={this.swiperContainerStyle}>
                    <div className="swiper-wrapper">
                        {/*<div data-background={require('../../images/xmjs/JS1.png')} className="swiper-slide swiper-lazy"></div>*/}
                        <div className="swiper-slide" ref={self => this.slide1 = self}></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                    </div>
                </div>

                <div className="projectHouse" ref={div => this.projectHouse = div}></div>

                <div className="menu">
                    <ul>
                        <li className={(this.state.currentSlide === 0)?("active"):("")} onClick={() => this.handleMenuClick(0)}>
                            <img alt="" />
                        </li>
                        <li className={(this.state.currentSlide === 1)?("active"):("")} onClick={() => this.handleMenuClick(1)}>
                            <img alt="" />
                        </li>
                        <li className={(this.state.currentSlide === 2)?("active"):("")} onClick={() => this.handleMenuClick(2)}>
                            <img alt="" />
                        </li>
                        <li className={(this.state.currentSlide === 3)?("active"):("")} onClick={() => this.handleMenuClick(3)}>
                            <img alt="" />
                        </li>
                        <li className={(this.state.currentSlide === 4)?("active"):("")} onClick={() => this.handleMenuClick(4)}>
                            <img alt="" />
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default Traffic;