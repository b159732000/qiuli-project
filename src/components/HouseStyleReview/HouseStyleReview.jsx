import React from 'react';
import './HouseStyleReview.scss';

class HouseStyleReview extends React.Component {
    render() {
        return (
            <div className="HouseStyleReview">

                <div className="pager">
                    <div className="text">户型鉴赏</div>
                    <div className="barContainer">
                        <ul>
                            <li className="active">A</li>
                            <li>B</li>
                            <li>C</li>
                            <li>D</li>
                            <li>E</li>
                            <li>F</li>
                            <li>G</li>
                            <li>H</li>
                        </ul>
                    </div>
                </div>

                <div className="shortCutAndTextContainer">
                    <div className="shortCutImgContainer">
                        <img src={require('../../images/HouseStyleReview/ShortCut03.PNG')} alt="" />
                    </div>
                    <div className="textContainer">
                        <img src={require('../../images/HouseStyleReview/HouseIntroText.jpg')} alt="" />
                    </div>
                </div>

                <div className="mainImgContainer">
                    <img src={require('../../images/HouseStyleReview/WholeHouse.jpg')} alt="" />
                </div>

            </div>
        )
    }
}

export default HouseStyleReview;