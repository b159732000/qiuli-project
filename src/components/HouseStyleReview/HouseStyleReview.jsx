import React from 'react';
import './HouseStyleReview.scss';
// import Iframe from 'react-iframe';
import { TransitionGroup, CSSTransition } from "react-transition-group";
const Swiper = window.Swiper;

const showroomImages = [
    // require('../../images/HouseStyleReview/Sequence/H/Frame000015.jpg'),
    // require('../../images/HouseStyleReview/Sequence/H/Frame000016.jpg'),
    // require('../../images/HouseStyleReview/Sequence/H/Frame000017.jpg'),
    // require('../../images/HouseStyleReview/Sequence/H/Frame000018.jpg'),
    // require('../../images/HouseStyleReview/Sequence/H/Frame000019.jpg'),
]

// function pushImagesToArray() {
//     var i;
//     for (i = 15; i <= 96; i += 5) {
//         showroomImages.push(require("../../images/HouseStyleReview/Sequence/H/Frame0000" + i + ".jpg"));
//         let img = new Image();
//         img.src = showroomImages[i];
//     }
//     for (i = 102; i <= 609; i += 5) {
//         showroomImages.push(require("../../images/HouseStyleReview/Sequence/H/Frame000" + i + ".jpg"));
//         let img = new Image();
//         img.src = showroomImages[i];
//     }
// };
// pushImagesToArray();

class HouseStyleReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHouseStyleIndex: 1,
            showroom: { //手刻圖片序列滑動效果，暫時棄用
                lastTimeImageIndex: 0,
                currentImageIndex: 0,   //目前顯示第幾張Image
                thisTimeTouchStart: {   //這次觸摸的起點
                    x: null,
                    y: null,
                },
                currentTouchPosition: {   //目前觸摸的位置
                    x: null,
                    y: null,
                },
                thisTimeMovementDistanceX: 12,
                imageArrayLength: showroomImages.length
            }
        }
    }

    //紀錄觸控起點，存入state中
    handleMainImageTouchStart(event) {
        this.setState({
            showroom: {
                ...this.state.showroom,
                lastTimeImageIndex: this.state.showroom.currentImageIndex,
                thisTimeTouchStart: {
                    x: event.targetTouches[0].pageX,
                    y: event.targetTouches[0].pageY,
                }
            }
        }, () => console.log(this.state.showroom.lastTimeImageIndex))
    }

    //紀錄目前觸摸的位置，存入state中
    handleMainImageTouchMove(event) {
        this.setState({
            showroom: {
                ...this.state.showroom,
                currentTouchPosition: {
                    x: event.targetTouches[0].pageX,
                    y: event.targetTouches[0].pageY,
                }
            }
        }, () => this.updateMovementDistance());
        // console.log(this.state.showroom.thisTimeTouchStart.x);
        // console.log(event.targetTouches[0].pageX);
    }

    //更新到目前為止，觸摸移動的距離
    updateMovementDistance() {
        let currentTouchPosition = this.state.showroom.currentTouchPosition.x;
        let thisTimeTouchStart = this.state.showroom.thisTimeTouchStart.x;
        let thisTimeMovementDistanceX = currentTouchPosition - thisTimeTouchStart;
        this.setState({
            //  目前觸摸位置X - 觸摸開始位置x
            showroom: {
                ...this.state.showroom,
                thisTimeMovementDistanceX: thisTimeMovementDistanceX,
            }
        }, () => this.caculateCurrentImageIndex())
    }

    // 計算目前顯示的3D圖片
    caculateCurrentImageIndex() {
        let currentImageIndex = Math.round(this.state.showroom.lastTimeImageIndex + (this.state.showroom.thisTimeMovementDistanceX / 5 /*這是移動幾個px才更換一張照片*/) % this.state.showroom.imageArrayLength /* 按照圖片張數設定 */);
        if (currentImageIndex >= this.state.showroom.imageArrayLength) {
            currentImageIndex = currentImageIndex - this.state.showroom.imageArrayLength;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = currentImageIndex + this.state.showroom.imageArrayLength;
        }
        this.setState({
            showroom: {
                ...this.state.showroom,
                currentImageIndex: currentImageIndex,
            }
        }, () => console.log(this.state.showroom.currentImageIndex, this.state.showroom.thisTimeMovementDistanceX))
    }

    changeHouseStyleToIndex(selectedHouseStyleIndex) {
        this.setState({
            currentHouseStyleIndex: selectedHouseStyleIndex,
        }, () => console.log('current house style index is ' + this.state.currentHouseStyleIndex));
    }

    // 頁面頂端menu點擊擊觸發
    handlePagerClick(selectedHouseStyleIndex) {
        this.changeHouseStyleToIndex(selectedHouseStyleIndex);
        this.houseStyleSwiperID.swiper.slideTo(selectedHouseStyleIndex - 1);  //轉移到第幾個slider index (Index比selectedHouseStyleIndex少1)
    }

    // Swiper滑動時觸發
    handleSwiperSlide() {
        // 透過swiper滑動更新頁面index
        this.setState({
            currentHouseStyleIndex: this.houseStyleSwiperID.swiper.activeIndex + 1,
        })
    }

    componentDidMount() {
        new Swiper(this.houseStyleSwiperID, {
            direction: 'horizontal',
            pagination: {
                el: this.paginateID,
                // observer: true,
                type: 'bullets',
                clickable: true,
                loop: true,
                // preloadImages: false,
                // lazy:true,
            },
        });    //掛載swiper到DOM houseStyleSwiperID

        // 在每一次slide換頁的時候，觸發更新state.currentSlide
        this.houseStyleSwiperID.swiper.on('slideChange', this.handleSwiperSlide.bind(this));
    }

    render() {
        return (
            <div className="HouseStyleReview">

                {/* 隨戶型更換的圖片 */}
                <TransitionGroup>
                    <CSSTransition
                        in={true}
                        appear={true}   //是否要在第一次掛載TransitionGroup時做動畫
                        timeout={{ enter: 3000, exit: 3000 }}
                        classNames="changeBgImgTransition"
                        key={this.state.currentHouseStyleIndex}
                    >
                        <div className="aboveBg">
                            {(this.state.currentHouseStyleIndex === 1)?(<div className="A5"></div>):(null)}
                            {(this.state.currentHouseStyleIndex === 2)?(<div className="B1"></div>):(null)}
                            {(this.state.currentHouseStyleIndex === 3)?(<div className="C2"></div>):(null)}
                            {(this.state.currentHouseStyleIndex === 4)?(<div className="D6"></div>):(null)}
                            {(this.state.currentHouseStyleIndex === 5)?(<div className="E2"></div>):(null)}
                            {/* <div className="A5"></div>
                            <div className="B1"></div>
                            <div className="C2"></div>
                            <div className="D6"></div>
                            <div className="E2"></div> */}
                        </div>
                    </CSSTransition>
                </TransitionGroup>

                <div className="pager">
                    {/* <div className="text">户型鉴赏</div> */}
                    <div className="barContainer">
                        <ul>
                            <li className={(this.state.currentHouseStyleIndex === 1) ? ("active") : ("")} onClick={() => this.handlePagerClick(1)}>A5</li>
                            <li className={(this.state.currentHouseStyleIndex === 2) ? ("active") : ("")} onClick={() => this.handlePagerClick(2)}>B1</li>
                            <li className={(this.state.currentHouseStyleIndex === 3) ? ("active") : ("")} onClick={() => this.handlePagerClick(3)}>C2</li>
                            <li className={(this.state.currentHouseStyleIndex === 4) ? ("active") : ("")} onClick={() => this.handlePagerClick(4)}>D6</li>
                            <li className={(this.state.currentHouseStyleIndex === 5) ? ("active") : ("")} onClick={() => this.handlePagerClick(5)}>E2</li>
                        </ul>
                    </div>
                </div>

                <div className="swiper-container" ref={self => this.houseStyleSwiperID = self}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            {/* <div className="shortCutAndTextContainer">
                                <div className="shortCutImgContainer">
                                    <img src={require('../../images/HouseStyleReview/ShortCut03.PNG')} alt="" />
                                </div>
                                <div className="textContainer">
                                    <img src={require('../../images/HouseStyleReview/HouseIntroText.jpg')} alt="" />
                                </div>
                            </div> */}
                        </div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                    </div>
                </div>

                <div className="mainImgContainer" onTouchStart={(event) => this.handleMainImageTouchStart(event)} onTouchMove={(event) => this.handleMainImageTouchMove(event)}>
                    {/* <Iframe src="http://hvr.isunupcg.com/james/qiuli-project/gifViewer/index.html" width="100%" height="100%" frameBorder="0"></Iframe> */}
                </div>

            </div>
        )
    }
}

export default HouseStyleReview;