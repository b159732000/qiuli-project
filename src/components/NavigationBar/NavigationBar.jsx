import React from 'react';
import './NavigationBar.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openMoreMenu, closeMoreMenu, updateRenderingPage } from '../../actions/actions.js';
import More from '../More/More.jsx';

function mapStateToProps(state) {
    return {
        moreMenuIsOpen: state.myFirstReducers.moreMenuIsOpen,
        renderingPage: state.myFirstReducers.renderingPage,
    }
}

class NavigationBar extends React.Component {
    closeMoreMenu = () => {
        this.props.closeMoreMenu();
    }
    openMoreMenu = () => {
        this.props.openMoreMenu();
    }
    updateRenderingPage = (PageWantToGoTo) => {
        this.props.updateRenderingPage(PageWantToGoTo);
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleMenuItemClick(PageWantToGoTo) {
        if(this.props.moreMenuIsOpen) {
            this.closeMoreMenu();
        }
        this.updateRenderingPage(PageWantToGoTo);
    }

    // 按下更多按鈕時，顯示或隱藏更多選單
    handleMoreButtonClick() {
        if (this.props.moreMenuIsOpen) {
            this.closeMoreMenu();
        } else if (!this.props.moreMenuIsOpen) {
            this.openMoreMenu();
        }
        console.log(window.location.pathname);
    }

    render() {
        return (
            <div className="navigationBarContainer">
                <ul>
                    {/*<li className={(window.location.pathname.indexOf("/AerialView")>=0) ? ("active") : ("")}>*/}
                    <li className={(this.props.renderingPage === "AerialView") ? ("active") : ("")}>
                        <Link to='/james/qiuli-project/AerialView' onClick={() => this.handleMenuItemClick('AerialView')}>
                            <div className="menuIconContainer">
                                <img src={require('../../images/NavigationBar/AerialViewIcon.png')}></img>
                            </div>
                            <div className="text">全景鸟瞰</div>
                        </Link>
                    </li>
                    <li className={(this.props.renderingPage === "HouseStyleReview") ? ("active") : ("")}>
                        <Link to='/james/qiuli-project/HouseStyleReview' onClick={() => this.handleMenuItemClick('HouseStyleReview')}>
                            <div className="menuIconContainer">
                                <img src={require('../../images/NavigationBar/HouseStyleReviewIcon.png')}></img>
                            </div>
                            <div className="text">户型鉴赏</div>
                        </Link>
                    </li>
                    <li className={(this.props.renderingPage === "Traffic") ? ("active") : ("")}>
                        <Link to="/james/qiuli-project/Traffic" onClick={() => this.handleMenuItemClick('Traffic')}>
                            <div className="menuIconContainer">
                                <img src={require('../../images/NavigationBar/TrafficIcon.png')}></img>
                            </div>
                            <div className="text">区位交通</div>
                        </Link>
                    </li>
                    <li className={(this.props.renderingPage === "SampleRoom") ? ("active") : ("")}>
                        <Link to='/james/qiuli-project/SampleRoom' onClick={() => this.handleMenuItemClick('SampleRoom')}>
                            <div className="menuIconContainer">
                                <img src={require('../../images/NavigationBar/SampleRoomIcon.png')}></img>
                            </div>
                            <div className="text">样板间鉴赏</div>
                        </Link>
                    </li>
                    <li className={(window.location.pathname.indexOf("/More")>=0) ? ("active") : ("")} onClick={() => this.handleMoreButtonClick()}>
                            <div className="menuIconContainer">
                                <img src={require('../../images/NavigationBar/MoreIcon.png')}></img>
                            </div>
                            <div className="text">更多</div>
                    </li>
                </ul>
                <More></More>
            </div>
        )
    }
}

const mapDispatchToProps = {
    openMoreMenu,
    closeMoreMenu,
    updateRenderingPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);