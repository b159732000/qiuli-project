import React from 'react';
import './SampleRoom.scss';
import { Pannellum, PannellumVideo } from 'pannellum-react';
import InHousePano1 from '../../images/SampleRoom/InHousePano1.jpg';
import InHousePano2 from '../../images/SampleRoom/InHousePano2.jpg';

class SampleRoom extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.state = {
            currentPano: "InHousePano1",   //現在渲染的全景
            currentPanoImg: InHousePano1,    //現在渲染的全景圖片檔案
            currentHouseStyle: "A5",
            menuIsActive: false,
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
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
        setTimeout(()=>this.setState({
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

    updatePointDirectionRotate() {
        let currentPointDirectionRotate = this.Pannellum.panorama.getYaw() + 180;
        // console.log(currentPointDirectionRotate);
        this.setState({
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + currentPointDirectionRotate + "deg)",
            }
        });
        console.log("running");
    }

    handleSmallMapIconClick(newPano) {
        this.changeCurrentPanoTo(newPano);
    }

    handleMapIndicatorClick() {
        switch (this.state.currentPano) {
            case "InHousePano1":
                this.changeCurrentPanoTo("InHousePano2");
                break;
            case "InHousePano2":
                this.changeCurrentPanoTo("InHousePano1");
                break;
            default:
                return;
        }
    }

    changeCurrentPanoTo(newPano) {
        let PanoWillBeLoaded = null;
        switch (newPano) {
            case "InHousePano1":
                PanoWillBeLoaded = InHousePano1;
                break;
            case "InHousePano2":
                PanoWillBeLoaded = InHousePano2;
                break;
            default:
                return;
        };
        this.setState({
            currentPano: newPano,
            currentPanoImg: PanoWillBeLoaded,
            transform: "translate(-50%, -50%) rotate(" + 100 + "deg)",  //將鏡頭旋轉角度設為預設值
        }, console.log(this.state.currentPano))
    }

    // menu點選時觸發
    handleMenuClick(selectedHouseStyle) {
        // 更換當前戶型
        this.setState({
            currentHouseStyle: selectedHouseStyle,
        });
    }

    render() {
        return (
            <div className="SampleRoomContainer">
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
                <div className="smallMapContainer">
                    <div className="imgContainer">
                        <img src={require('../../images/SampleRoom/SmallMap.png')} alt="" />
                    </div>
                    <div className="pointContainer">
                        <div className="point InHousePano1" onClick={() => this.handleSmallMapIconClick("InHousePano1")}></div>
                        <div className="point InHousePano2" onClick={() => this.handleSmallMapIconClick("InHousePano2")}></div>
                        <div className={"pointDirection" + " " + this.state.currentPano} style={this.state.pointDirectionTransform}></div>
                    </div>
                </div>
                <div className={(this.state.menuIsActive)?("menu active"):("menu")}>
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