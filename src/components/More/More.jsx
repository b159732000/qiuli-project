import React from 'react';
import './More.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        moreMenuIsOpen: state.myFirstReducers.moreMenuIsOpen,
    }
}

class More extends React.Component {
    render() {
        return (
            <div className={(this.props.moreMenuIsOpen)?("moreContainer active"):("moreContainer")}>
                <div className="menuContainer">
                    <div className="upperSide">
                        <ul>
                            {/*<li>
                                <div className="icon"></div>
                                <div className="text">园林漫游</div>
                            </li>
                            <li>
                                <div className="icon"></div>
                                <div className="text">自由模块</div>
                            </li>
                            <li>
                                <div className="icon"></div>
                                <div className="text">自由模块</div>
                            </li>*/}
                            <li>
                            <Link to='/james/qiuli-project/DigitalBook'>
                                <div className="icon"><img src={require('../../images/More/Information.png')} alt=""/></div>
                                <div className="text">电子楼书</div>
                            </Link>
                            </li>
                            {/* <li>
                                <div className="icon"><img src={require('../../images/More/House.png')} alt=""/></div>
                                <div className="text">某某在线家</div>
                            </li> */}
                        </ul>
                    </div>
                    < div className="downSide">
                        <ul>
                            <li>
                                <div className="icon"><img src={require('../../images/More/Music.png')} alt=""/></div>
                            </li>
                            <li>
                                <div className="icon"><img src={require('../../images/More/Settings.png')} alt=""/></div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(More);