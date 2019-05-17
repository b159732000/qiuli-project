import React from 'react';
import './AerialView.scss';
import { Pannellum, PannellumVideo } from "pannellum-react";
import AerialViewPano1 from "../../images/AerialView/AerialViewPano1.jpg";
import AerialViewPano2 from "../../images/AerialView/AerialViewPano2.jpg";
import AerialViewPano3 from "../../images/AerialView/AerialViewPano3.jpg";
import AerialViewPano4 from "../../images/AerialView/AerialViewPano4.jpg";

class AerialView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPano: "Pano1",   //現在渲染的全景
            currentPanoImg: AerialViewPano1,    //現在渲染的全景圖片檔案
        }
    }

    handleMenuClick(newPanoImg) {
        switch (newPanoImg) {
            case "Pano1":
                var newPanoImg = AerialViewPano1;
                var newPano = "Pano1";
                break;
            case "Pano2":
                var newPanoImg = AerialViewPano2;
                var newPano = "Pano2";
                break;
            case "Pano3":
                var newPanoImg = AerialViewPano3;
                var newPano = "Pano3";
                break;
            case "Pano4":
                var newPanoImg = AerialViewPano4;
                var newPano = "Pano4";
                break;
        }
        this.setState({
            currentPanoImg: newPanoImg,
            currentPano: newPano,
        })

    }

    render() {
        return (
            <div className="aerialViewContainer">

                <Pannellum
                    width="100%"
                    height="100%"
                    image={this.state.currentPanoImg}
                    pitch={10}
                    yaw={-22 /* 起始水平視角位置 */}
                    pitch={-32 /* 起始垂直視角位置 */}
                    hfov={80 /* 起始視角縮放 */}
                    maxHfov={90}
                    minHfov={60}
                    haov={360 /* 圖片水平寬度 */}
                    vaov={180 /* 圖片垂直寬度 */}
                    compass={false}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                >
                </Pannellum>

                <div className="menuContainer">
                    <ul className="menuList">
                        <li className={(this.state.currentPano === "Pano1") ? "active" : ""} onClick={() => this.handleMenuClick("Pano1")}>
                            <div className="inner">
                                <div className="bgImg"></div>
                                <div className="text">全景鸟瞰</div>
                            </div>
                        </li>
                        <li className={(this.state.currentPano === "Pano2") ? "active" : ""} onClick={() => this.handleMenuClick("Pano2")}>
                            <div className="inner">
                                <div className="bgImg"></div>
                                <div className="text">项目鸟瞰</div>
                            </div>
                        </li>
                        <li className={(this.state.currentPano === "Pano3") ? "active" : ""} onClick={() => this.handleMenuClick("Pano3")}>
                            <div className="inner">
                                <div className="bgImg"></div>
                                <div className="text">园林展示</div>
                            </div>
                        </li>
                        <li className={(this.state.currentPano === "Pano4") ? "active" : ""} onClick={() => this.handleMenuClick("Pano4")}>
                            <div className="inner">
                                <div className="bgImg"></div>
                                <div className="text">户型展示</div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default AerialView;