import React from 'react';
import './SampleRoom.scss';
import { Pannellum, PannellumVideo } from 'pannellum-react';
// import InHousePano1 from '../../images/SampleRoom/InHousePano1.jpg';
// import InHousePano2 from '../../images/SampleRoom/InHousePano2.jpg';
// A5全景圖
import A5_chufang from '../../images/SampleRoom/A5/A5_chufang.jpg';
import A5_ciwo from '../../images/SampleRoom/A5/A5_ciwo.jpg';
import A5_ertongfang from '../../images/SampleRoom/A5/A5_ertongfang.jpg';
import A5_keting from '../../images/SampleRoom/A5/A5_keting.jpg';
import A5_xishoujian from '../../images/SampleRoom/A5/A5_xishoujian.jpg';
import A5_zhuwei from '../../images/SampleRoom/A5/A5_zhuwei.jpg';
import A5_zhuwo from '../../images/SampleRoom/A5/A5_zhuwo.jpg';
// B1全景圖
import B1_nverfang from '../../images/SampleRoom/B1/B1_nverfang.jpg';
import B1_chufang from '../../images/SampleRoom/B1/B1_chufang.jpg';
import B1_ciwei from '../../images/SampleRoom/B1/B1_ciwei.jpg';
import B1_ertongfang from '../../images/SampleRoom/B1/B1_ertongfang.jpg';
import B1_keting from '../../images/SampleRoom/B1/B1_keting.jpg';
import B1_xishoujian from '../../images/SampleRoom/B1/B1_nverfang.jpg';
import B1_zhuwei from '../../images/SampleRoom/B1/B1_zhuwei.jpg';
import B1_zhuwo from '../../images/SampleRoom/B1/B1_zhuwo.jpg';
// C2全景圖
import C2_chufang from '../../images/SampleRoom/C2/C2_chufang.jpg';
import C2_ciwei from '../../images/SampleRoom/C2/C2_ciwei.jpg';
import C2_keting from '../../images/SampleRoom/C2/C2_keting.jpg';
import C2_zhuwo from '../../images/SampleRoom/C2/C2_zhuwo.jpg';
import C2_nverfang from '../../images/SampleRoom/C2/C2_nverfang.jpg';
// D6全景圖
import D6_keting from '../../images/SampleRoom/D6/D6_keting.jpg';
import D6_zhuwo from '../../images/SampleRoom/D6/D6_zhuwo.jpg';
import D6_nverfang from '../../images/SampleRoom/D6/D6_nverfang.jpg';
// E2全景圖
import E2_keting from '../../images/SampleRoom/E2/E2_keting.jpg';
import E2_zhuwo from '../../images/SampleRoom/E2/E2_zhuwo.jpg';

