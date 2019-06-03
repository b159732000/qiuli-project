import React from 'react';
import './SampleRoom.scss';
import { Pannellum, PannellumVideo } from 'pannellum-react';
import InHousePano1 from '../../images/SampleRoom/InHousePano1.jpg';
import InHousePano2 from '../../images/SampleRoom/InHousePano2.jpg';
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
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
        setTimeout(() => this.setState({
            menuIsActive: true,
        }), 400);
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

    // 更新小地圖視角方向
    updatePointDirectionRotate() {
        let currentPointDirectionRotate = this.Pannellum.panorama.getYaw() + 180;
        // console.log(currentPointDirectionRotate);
        this.setState({
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + currentPointDirectionRotate + "deg)",
            }
        });
    }

    // 小地圖紅點按下時觸發
    handleSmallMapIconClick(roomSelected) {
        this.changeRoom(roomSelected);
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
                    break;
                case "ciwo":
                    PanoWillBeLoaded = A5_ciwo;
                    nextPano = "A5_ciwo";
                    break;
                case "keting":
                    PanoWillBeLoaded = A5_keting;
                    nextPano = "A5_keting";
                    break;
                case "ertongfang":
                    PanoWillBeLoaded = A5_ertongfang;
                    nextPano = "A5_ertongfang";
                    break;
                case "xishoujian":
                    PanoWillBeLoaded = A5_xishoujian;
                    nextPano = "A5_xishoujian";
                    break;
                case "zhuwei":
                    PanoWillBeLoaded = A5_zhuwei;
                    nextPano = "A5_zhuwei";
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = A5_zhuwo;
                    nextPano = "A5_zhuwo";
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
                    break;
                case "ertongfang":
                    PanoWillBeLoaded = B1_ertongfang;
                    nextPano = "B1_ertongfang";
                    break;
                case "keting":
                    PanoWillBeLoaded = B1_keting;
                    nextPano = "B1_keting";
                    break;
                case "xishoujian":
                    PanoWillBeLoaded = B1_xishoujian;
                    nextPano = "B1_xishoujian";
                    break;
                case "zhuwei":
                    PanoWillBeLoaded = B1_zhuwei;
                    nextPano = "B1_zhuwei";
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = B1_zhuwo;
                    nextPano = "B1_zhuwo";
                    break;
                case "nverfang":
                    PanoWillBeLoaded = B1_nverfang;
                    nextPano = "B1_nverfang";
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
                    break;
                case "ciwei":
                    PanoWillBeLoaded = C2_ciwei;
                    nextPano = "C2_ciwei";
                    break;
                case "keting":
                    PanoWillBeLoaded = C2_keting;
                    nextPano = "C2_keting";
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = C2_zhuwo;
                    nextPano = "C2_zhuwo";
                    break;
                case "nverfang":
                    PanoWillBeLoaded = C2_nverfang;
                    nextPano = "C2_nverfang";
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
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = D6_zhuwo;
                    nextPano = "D6_zhuwo";
                    break;
                case "nverfang":
                    PanoWillBeLoaded = D6_nverfang;
                    nextPano = "D6_nverfang";
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
                    break;
                case "zhuwo":
                    PanoWillBeLoaded = E2_zhuwo;
                    nextPano = "E2_zhuwo";
                    break;
                default:
                    break;
            }
        }

        this.setState({
            currentPano: nextPano,
            currentPanoImg: PanoWillBeLoaded,
            transform: "translate(-50%, -50%) rotate(" + 100 + "deg)",  //將鏡頭旋轉角度設為預設值
        })
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

    render() {
        return (
            <div className="SampleRoomContainer">

                {/* 全景圖 */}
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
                    ref={self => this.Pannellum = self}
                >
                    <Pannellum.Hotspot
                        //InHousePano1的按鈕，按下去移動到InHousePano2
                        type="custom"
                        pitch={this.state.InHousePano1.hotspots.pitch}
                        yaw={this.state.InHousePano1.hotspots.yaw}
                        text="This is texting"
                        cssClass={(this.state.currentPano === "InHousePano1") ? ("") : ("noDisplay")}
                        handleClick={() => this.handleMapIndicatorClick()}
                    />
                    <Pannellum.Hotspot
                        //InHousePano2的按鈕，按下去移動到InHousePano1
                        type="custom"
                        pitch={this.state.InHousePano2.hotspots.pitch}
                        yaw={this.state.InHousePano2.hotspots.yaw}
                        text="This is texting"
                        cssClass={(this.state.currentPano === "InHousePano2") ? ("") : ("noDisplay")}
                        handleClick={() => this.handleMapIndicatorClick()}
                    />
                    {/*<Pannellum.Hotspot
                        type="info"
                        pitch={-25}
                        yaw={-39}
                        text="This is texting"
                        url="https://google.com"
                        cssClass="hotspot1"
                    />*/}
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
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint one") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("nverfang")}></div> {/* 中間下面的次臥 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint two") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("ciwei")}></div> {/* 洗手間 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint three") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint four") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("chufang")}></div> {/* 廚房 */}
                        <div className={(this.state.currentHouseStyle === "C2") ? ("point C2InhousePoint five") : ("point C2InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("keting")}></div> {/* 客廳 */}

                        {/* D6紅點*3 */}
                        <div className={(this.state.currentHouseStyle === "D6") ? ("point D6InhousePoint one") : ("point D6InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("nverfang")}></div> {/* 次臥 */}
                        <div className={(this.state.currentHouseStyle === "D6") ? ("point D6InhousePoint two") : ("point D6InhousePoint one noDisplay")} onClick={() => this.handleSmallMapIconClick("zhuwo")}></div> {/* 主臥 */}
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