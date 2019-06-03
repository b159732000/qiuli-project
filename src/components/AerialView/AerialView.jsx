import React from 'react';
import './AerialView.scss';
import { Pannellum, PannellumVideo } from "pannellum-react";
import AerialViewPano1 from "../../images/AerialView/AerialViewPano1.jpg";
import AerialViewPano2 from "../../images/AerialView/AerialViewPano2.jpg";
import AerialViewPano3 from "../../images/AerialView/AerialViewPano3.jpg";
import AerialViewPano4 from "../../images/AerialView/AerialViewPano4.jpg";
// import shoppingMallPanoImg from "../../images/AerialView/区域沙盘/"
import AreaMainPano from "../../images/AerialView/Area/AreaMainPano.jpg";

class AerialView extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.state = {
            currentPano: "AreaMainPano",   //現在渲染的全景
            currentPanoImg: AreaMainPano,    //現在渲染的全景圖片檔案
            firstMenuIsActive: false,
            secondMenuIsActive: false,
            currentFirstMenu: "areaView",
            leftTopMenuActiveItem: "mall",
            allInPanoXY: {
                mainProjectIcon: {
                    pitch: -16,
                    yaw: 120,
                }
            }
        }
    }

    onMouseMove() {
        this.updatePointDirectionRotate();
    }
    onTouchMove() {
        this.updatePointDirectionRotate();
    }

    // 更新小地圖視角方向
    updatePointDirectionRotate() {
        let pitch = this.Pannellum.panorama.getPitch();
        let yaw = this.Pannellum.panorama.getYaw();
        let fov = this.Pannellum.panorama.getHfov();
        console.log("Pitch: " + pitch);
        console.log("Yaw: " + yaw);
        console.log("Fov: " + fov);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
        setTimeout(() => this.setState({
            firstMenuIsActive: true,
        }), 400);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onTouchMove);
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
            default:
                break;
        }
        this.setState({
            currentPanoImg: newPanoImg,
            currentPano: newPano,
        })
    }

    handleFirstMenuClick(changeViewTo) {
        this.setState({
            currentFirstMenu: changeViewTo,
        })
    }

    // 點擊右上角Menu觸發
    handleLeftTopMenuItemClick(selectedItem) {
        this.setState({
            leftTopMenuActiveItem: selectedItem,
        })
    }

    render() {
        return (
            <div className="aerialViewContainer">

                {/* 全景圖中心點，用來找hotspot點位置 */}
                <div className="centerPoint"></div>

                <Pannellum
                    width="100%"
                    height="100%"
                    image={this.state.currentPanoImg}
                    pitch={10}
                    yaw={121 /* 起始水平視角位置 */}
                    pitch={-9.9 /* 起始垂直視角位置 */}
                    hfov={60 /* 起始視角縮放 */}
                    maxHfov={90}
                    minHfov={50}
                    haov={360 /* 圖片水平寬度 */}
                    vaov={180 /* 圖片垂直寬度 */}
                    compass={false}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                    ref={self => this.Pannellum = self}
                >

                    {/* 全景圖中專案本體Icon */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={this.state.allInPanoXY.mainProjectIcon.pitch}
                        yaw={this.state.allInPanoXY.mainProjectIcon.yaw}
                        text="This is texting"
                        cssClass="mainHotspot"
                    />

                    {/* 公共 */}
                    {/* 上城区酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-14}
                        yaw={42.7}
                        text="This is texting"
                        cssClass="onTownHotelHotspot"
                    />
                    {/* 诺沃尔酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.4}
                        yaw={46.1}
                        text="This is texting"
                        cssClass="noWallHotelHotspot"
                    />
                    {/* 斯特兰德酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.3}
                        yaw={54.6}
                        text="This is texting"
                        cssClass="stelandhotelHotspot"
                    />
                    {/* Yoma银行 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-2}
                        yaw={84.6}
                        text="This is texting"
                        cssClass="yomaBankHotelHotspot"
                    />
                    {/* AGD银行 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.2}
                        yaw={90.7}
                        text="This is texting"
                        cssClass="AGDBankHotelHotspot"
                    />
                    {/* 达给达警局 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.4}
                        yaw={138.8}
                        text="This is texting"
                        cssClass="daGeDaPoliceHotspot"
                    />
                    {/* AYA银行 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.9}
                        yaw={149.5}
                        text="This is texting"
                        cssClass="AYABankHotspot"
                    />

                </Pannellum>

                <div className="leftTopMenu">
                    <ul>
                        <li className={(this.state.leftTopMenuActiveItem === "mall") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("mall")}>商场</li>
                        <li className={(this.state.leftTopMenuActiveItem === "hospital") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("hospital")}>医疗</li>
                        <li className={(this.state.leftTopMenuActiveItem === "bank") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("bank")}>银行</li>
                        <li className={(this.state.leftTopMenuActiveItem === "education") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("education")}>教育</li>
                        <li className={(this.state.leftTopMenuActiveItem === "hotel") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("hotel")}>酒店</li>
                        <li className={(this.state.leftTopMenuActiveItem === "landmark") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("landmark")}>地标</li>
                    </ul>
                </div>

                {/* 第一層Menu (區位沙盤、項目沙盤) */}
                <div className={(this.state.firstMenuIsActive) ? ("firstMenu active") : ("firstMenu")}>
                    <ul>
                        <li className={(this.state.currentFirstMenu === "areaView") ? ("active") : ("")} onClick={() => this.handleFirstMenuClick("areaView")}>
                            <div className="text">區域沙盤</div>
                            <div className="underBar"></div>
                        </li>
                        <li className={(this.state.currentFirstMenu === "projectView") ? ("active") : ("")} onClick={() => this.handleFirstMenuClick("projectView")}>
                            <div className="text">項目沙盤</div>
                            <div className="underBar"></div>
                        </li>
                    </ul>
                </div>

                {/* 第二層Menu */}
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