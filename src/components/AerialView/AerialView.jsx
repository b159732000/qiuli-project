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
            leftTopMenuActiveItem: "public",
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
        }, () => this.updateHotspots())
    }

    updateHotspots() {
        console.log(this.Pannellum.panorama);
        // this.Pannellum.panorama.removeHotSpot();
        // this.Pannellum.panorama.addHotSpot();
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
                        cssClass={(this.state.leftTopMenuActiveItem === "public") ? ("onTownHotelHotspot noDisplay") : ("noDisplay")}
                    />
                    {/* 诺沃尔酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.4}
                        yaw={46.1}
                        text="This is texting"
                        cssClass="noWallHotelHotspot"
                        ref={self => this.noWallHotelHotspot = self}
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

                    {/* 生活 */}
                    {/* 海洋购物广场 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-4}
                        yaw={50.4}
                        text="This is texting"
                        cssClass="seaMallHotspot"
                    />
                    {/* 联合生活购物中心 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-0.76}
                        yaw={95}
                        text="This is texting"
                        cssClass="linkLifeMallHotspot"
                    />
                    {/* 友扎广场 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-4}
                        yaw={94.97}
                        text="This is texting"
                        cssClass="friendMallHotspot"
                    />
                    {/* Pro1家具中心 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.3}
                        yaw={95.35}
                        text="This is texting"
                        cssClass="furnitureHotspot"
                    />
                    {/* 财富广场 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.42}
                        yaw={104.6}
                        text="This is texting"
                        cssClass="moneyHotspot"
                    />
                    {/* 资本超市 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-4.5}
                        yaw={130.8}
                        text="This is texting"
                        cssClass="moneyRootHotspot"
                    />
                    {/* 城市超市 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.77}
                        yaw={151.49}
                        text="This is texting"
                        cssClass="cityHotspot"
                    />

                    {/* 交通 */}
                    {/* YangonRiver */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-4.22}
                        yaw={26.7}
                        text="This is texting"
                        cssClass="YangonRiverHotspot"
                    />
                    {/* Strand Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-2.23}
                        yaw={43.28}
                        text="This is texting"
                        cssClass="StrandRdHotspot"
                    />
                    {/* Maha Bandula Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-10.9}
                        yaw={73}
                        text="This is texting"
                        cssClass="MahaBandulaRdHotspot"
                    />
                    {/* Lower Pazundang Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-5.85}
                        yaw={60.3}
                        text="This is texting"
                        cssClass="LowerPazundangRdHotspot"
                    />
                    {/* Yamonnar Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.65}
                        yaw={56.8}
                        text="This is texting"
                        cssClass="YamonnarRdHotspot"
                    />
                    {/* Shukhinthar MayopatRd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-17.46}
                        yaw={96.77}
                        text="This is texting"
                        cssClass="ShukhintharMayopatRdHotspot"
                    />
                    {/* Byay Road */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-2.87}
                        yaw={76.1}
                        text="This is texting"
                        cssClass="ByayRoadHotspot"
                    />
                    {/* Phone Gyist */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.78}
                        yaw={66.64}
                        text="This is texting"
                        cssClass="PhoneGyistHotspot"
                    />
                    {/* Maha Bandoola Bridge */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.8}
                        yaw={72.76}
                        text="This is texting"
                        cssClass="MahaBandoolaBridgeHotspot"
                    />
                    {/* U Wisara Road */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-0.15}
                        yaw={71}
                        text="This is texting"
                        cssClass="UWisaraRoadHotspot"
                    />
                    {/* Thaketa Bridge */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.09}
                        yaw={82.9}
                        text="This is texting"
                        cssClass="ThaketaBridgeHotspot"
                    />
                    {/* Bago River */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-45.6}
                        yaw={115.3}
                        text="This is texting"
                        cssClass="BagoRiverHotspot"
                    />
                    {/* Pazundaung Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.48}
                        yaw={109}
                        text="This is texting"
                        cssClass="PazundaungRdHotspot"
                    />
                    {/* Min Nandar Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.19}
                        yaw={105.75}
                        text="This is texting"
                        cssClass="MinNandarRdHotspot"
                    />
                    {/* Zingama Rd */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.77}
                        yaw={151.49}
                        text="This is texting"
                        cssClass="ZingamaRdHotspot"
                    />

                    {/* 医疗 */}
                    {/* 草地医院 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-8.86}
                        yaw={71.6}
                        text="This is texting"
                        cssClass="grassHospitalHotspot"
                    />
                    {/* 金Boho医院 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.32}
                        yaw={126.6}
                        text="This is texting"
                        cssClass="goldBohoHospitalHotspot"
                    />
                    {/* 达给达医院 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-5.41}
                        yaw={173.86}
                        text="This is texting"
                        cssClass="dagedaHospitalHotspot"
                    />

                    {/* 教育 */}
                    {/* 第一基础教育高中 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-4.1}
                        yaw={119.18}
                        text="This is texting"
                        cssClass="seniorHighHotspot"
                    />
                    {/* 第一基础教育中学 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.5}
                        yaw={131}
                        text="This is texting"
                        cssClass="juniorHighHotspot"
                    />
                    {/* Shukhinnehar国际学校 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.58}
                        yaw={-164}
                        text="This is texting"
                        cssClass="nationalHotspot"
                    />
                    {/* 第九基础教育小学 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.8}
                        yaw={56.3}
                        text="This is texting"
                        cssClass="elemantaryHotspot"
                    />

                    {/* 景观 */}
                    {/* 仰光水上乐园 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-8.5}
                        yaw={33}
                        text="This is texting"
                        cssClass="waterPlayHotspot"
                    />
                    {/* ManPaya Ward足球场 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-10.1}
                        yaw={76.9}
                        text="This is texting"
                        cssClass="footballHotspot"
                    />
                    {/* Zina Man Aung佛塔 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-0.879}
                        yaw={152}
                        text="This is texting"
                        cssClass="ZinaManHotspot"
                    />

                </Pannellum>

                <div className="leftTopMenu">
                    <ul>
                        <li className={(this.state.leftTopMenuActiveItem === "public") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("public")}>公共</li>
                        <li className={(this.state.leftTopMenuActiveItem === "life") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("life")}>生活</li>
                        <li className={(this.state.leftTopMenuActiveItem === "traffic") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("traffic")}>交通</li>
                        <li className={(this.state.leftTopMenuActiveItem === "hospital") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("hospital")}>医疗</li>
                        <li className={(this.state.leftTopMenuActiveItem === "education") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("education")}>教育</li>
                        <li className={(this.state.leftTopMenuActiveItem === "landmark") ? ("active") : ("")} onClick={() => this.handleLeftTopMenuItemClick("landmark")}>景观</li>
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