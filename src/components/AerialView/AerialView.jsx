import React from 'react';
import './AerialView.scss';
import { Pannellum, PannellumVideo } from "pannellum-react";
import AerialViewPano1 from "../../images/AerialView/AerialViewPano1.jpg";
import AerialViewPano2 from "../../images/AerialView/AerialViewPano2.jpg";
import AerialViewPano3 from "../../images/AerialView/AerialViewPano3.jpg";
import AerialViewPano4 from "../../images/AerialView/AerialViewPano4.jpg";
// import shoppingMallPanoImg from "../../images/AerialView/区域沙盘/"
import AreaMainPano from "../../images/AerialView/Area/AreaMainPano.jpg";
import ProjectMainPano from "../../images/AerialView/Area/ProjectPano.jpg";
import travelParkHotspot1 from "../../images/AerialView/TravelPark/1.jpg";
import travelParkHotspot2 from "../../images/AerialView/TravelPark/2.jpg";
import travelParkHotspot3 from "../../images/AerialView/TravelPark/3.jpg";
import travelParkHotspot4 from "../../images/AerialView/TravelPark/4.jpg";
import travelParkHotspot5 from "../../images/AerialView/TravelPark/5.jpg";

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
            travelParkPanoNumber: 1,
            currentFirstMenu: "areaView",   //用來決定區位沙盤/項目沙盤Menu的active狀態
            leftTopMenuActiveItem: "public",
            allInPanoXY: {
                mainProjectIcon: {
                    pitch: -16,
                    yaw: 120,
                }
            }
        }
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

    onMouseMove() {
        this.updatePointDirectionRotate();
    }
    onTouchMove() {
        this.updatePointDirectionRotate();
    }

    // 轉動全景圖時觸發
    updatePointDirectionRotate() {
        let pitch = this.Pannellum.panorama.getPitch();
        let yaw = this.Pannellum.panorama.getYaw();
        let fov = this.Pannellum.panorama.getHfov();
        console.log("Pitch: " + pitch);
        console.log("Yaw: " + yaw);
        console.log("Fov: " + fov);
    }

    // 樣板用的，本專案沒用到
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

    // 區位沙盤/項目沙盤/園林漫遊，點選時觸發
    handleFirstMenuClick(changeFirstMenuActive) {
        this.setState({
            currentFirstMenu: changeFirstMenuActive, //用來決定區位沙盤/項目沙盤Menu的active狀態
            travelParkPanoNumber: 1, //將園林漫遊的張數切回預設第1張
        }, () => this.updateCurrentPano())
    }

    // 更新顯示的全景圖，按照State紀錄的螢幕下方Menu狀態(區位沙盤/項目沙盤/園林漫遊)
    updateCurrentPano() {
        switch (this.state.currentFirstMenu) {
            case "areaView":
                this.setState({
                    currentPano: "AreaMainPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                    currentPanoImg: AreaMainPano, //決定載入的全景圖
                })
                break;
            case "projectView":
                this.setState({
                    currentPano: "ProjectMainPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                    currentPanoImg: ProjectMainPano, //決定載入的全景圖
                })
                break;
            case "TravelParkPano":
                // 決定顯示園林漫遊第幾張 (按照TravelParknumber決定顯示的全景圖)
                switch (this.state.travelParkPanoNumber) {
                    case 1:
                        this.setState({
                            currentPano: "TravelParkPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                            currentPanoImg: travelParkHotspot1, //決定載入的全景圖 - 園林漫遊1
                        })
                        break;
                    case 2:
                        this.setState({
                            currentPano: "TravelParkPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                            currentPanoImg: travelParkHotspot2, //決定載入的全景圖 - 園林漫遊1
                        })
                        break;
                    case 3:
                        this.setState({
                            currentPano: "TravelParkPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                            currentPanoImg: travelParkHotspot3, //決定載入的全景圖 - 園林漫遊1
                        })
                        break;
                    case 4:
                        this.setState({
                            currentPano: "TravelParkPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                            currentPanoImg: travelParkHotspot4, //決定載入的全景圖 - 園林漫遊1
                        })
                        break;
                    case 5:
                        this.setState({
                            currentPano: "TravelParkPano", //用來決定區位沙盤/項目沙盤Menu的active狀態
                            currentPanoImg: travelParkHotspot5, //決定載入的全景圖 - 園林漫遊1
                        })
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    // 點擊左上角Menu觸發
    handleLeftTopMenuItemClick(selectedItem) {
        this.setState({
            leftTopMenuActiveItem: selectedItem,
        }, () => this.updateHotspots())
    }

    // 決定要顯示哪些Icon (按照左上角的Menu及區域沙盤/項目沙盤/園林漫遊)
    updateHotspots() {
        // 如果是在首頁的主要Pano畫面，則執行此頁的ICON顯示隱藏
        if (this.state.currentPano === "AreaMainPano") {
            // 隱藏AreaMainPano所有ICON，顯示專案本體LOGO
            this.hideAreaMainPanoAllIcon();
            this.hideProjectMainPanoAllIcon();
            this.hideTravelParkPanoAllIcon();
            document.getElementsByClassName('mainHotspot')[0].style.display = "";
            // 按照左上Menu決定顯現哪些ICON
            switch (this.state.leftTopMenuActiveItem) {
                case "public":
                    document.getElementsByClassName('onTownHotelHotspot')[0].style.display = "";
                    document.getElementsByClassName('noWallHotelHotspot')[0].style.display = "";
                    document.getElementsByClassName('stelandhotelHotspot')[0].style.display = "";
                    document.getElementsByClassName('yomaBankHotelHotspot')[0].style.display = "";
                    document.getElementsByClassName('AGDBankHotelHotspot')[0].style.display = "";
                    document.getElementsByClassName('daGeDaPoliceHotspot')[0].style.display = "";
                    document.getElementsByClassName('AYABankHotspot')[0].style.display = "";
                    break;
                case "life":
                    document.getElementsByClassName('seaMallHotspot')[0].style.display = "";
                    document.getElementsByClassName('linkLifeMallHotspot')[0].style.display = "";
                    document.getElementsByClassName('friendMallHotspot')[0].style.display = "";
                    document.getElementsByClassName('furnitureHotspot')[0].style.display = "";
                    document.getElementsByClassName('moneyHotspot')[0].style.display = "";
                    document.getElementsByClassName('moneyRootHotspot')[0].style.display = "";
                    document.getElementsByClassName('cityHotspot')[0].style.display = "";
                    break;
                case "traffic":
                    document.getElementsByClassName('YangonRiverHotspot')[0].style.display = "";
                    document.getElementsByClassName('StrandRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('MahaBandulaRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('LowerPazundangRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('YamonnarRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('ShukhintharMayopatRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('ByayRoadHotspot')[0].style.display = "";
                    document.getElementsByClassName('PhoneGyistHotspot')[0].style.display = "";
                    document.getElementsByClassName('MahaBandoolaBridgeHotspot')[0].style.display = "";
                    document.getElementsByClassName('UWisaraRoadHotspot')[0].style.display = "";
                    document.getElementsByClassName('ThaketaBridgeHotspot')[0].style.display = "";
                    document.getElementsByClassName('BagoRiverHotspot')[0].style.display = "";
                    document.getElementsByClassName('PazundaungRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('MinNandarRdHotspot')[0].style.display = "";
                    document.getElementsByClassName('ZingamaRdHotspot')[0].style.display = "";
                    break;
                case "hospital":
                    document.getElementsByClassName('grassHospitalHotspot')[0].style.display = "";
                    document.getElementsByClassName('goldBohoHospitalHotspot')[0].style.display = "";
                    document.getElementsByClassName('dagedaHospitalHotspot')[0].style.display = "";
                    break;
                case "education":
                    document.getElementsByClassName('seniorHighHotspot')[0].style.display = "";
                    document.getElementsByClassName('juniorHighHotspot')[0].style.display = "";
                    document.getElementsByClassName('nationalHotspot')[0].style.display = "";
                    document.getElementsByClassName('elemantaryHotspot')[0].style.display = "";
                    break;
                case "landmark":
                    document.getElementsByClassName('waterPlayHotspot')[0].style.display = "";
                    document.getElementsByClassName('footballHotspot')[0].style.display = "";
                    document.getElementsByClassName('ZinaManHotspot')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }

        // 項目沙盤要顯示的Icon
        if (this.state.currentPano === "ProjectMainPano") {
            this.hideAreaMainPanoAllIcon();
            this.hideTravelParkPanoAllIcon();
            this.hideMainHotspot();
            document.getElementsByClassName('firstHotspot')[0].style.display = "";
            document.getElementsByClassName('secondHotspot')[0].style.display = "";
            document.getElementsByClassName('thirdHotspot')[0].style.display = "";
            document.getElementsByClassName('fifthHotspot')[0].style.display = "";
            document.getElementsByClassName('sixthHotspot')[0].style.display = "";
            document.getElementsByClassName('seventhHotspot')[0].style.display = "";
            document.getElementsByClassName('eighthHotspot')[0].style.display = "";
            document.getElementsByClassName('ninethHotspot')[0].style.display = "";
            document.getElementsByClassName('tenthHotspot')[0].style.display = "";
            document.getElementsByClassName('eleventhHotspot')[0].style.display = "";
            document.getElementsByClassName('twelvethHotspot')[0].style.display = "";
            document.getElementsByClassName('travelParkHotspot')[0].style.display = "";
        }

        // 在園林漫遊Pano中
        if (this.state.currentPano === "TravelParkPano") {
            // 隱藏所有ICON
            this.hideAreaMainPanoAllIcon();
            this.hideProjectMainPanoAllIcon();
            this.hideTravelParkPanoAllIcon();
            this.hideMainHotspot();
            // 依據園林漫遊第幾張圖，決定顯示的Icon
            switch (this.state.travelParkPanoNumber) {
                // 園林漫遊1
                case 1:
                    document.getElementsByClassName('travelParkOneToTwoHotspot')[0].style.display = "";
                    document.getElementsByClassName('travelParkOneToThreeHotspot')[0].style.display = "";
                    document.getElementsByClassName('travelParkOneToFiveHotspot')[0].style.display = "";
                    break;
                // 園林漫遊2
                case 2:
                    document.getElementsByClassName('travelParkTwoToOneHotspot')[0].style.display = "";
                    document.getElementsByClassName('travelParkTwoToThreeHotspot')[0].style.display = "";
                    break;
                // 園林漫遊3
                case 3:
                    document.getElementsByClassName('travelParkThreeToOneHotspot')[0].style.display = "";
                    document.getElementsByClassName('travelParkThreeToTwoHotspot')[0].style.display = "";
                    document.getElementsByClassName('travelParkThreeToFourHotspot')[0].style.display = "";
                    break;
                // 園林漫遊4
                case 4:
                    document.getElementsByClassName('travelParkFourToThreeHotspot')[0].style.display = "";
                    break;
                // 園林漫遊5
                case 5:
                    document.getElementsByClassName('travelParkFiveToOneHotspot')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
    }

    // 隱藏AreaMainPano所有ICON
    hideAreaMainPanoAllIcon() {
        document.getElementsByClassName('onTownHotelHotspot')[0].style.display = "none";
        document.getElementsByClassName('noWallHotelHotspot')[0].style.display = "none";
        document.getElementsByClassName('stelandhotelHotspot')[0].style.display = "none";
        document.getElementsByClassName('yomaBankHotelHotspot')[0].style.display = "none";
        document.getElementsByClassName('AGDBankHotelHotspot')[0].style.display = "none";
        document.getElementsByClassName('daGeDaPoliceHotspot')[0].style.display = "none";
        document.getElementsByClassName('AYABankHotspot')[0].style.display = "none";
        document.getElementsByClassName('seaMallHotspot')[0].style.display = "none";
        document.getElementsByClassName('linkLifeMallHotspot')[0].style.display = "none";
        document.getElementsByClassName('friendMallHotspot')[0].style.display = "none";
        document.getElementsByClassName('furnitureHotspot')[0].style.display = "none";
        document.getElementsByClassName('moneyHotspot')[0].style.display = "none";
        document.getElementsByClassName('moneyRootHotspot')[0].style.display = "none";
        document.getElementsByClassName('cityHotspot')[0].style.display = "none";
        document.getElementsByClassName('YangonRiverHotspot')[0].style.display = "none";
        document.getElementsByClassName('StrandRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('MahaBandulaRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('LowerPazundangRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('YamonnarRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('ShukhintharMayopatRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('ByayRoadHotspot')[0].style.display = "none";
        document.getElementsByClassName('PhoneGyistHotspot')[0].style.display = "none";
        document.getElementsByClassName('MahaBandoolaBridgeHotspot')[0].style.display = "none";
        document.getElementsByClassName('UWisaraRoadHotspot')[0].style.display = "none";
        document.getElementsByClassName('ThaketaBridgeHotspot')[0].style.display = "none";
        document.getElementsByClassName('BagoRiverHotspot')[0].style.display = "none";
        document.getElementsByClassName('PazundaungRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('MinNandarRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('ZingamaRdHotspot')[0].style.display = "none";
        document.getElementsByClassName('grassHospitalHotspot')[0].style.display = "none";
        document.getElementsByClassName('goldBohoHospitalHotspot')[0].style.display = "none";
        document.getElementsByClassName('dagedaHospitalHotspot')[0].style.display = "none";
        document.getElementsByClassName('seniorHighHotspot')[0].style.display = "none";
        document.getElementsByClassName('juniorHighHotspot')[0].style.display = "none";
        document.getElementsByClassName('nationalHotspot')[0].style.display = "none";
        document.getElementsByClassName('elemantaryHotspot')[0].style.display = "none";
        document.getElementsByClassName('waterPlayHotspot')[0].style.display = "none";
        document.getElementsByClassName('footballHotspot')[0].style.display = "none";
        document.getElementsByClassName('ZinaManHotspot')[0].style.display = "none";
    };

    // 隱藏項目沙盤所有ICON
    hideProjectMainPanoAllIcon() {
        document.getElementsByClassName('firstHotspot')[0].style.display = "none";
        document.getElementsByClassName('secondHotspot')[0].style.display = "none";
        document.getElementsByClassName('thirdHotspot')[0].style.display = "none";
        document.getElementsByClassName('fifthHotspot')[0].style.display = "none";
        document.getElementsByClassName('sixthHotspot')[0].style.display = "none";
        document.getElementsByClassName('seventhHotspot')[0].style.display = "none";
        document.getElementsByClassName('eighthHotspot')[0].style.display = "none";
        document.getElementsByClassName('ninethHotspot')[0].style.display = "none";
        document.getElementsByClassName('tenthHotspot')[0].style.display = "none";
        document.getElementsByClassName('eleventhHotspot')[0].style.display = "none";
        document.getElementsByClassName('twelvethHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkHotspot')[0].style.display = "none";
    }
    
    // 隱藏園林漫遊所有的ICON
    hideTravelParkPanoAllIcon() {
        document.getElementsByClassName('travelParkOneToTwoHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkOneToThreeHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkOneToFiveHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkTwoToOneHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkTwoToThreeHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkThreeToOneHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkThreeToTwoHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkThreeToFourHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkFourToThreeHotspot')[0].style.display = "none";
        document.getElementsByClassName('travelParkFiveToOneHotspot')[0].style.display = "none";
    }

    // 隱藏專案位置標示圖標
    hideMainHotspot() {
        document.getElementsByClassName('mainHotspot')[0].style.display = "none";
    }

    // 園林漫遊內箭頭點選時觸發，跳轉到第幾張園林漫遊全景圖
    handleTravelParkInnerIconClick(number) {
        this.setState({
            travelParkPanoNumber: number,
        }, () => this.updateCurrentPano())
    }

    render() {
        return (
            <div className="aerialViewContainer">

                {/* 全景圖中心點，用來找hotspot點位置 */}
                {/* <div className="centerPoint"></div> */}

                {/* 全景圖 */}
                <Pannellum
                    width="100%"
                    height="100%"
                    image={this.state.currentPanoImg}
                    pitch={10}
                    yaw={125 /* 起始水平視角位置 */}
                    pitch={-15.6 /* 起始垂直視角位置 */}
                    hfov={60 /* 起始視角縮放 */}
                    maxHfov={90}
                    minHfov={50}
                    haov={360 /* 圖片水平寬度 */}
                    vaov={180 /* 圖片垂直寬度 */}
                    compass={false}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                    showControls={false}
                    ref={self => this.Pannellum = self}
                    onLoad={() => this.updateHotspots()}      //按照左上角的Menu，決定要顯示哪些Icon
                >
                    {/* 全景圖中專案本體Icon */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={this.state.allInPanoXY.mainProjectIcon.pitch}
                        yaw={this.state.allInPanoXY.mainProjectIcon.yaw}
                        text="This is texting"
                        cssClass="mainHotspot"
                        handleClick={() => this.handleFirstMenuClick("projectView")}
                    />

                    {/* 公共*7 */}
                    {/* 上城区酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-14}
                        yaw={42.7}
                        text="This is texting"
                        cssClass="onTownHotelHotspot"
                        id={"onTownHotelHotspot"}
                    />
                    {/* 诺沃尔酒店 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.4}
                        yaw={46.1}
                        text="This is texting"
                        cssClass="noWallHotelHotspot"
                    // ref={self => this.noWallHotelHotspot = self}
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

                    {/* 生活*7 */}
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

                    {/* 項目沙盤 */}
                    {/* 1棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-19.5}
                        yaw={133.6}
                        text="This is texting"
                        cssClass="firstHotspot"
                    />
                    {/* 2棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-14}
                        yaw={152.8}
                        text="This is texting"
                        cssClass="secondHotspot"
                    />
                    {/* 3棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-14}
                        yaw={133.4}
                        text="This is texting"
                        cssClass="thirdHotspot"
                    />
                    {/* 5棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-14.2}
                        yaw={118.5}
                        text="This is texting"
                        cssClass="fifthHotspot"
                    />
                    {/* 6棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-11.3}
                        yaw={133.25}
                        text="This is texting"
                        cssClass="sixthHotspot"
                    />
                    {/* 7棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-11}
                        yaw={112.6}
                        text="This is texting"
                        cssClass="seventhHotspot"
                    />
                    {/* 8棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.34}
                        yaw={126.4}
                        text="This is texting"
                        cssClass="eighthHotspot"
                    />
                    {/* 9棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-9.3}
                        yaw={108.16}
                        text="This is texting"
                        cssClass="ninethHotspot"
                    />
                    {/* 10棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-8.03}
                        yaw={120.5}
                        text="This is texting"
                        cssClass="tenthHotspot"
                    />
                    {/* 11棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-6.82}
                        yaw={106.95}
                        text="This is texting"
                        cssClass="eleventhHotspot"
                    />
                    {/* 12棟 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-5.91}
                        yaw={114.27}
                        text="This is texting"
                        cssClass="twelvethHotspot"
                    />
                    {/* 園林漫遊主ICON */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-33.17}
                        yaw={144}
                        text="This is texting"
                        cssClass="travelParkHotspot"
                        handleClick={() => this.handleFirstMenuClick("TravelParkPano")}
                    />

                    {/* 園林漫遊1内的箭头*3 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-11.7}
                        yaw={-59.6}
                        text="This is texting"
                        cssClass="travelParkOneToTwoHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(2)}
                    />
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-10}
                        yaw={-46}
                        text="This is texting"
                        cssClass="travelParkOneToThreeHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(3)}
                    />
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-1.1}
                        yaw={88.3}
                        text="This is texting"
                        cssClass="travelParkOneToFiveHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(5)}
                    />

                    {/* 園林漫遊2内的箭头*2 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.9}
                        yaw={92.5}
                        text="This is texting"
                        cssClass="travelParkTwoToOneHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(1)}
                    />
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.7}
                        yaw={43.2}
                        text="This is texting"
                        cssClass="travelParkTwoToThreeHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(3)}
                    />

                    {/* 園林漫遊3内的箭头*3 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.73}
                        yaw={153.3}
                        text="This is texting"
                        cssClass="travelParkThreeToOneHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(1)}
                    />
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-2.28}
                        yaw={-163.8}
                        text="This is texting"
                        cssClass="travelParkThreeToTwoHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(2)}
                    />
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-3.37}
                        yaw={43.2}
                        text="This is texting"
                        cssClass="travelParkThreeToFourHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(4)}
                    />

                    {/* 園林漫遊4内的箭头*1 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-8.98}
                        yaw={-152.36}
                        text="This is texting"
                        cssClass="travelParkFourToThreeHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(3)}
                    />

                    {/* 園林漫遊5内的箭头*1 */}
                    <Pannellum.Hotspot
                        type="custom"
                        pitch={-7.5}
                        yaw={88.75}
                        text="This is texting"
                        cssClass="travelParkFiveToOneHotspot"
                        handleClick={() => this.handleTravelParkInnerIconClick(1)}
                    />

                </Pannellum>

                <div className={(this.state.currentPano === "AreaMainPano") ? ("leftTopMenu") : ("leftTopMenu noDisplay")}>
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
                        <li className={(this.state.currentFirstMenu === "TravelParkPano") ? ("active") : ("")} onClick={() => this.handleFirstMenuClick("TravelParkPano")}>
                            <div className="text">园林漫游</div>
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