class SampleRoom extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.state = {
            currentPano: "A5_keting",   //現在渲染的全景
            currentPanoImg: A5_keting,    //現在渲染的全景圖片檔案
            currentHouseStyle: "A5",
            menuIsActive: false,
            room: 'keting',
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + 100 + "deg)",
            },
            InHousePano1: {     //畫面中按鈕的位置...等等資訊
                hotspots: {
                    yaw: -32,
                    pitch: -22,
                }
            },
            InHousePano2: {     //畫面中按鈕的位置...等等資訊
                hotspots: {
                    yaw: -32,
                    pitch: -22,
                }
            },
            smallMapSrc: require('../../images/SampleRoom/A5/A5户型平面图.PNG'),
            startYaw: 0,    //畫面最初Yaw
            startPitch: 0,    //畫面最初Pitch
            fixSmallMapDirectionRotation: 180,      //小地圖視角方向修正角度
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
        setTimeout(() => this.setState({
            menuIsActive: true,
        }), 400);

        // 更新小地圖視角
        this.updatePointDirectionRotate();
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('touchmove', this.onTouchMove);
        this.setState({
            menuIsActive: false,
        });
    }

    onMouseMove() {
        this.updatePointDirectionRotate();
    }
    onTouchMove() {
        this.updatePointDirectionRotate();
    }

    // 轉動全景圖時觸發
    updatePointDirectionRotate() {
        // 更新小地圖視角
        let currentPointDirectionRotate = this.Pannellum.panorama.getYaw() + this.state.fixSmallMapDirectionRotation;
        // console.log(currentPointDirectionRotate);
        this.setState({
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + currentPointDirectionRotate + "deg)",
            }
        });

        // console即時的pitch, yaw, fov
        let pitch = this.Pannellum.panorama.getPitch();
        let yaw = this.Pannellum.panorama.getYaw();
        let fov = this.Pannellum.panorama.getHfov();
        console.log("Yaw: " + yaw);
        console.log("Pitch: " + pitch);
        console.log("rotationFix: " + this.state.fixSmallMapDirectionRotation);
        // console.log("Fov: " + fov);
    }

    // 小地圖紅點按下時觸發
    handleSmallMapIconClick(roomSelected) {
        this.changeRoom(roomSelected);
        console.log(this.state.currentPano, this.state.room);
    }

    // 全景圖中箭頭按下時觸發
    handleMapIndicatorClick(roomSelected) {
        this.changeRoom(roomSelected);
    }

    // 更換state的房間
    changeRoom(roomSelected) {
        this.setState({
            room: roomSelected,
        }, () => this.changeCurrentPano())
    }

    // 更換全景圖
    /* 先用if比對房型，再用switch比對房間
       最後載入對應的全景圖檔案(放在this.state中)*/
    changeCurrentPano() {


        let PanoWillBeLoaded, nextPano;

        if (this.state.currentHouseStyle === "A5") {
            switch (this.state.room) {
                case "chufang":
                    PanoWillBeLoaded = A5_chufang;
                    nextPano = "A5_chufang";
                    this.setState({
                        startYaw: 90,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 0,
                    })
                    break;
                case "ciwo":
                    PanoWillBeLoaded = A5_ciwo;
                    nextPano = "A5_ciwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 0,
                    })
                    break;
                case "keting":
                    PanoWillBeLoaded = A5_keting;
                    nextPano = "A5_keting";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 180,
                    })
                    break;
                case "ertongfang":
                    PanoWillBeLoaded = A5_ertongfang;
                    nextPano = "A5_ertongfang";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "xishoujian":
                    PanoWillBeLoaded = A5_xishoujian;
                    nextPano = "A5_xishoujian";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: -90,
                    })
                    break;
                case "zhuwei":
                    PanoWillBeLoaded = A5_zhuwei;
                    nextPano = "A5_zhuwei";
                    // this.setState({
                    //     startYaw: 0,
                    //     startPitch: 0,
                    //     fixSmallMapDirectionRotation: -90,
                    // })
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = A5_zhuwo;
                    nextPano = "A5_zhuwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "B1") {
            switch (this.state.room) {
                case "chufang":
                    PanoWillBeLoaded = B1_chufang;
                    nextPano = "B1_chufang";
                    break;
                case "ciwei":
                    PanoWillBeLoaded = B1_ciwei;
                    nextPano = "B1_ciwei";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 0,
                    })
                    break;
                case "ertongfang":
                    PanoWillBeLoaded = B1_ertongfang;
                    nextPano = "B1_ertongfang";
                    this.setState({
                        startYaw: -50,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "keting":
                    PanoWillBeLoaded = B1_keting;
                    nextPano = "B1_keting";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 180,
                    })
                    break;
                case "xishoujian":
                    PanoWillBeLoaded = B1_xishoujian;
                    nextPano = "B1_xishoujian";
                    break;
                case "zhuwei":
                    PanoWillBeLoaded = B1_zhuwei;
                    nextPano = "B1_zhuwei";
                    this.setState({
                        startYaw: 18,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = B1_zhuwo;
                    nextPano = "B1_zhuwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "nverfang":
                    PanoWillBeLoaded = B1_nverfang;
                    nextPano = "B1_nverfang";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 0,
                    })
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "C2") {
            switch (this.state.room) {
                case "chufang":
                    PanoWillBeLoaded = C2_chufang;
                    nextPano = "C2_chufang";
                    this.setState({
                        startYaw: 57,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: -90,
                    })
                    break;
                case "ciwei":
                    PanoWillBeLoaded = C2_ciwei;
                    nextPano = "C2_ciwei";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: -90,
                    })
                    break;
                case "keting":
                    PanoWillBeLoaded = C2_keting;
                    nextPano = "C2_keting";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 180,
                    })
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = C2_zhuwo;
                    nextPano = "C2_zhuwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: -90,
                    })
                    break;
                case "nverfang":
                    PanoWillBeLoaded = C2_nverfang;
                    nextPano = "C2_nverfang";
                    this.setState({
                        startYaw: -137,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 90,
                    })
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "D6") {
            switch (this.state.room) {
                case "keting":
                    PanoWillBeLoaded = D6_keting;
                    nextPano = "D6_keting";
                    this.setState({
                        startYaw: 90,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = D6_zhuwo;
                    nextPano = "D6_zhuwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                case "nverfang":
                    PanoWillBeLoaded = D6_nverfang;
                    nextPano = "D6_nverfang";
                    this.setState({
                        startYaw: 62,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 180,
                    })
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "E2") {
            switch (this.state.room) {
                case "keting":
                    PanoWillBeLoaded = E2_keting;
                    nextPano = "E2_keting";
                    this.setState({
                        startYaw: 18,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 0,
                    })
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = E2_zhuwo;
                    nextPano = "E2_zhuwo";
                    this.setState({
                        startYaw: 0,
                        startPitch: 0,
                        fixSmallMapDirectionRotation: 270,
                    })
                    break;
                default:
                    break;
            }
        }

        this.setState({
            currentPano: nextPano,
            currentPanoImg: PanoWillBeLoaded,
            transform: "translate(-50%, -50%) rotate(" + 100 + "deg)",  //將鏡頭旋轉角度設為預設值
        }, () => this.updatePointDirectionRotate())
    }

    // menu點選時觸發
    handleMenuClick(selectedHouseStyle) {
        // 更換當前戶型，並將房間切換成客廳(預設)
        this.setState({
            currentHouseStyle: selectedHouseStyle,
            currentPano: selectedHouseStyle,
            room: 'keting',
        }, () => this.handleCurrentHouseChange());
    }

    // 當戶型變化時觸發
    handleCurrentHouseChange() {
        this.changeSmallMapSrc();
        this.changeCurrentPano();
        this.updateHotspots();
    }

    // 更換小地圖路徑
    changeSmallMapSrc() {
        switch (this.state.currentHouseStyle) {
            case 'A5':
                this.setState({ smallMapSrc: require('../../images/SampleRoom/A5/A5户型平面图.PNG') });
                break;
            case 'B1':
                this.setState({ smallMapSrc: require('../../images/SampleRoom/B1/B1户型平面图.PNG') });
                break;
            case 'C2':
                this.setState({ smallMapSrc: require('../../images/SampleRoom/C2/C2户型平面图.PNG') });
                break;
            case 'D6':
                this.setState({ smallMapSrc: require('../../images/SampleRoom/D6/D6户型平面图.PNG') });
                break;
            case 'E2':
                this.setState({ smallMapSrc: require('../../images/SampleRoom/E2/E2户型平面图.PNG') });
                break;
            default:
                break;
        };
    }

    // 隱藏所有箭頭
    hideAllHotspot() {
        document.getElementsByClassName('A5LivingRoomToKitchen')[0].style.display = "none";
        document.getElementsByClassName('A5LivingRoomToErtonfang')[0].style.display = "none";
        document.getElementsByClassName('A5LivingRoomTociwo')[0].style.display = "none";
        document.getElementsByClassName('A5LivingRoomTozhuwo')[0].style.display = "none";
        document.getElementsByClassName('A5CiwoToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('A5MainRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('A5MainRoomToMainBathroom')[0].style.display = "none";
        document.getElementsByClassName('A5MainBathroomToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('A5SecondRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('A5KitchenToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('B1LivingRoomToSecondBathroom')[0].style.display = "none";
        document.getElementsByClassName('B1LivingRoomToChildRoom')[0].style.display = "none";
        document.getElementsByClassName('B1LivingRoomToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('B1LivingRoomToBabyRoom')[0].style.display = "none";
        document.getElementsByClassName('B1SecondBathroomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('B1SecondBathroomToChildRoom')[0].style.display = "none";
        document.getElementsByClassName('B1ChildRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('B1MainRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('B1MainRoomToMainBath')[0].style.display = "none";
        document.getElementsByClassName('B1MainBathToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('B1BabyRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('C2KitchenToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('C2SecondBathToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('C2MainRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('C2BabyRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('C2LivingRoomToSecondBath')[0].style.display = "none";
        document.getElementsByClassName('C2LivingRoomToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('C2LivingRoomToBabyRoom')[0].style.display = "none";
        document.getElementsByClassName('C2LivingRoomToKitchen')[0].style.display = "none";
        document.getElementsByClassName('D6LivingRoomToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('D6LivingRoomToSecondRoom')[0].style.display = "none";
        document.getElementsByClassName('D6SecondRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('D6MainRoomToLivingRoom')[0].style.display = "none";
        document.getElementsByClassName('E2LivingRoomToMainRoom')[0].style.display = "none";
        document.getElementsByClassName('E2MainRoomToLivingRoom')[0].style.display = "none";
    }

    // 依照戶型和房間，決定顯示的Hotspots
    updateHotspots() {
        // 隱藏所有Hotspots
        this.hideAllHotspot();
        // 依照戶型和房間，決定顯示的Hotspots
        if (this.state.currentHouseStyle === "A5") {
            switch (this.state.currentPano) {
                case "A5_keting":
                    document.getElementsByClassName('A5LivingRoomToKitchen')[0].style.display = "";
                    document.getElementsByClassName('A5LivingRoomToErtonfang')[0].style.display = "";
                    document.getElementsByClassName('A5LivingRoomTociwo')[0].style.display = "";
                    document.getElementsByClassName('A5LivingRoomTozhuwo')[0].style.display = "";
                    break;
                case "A5_ertongfang":
                    document.getElementsByClassName('A5CiwoToLivingRoom')[0].style.display = "";
                    console.log("success");
                    break;
                case "A5_zhuwo":
                    document.getElementsByClassName('A5MainRoomToLivingRoom')[0].style.display = "";
                    document.getElementsByClassName('A5MainRoomToMainBathroom')[0].style.display = "";
                    break;
                case "A5_xishoujian":
                    document.getElementsByClassName('A5MainBathroomToMainRoom')[0].style.display = "";
                    break;
                case "A5_ciwo":
                    document.getElementsByClassName('A5SecondRoomToLivingRoom')[0].style.display = "";
                    break;
                case "A5_chufang":
                    document.getElementsByClassName('A5KitchenToLivingRoom')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "B1") {
            switch (this.state.currentPano) {
                case "B1_keting":
                    document.getElementsByClassName('B1LivingRoomToSecondBathroom')[0].style.display = "";
                    document.getElementsByClassName('B1LivingRoomToChildRoom')[0].style.display = "";
                    document.getElementsByClassName('B1LivingRoomToMainRoom')[0].style.display = "";
                    document.getElementsByClassName('B1LivingRoomToBabyRoom')[0].style.display = "";
                    break;
                case "B1_ertongfang":
                    document.getElementsByClassName('B1ChildRoomToLivingRoom')[0].style.display = "";
                    break;
                case "B1_zhuwo":
                    document.getElementsByClassName('B1MainRoomToMainBath')[0].style.display = "";
                    document.getElementsByClassName('B1MainRoomToLivingRoom')[0].style.display = "";
                    break;
                case "B1_nverfang":
                    document.getElementsByClassName('B1BabyRoomToLivingRoom')[0].style.display = "";
                    break;
                case "B1_zhuwei":
                    document.getElementsByClassName('B1MainBathToMainRoom')[0].style.display = "";
                    break;
                case "B1_ciwei":
                    document.getElementsByClassName('B1SecondBathroomToLivingRoom')[0].style.display = "";
                    document.getElementsByClassName('B1SecondBathroomToChildRoom')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "C2") {
            switch (this.state.currentPano) {
                case "C2_keting":
                    document.getElementsByClassName('C2LivingRoomToSecondBath')[0].style.display = "";
                    document.getElementsByClassName('C2LivingRoomToMainRoom')[0].style.display = "";
                    document.getElementsByClassName('C2LivingRoomToBabyRoom')[0].style.display = "";
                    document.getElementsByClassName('C2LivingRoomToKitchen')[0].style.display = "";
                    break;
                case "C2_ertongfang":
                    break;
                case "C2_zhuwo":
                    document.getElementsByClassName('C2MainRoomToLivingRoom')[0].style.display = "";
                    break;
                case "C2_nverfang":
                    document.getElementsByClassName('C2BabyRoomToLivingRoom')[0].style.display = "";
                    break;
                case "C2_zhuwei":
                    break;
                case "C2_ciwei":
                    document.getElementsByClassName('C2SecondBathToLivingRoom')[0].style.display = "";
                    break;
                case "C2_chufang":
                    document.getElementsByClassName('C2KitchenToLivingRoom')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "D6") {
            switch (this.state.currentPano) {
                case "D6_keting":
                    document.getElementsByClassName('D6LivingRoomToMainRoom')[0].style.display = "";
                    document.getElementsByClassName('D6LivingRoomToSecondRoom')[0].style.display = "";
                    break;
                case "D6_zhuwo":
                    document.getElementsByClassName('D6MainRoomToLivingRoom')[0].style.display = "";
                    break;
                case "D6_nverfang":
                    document.getElementsByClassName('D6SecondRoomToLivingRoom')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
        if (this.state.currentHouseStyle === "E2") {
            switch (this.state.currentPano) {
                case "E2_keting":
                    document.getElementsByClassName('E2LivingRoomToMainRoom')[0].style.display = "";
                    break;
                case "D6_zhuwo":
                    document.getElementsByClassName('E2MainRoomToLivingRoom')[0].style.display = "";
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <div className="SampleRoomContainer">

                {/* 全景圖中心點，用來找hotspot點位置 */}
                {/* <div className="centerPoint"></div> */}

                {/* 全景圖 */}
                <Pannellum
                    width="100%"
                    height="100%"
                    image={this.state.currentPanoImg}
                    pitch={10}
                    yaw={this.state.startYaw /* 起始水平視角位置 */}
                    pitch={this.state.startPitch /* 起始垂直視角位置 */}
                    hfov={80 /* 起始視角縮放 */}
                    maxHfov={90}
                    minHfov={60}
                    haov={360 /* 圖片水平寬度 */}
                    vaov={180 /* 圖片垂直寬度 */}
                    compass={false}
                    showZoomCtrl={false}
                    showFullscreenCtrl={false}
                    autoLoad
                    showControls={false}
                    ref={self => this.Pannellum = self}
                    onLoad={() => this.updateHotspots()}
                >
                    {/* A5客廳到廚房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={173.57}
                        pitch={-3.44}
                        text="This is texting"
                        cssClass="A5LivingRoomToKitchen"
                        handleClick={() => this.handleSmallMapIconClick("chufang")}
                    />
                    {/* A5客廳到兒童房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={86.36}
                        pitch={-29}
                        text="This is texting"
                        cssClass="A5LivingRoomToErtonfang"
                        handleClick={() => this.handleSmallMapIconClick("ertongfang")}
                    />
                    {/* A5客廳到次臥箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={89.36}
                        pitch={-16.7}
                        text="This is texting"
                        cssClass="A5LivingRoomTociwo"
                        handleClick={() => this.handleSmallMapIconClick("ciwo")}
                    />
                    {/* A5客廳到主臥箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={89.8}
                        pitch={-5.5}
                        text="This is texting"
                        cssClass="A5LivingRoomTozhuwo"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* A5次臥到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={93.79}
                        pitch={-17}
                        text="This is texting"
                        cssClass="A5CiwoToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* A5主臥到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={99.9}
                        pitch={-12.94}
                        text="This is texting"
                        cssClass="A5MainRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* A5主臥到主浴箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={99.9}
                        pitch={4.7}
                        text="This is texting"
                        cssClass="A5MainRoomToMainBathroom"
                        handleClick={() => this.handleSmallMapIconClick("xishoujian")}
                    />
                    {/* A5主浴到主臥箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-180}
                        pitch={-17}
                        text="This is texting"
                        cssClass="A5MainBathroomToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* A5次臥到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={92}
                        pitch={-19}
                        text="This is texting"
                        cssClass="A5SecondRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* A5廚房到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={168}
                        pitch={-17}
                        text="This is texting"
                        cssClass="A5KitchenToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* B1客廳到次衛箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={98.5}
                        pitch={-17.6}
                        text="This is texting"
                        cssClass="B1LivingRoomToSecondBathroom"
                        handleClick={() => this.handleSmallMapIconClick("ciwei")}
                    />
                    {/* B1客廳到兒童房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={78.6}
                        pitch={-15}
                        text="This is texting"
                        cssClass="B1LivingRoomToChildRoom"
                        handleClick={() => this.handleSmallMapIconClick("ertongfang")}
                    />
                    {/* B1客廳到主臥室箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={84}
                        pitch={-3.13}
                        text="This is texting"
                        cssClass="B1LivingRoomToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* B1客廳到嬰兒房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={94}
                        pitch={-3.3}
                        text="This is texting"
                        cssClass="B1LivingRoomToBabyRoom"
                        handleClick={() => this.handleSmallMapIconClick("nverfang")}
                    />
                    {/* B1次衛到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={148}
                        pitch={-12.2}
                        text="This is texting"
                        cssClass="B1SecondBathroomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* B1次衛到兒童房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={173}
                        pitch={-10}
                        text="This is texting"
                        cssClass="B1SecondBathroomToChildRoom"
                        handleClick={() => this.handleSmallMapIconClick("ertongfang")}
                    />
                    {/* B1兒童房到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={100}
                        pitch={-8.89}
                        text="This is texting"
                        cssClass="B1ChildRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* B1主臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={104}
                        pitch={-5.3}
                        text="This is texting"
                        cssClass="B1MainRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* B1主臥室到主浴室箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={87.1}
                        pitch={-9.4}
                        text="This is texting"
                        cssClass="B1MainRoomToMainBath"
                        handleClick={() => this.handleSmallMapIconClick("zhuwei")}
                    />
                    {/* B1主浴室到主臥室箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-158.3}
                        pitch={-36}
                        text="This is texting"
                        cssClass="B1MainBathToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* B1嬰兒房到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={125}
                        pitch={-13}
                        text="This is texting"
                        cssClass="B1BabyRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />


                    {/* C2客廳到廚房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={137}
                        pitch={-13}
                        text="This is texting"
                        cssClass="C2LivingRoomToKitchen"
                        handleClick={() => this.handleSmallMapIconClick("chufang")}
                    />
                    {/* C2客廳到嬰兒房箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={78}
                        pitch={-22}
                        text="This is texting"
                        cssClass="C2LivingRoomToBabyRoom"
                        handleClick={() => this.handleSmallMapIconClick("nverfang")}
                    />
                    {/* C2客廳到主臥箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={89}
                        pitch={-11}
                        text="This is texting"
                        cssClass="C2LivingRoomToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* C2客廳到次衛箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={97}
                        pitch={-17}
                        text="This is texting"
                        cssClass="C2LivingRoomToSecondBath"
                        handleClick={() => this.handleSmallMapIconClick("ciwei")}
                    />
                    {/* C2嬰兒房到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-70}
                        pitch={-13}
                        text="This is texting"
                        cssClass="C2BabyRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* C2主臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={105}
                        pitch={-16}
                        text="This is texting"
                        cssClass="C2MainRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* C2次衛到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-94}
                        pitch={-21}
                        text="This is texting"
                        cssClass="C2SecondBathToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* C2廚房到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-135}
                        pitch={-21}
                        text="This is texting"
                        cssClass="C2KitchenToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />


                    {/* D6客廳到主臥室箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={77.8}
                        pitch={-8}
                        text="This is texting"
                        cssClass="D6LivingRoomToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* D6客廳到次臥室箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-14}
                        pitch={-15}
                        text="This is texting"
                        cssClass="D6LivingRoomToSecondRoom"
                        handleClick={() => this.handleSmallMapIconClick("nverfang")}
                    />
                    {/* D6次臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-112}
                        pitch={-17}
                        text="This is texting"
                        cssClass="D6SecondRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                    {/* D6主臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={127}
                        pitch={-12}
                        text="This is texting"
                        cssClass="D6MainRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />

                    {/* E2主臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-128}
                        pitch={-16}
                        text="This is texting"
                        cssClass="E2LivingRoomToMainRoom"
                        handleClick={() => this.handleSmallMapIconClick("zhuwo")}
                    />
                    {/* E2主臥室到客廳箭頭 */}
                    <Pannellum.Hotspot
                        type="custom"
                        yaw={-85}
                        pitch={-6}
                        text="This is texting"
                        cssClass="E2MainRoomToLivingRoom"
                        handleClick={() => this.handleSmallMapIconClick("keting")}
                    />
                </Pannellum>

                {/* 小地圖 */}
                <div className="smallMapContainer">
                    <div className="imgContainer">
                        <img src={(this.state.smallMapSrc)} alt="" />
                    </div>

                    {/* 小地圖紅點及視角 */}
                    <div className="pointContainer">

                        {/* A5紅點*6 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint one") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ciwo")}></div> {/* 次臥 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint two") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("xishoujian")}></div> {/* 洗手間 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint three") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint four") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("chufang")}></div> {/* 廚房 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint five") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ertongfang")}></div> {/* 中下次臥 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint six") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}

                        {/* B1紅點*7 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint one") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("nverfang")}></div> {/* 次臥 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint two") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwei")}></div> {/* 主衛 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint three") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "A5") ? ("point A5InhousePoint four") : ("point A5InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("chufang")}></div> {/* 廚房 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint five") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ertongfang")}></div> {/* 中下次臥 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint six") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}
                        <div className={(this.state.currentHouseStyle === "B1") ? ("point B1InhousePoint seven") : ("point B1InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ciwei")}></div> {/* 次衛 */}

                        {/* C2紅點*5 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint one") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("nverfang")}></div> {/* 嬰兒房 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint two") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ciwei")}></div> {/* 次衛 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint three") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint four") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("chufang")}></div> {/* 廚房 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint five") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}

                        {/* D6紅點*3 */}
                        <div className={(this.state.currentHouseStyle === "D6") ? ("point D6InhousePoint one") : ("point D6InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "D6") ? ("point D6InhousePoint two") : ("point D6InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("nverfang")}></div> {/* 次臥 */}
                        <div className={(this.state.currentHouseStyle === "D6") ? ("point D6InhousePoint three") : ("point D6InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}

                        {/* E2紅點*3 */}
                        <div className={(this.state.currentHouseStyle === "E2") ? ("point E2InhousePoint one") : ("point E2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "E2") ? ("point E2InhousePoint two") : ("point E2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}

                        {/* 紅點旋轉方向 */}
                        <div className={"pointDirection" + " " + this.state.currentPano} style={this.state.pointDirectionTransform}></div>
                    </div>
                </div>

                {/* 底部Menu */}
                <div className={(this.state.menuIsActive) ? ("menu active") : ("menu")}>
                    <ul>
                        <li className={(this.state.currentHouseStyle === "A5") ? ("active") : ("")} onClick={() => this.handleMenuClick("A5")}>
                            <div className="text">A5</div>
                            <div className="underBar"></div>
                        </li>
                        <li className={(this.state.currentHouseStyle === "B1") ? ("active") : ("")} onClick={() => this.handleMenuClick("B1")}>
                            <div className="text">B1</div>
                            <div className="underBar"></div>
                        </li>
                        <li className={(this.state.currentHouseStyle === "C2") ? ("active") : ("")} onClick={() => this.handleMenuClick("C2")}>
                            <div className="text">C2</div>
                            <div className="underBar"></div>
                        </li>
                        <li className={(this.state.currentHouseStyle === "D6") ? ("active") : ("")} onClick={() => this.handleMenuClick("D6")}>
                            <div className="text">D6</div>
                            <div className="underBar"></div>
                        </li>
                        <li className={(this.state.currentHouseStyle === "E2") ? ("active") : ("")} onClick={() => this.handleMenuClick("E2")}>
                            <div className="text">E2</div>
                            <div className="underBar"></div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SampleRoom;