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
            pointDirectionTransform: {
                transform: "translate(-50%, -50%) rotate(" + 100 + "deg)",
            }
        }
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('touchmove', this.onTouchMove);
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
            </div>
        )
    }
}

export default SampleRoom;