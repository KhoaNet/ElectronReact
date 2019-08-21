import React, { Component } from 'react';
import { connect } from 'react-redux';
import download from '../../../dowload';
import moment from 'moment';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.clickFile = this.clickFile.bind(this);
    }

    clickFile(m) {
        const { recentChat } = this.props;
        download(`http://localhost:3010/api/dowload/${recentChat.FK_GroupID}/${m.MessageText}`);
    }

    render() {
        const { messages, user, recentChat } = this.props;
        return (
            <div class="messages">
                <ul>
                    {messages.map(m => {
                        let text = '';

                        if (m.IsFile)
                            text = <a href="#" onClick={() => this.clickFile(m)}>{m.MessageText}</a>
                        else
                            text = m.MessageText
                        if (m.FK_UserID != user.UserID) {
                            return <li class="replies">
                                <div id="mess-date-replies">{m.UserName + ',' + moment(m.MessageTime).format('h:mm a')}</div>
                                <img src={m.UserAvatar} alt="" />
                                <p>{text}</p>
                            </li>
                        } else {
                            return <li class="sent">
                                <img src={m.UserAvatar} alt="" />
                                <div id="mess-date-sent">{m.UserName + ',' + moment(m.MessageTime).format('h:mm a')}</div>
                                <p>{text}</p>
                            </li>
                        }
                    })}
                </ul>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user ? state.user : [],
        messages: state.messages ? state.messages : [],
        recentChat: state.recentChat ? state.recentChat : null
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);