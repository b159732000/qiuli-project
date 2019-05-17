import React from 'react';
import './SampleRoom.scss';
import { Pannellum, PannellumVideo } from 'pannellum-react';
import InHousePano1 from '../../images/SampleRoom/InHousePano1.jpg';
import InHousePano2 from '../../images/SampleRoom/InHousePano2.jpg';

class SampleRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPano: "InHousePano1",   //現在渲染的全景
            currentPanoImg: InHousePano2,    //現在渲染的全景圖片檔案
        }
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
                >
                </Pannellum>
                <div className="smallMapContainer">
                    <div className="imgContainer">
                        <img src="" alt="" />
                        <div className="pointContainer">
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className="textContainer">
                        <img src="" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SampleRoom;