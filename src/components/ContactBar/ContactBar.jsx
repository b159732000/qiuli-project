import React from 'react';
import './ContactBar.scss';

class ContactBar extends React.Component {
    render() {
        return (
            <div className="contactBarContainer">
                <div className="userInfoContainer">
                    <div className="userPortraitContainer">
                        <div className="userPortrait"></div>
                    </div>
                    <div className="userInfoTextContainer">
                        <div className="userName">Inxhi</div>
                        <div className="userPhoneNumber">18688888888</div>
                    </div>
                </div>
                <div className="contactIconContainer">
                    <ul>
                        <li>
                            <div className="icon">
                                <a href="tel:+1-303-499-7111">
                                    <img src={require('../../images/ContactBar/PhoneCall.png')} alt="" />
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <a href="tel:+1-303-499-7111">
                                    <img src={require('../../images/ContactBar/ChatApp.png')} alt="" />
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <a href="sms://+14035550185?body=I%27m%20interested%20in%20your%20product.">
                                    <img src={require('../../images/ContactBar/Messenger.png')} alt="" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ContactBar;