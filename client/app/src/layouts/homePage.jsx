import React, { Component } from 'react';
import { connect } from 'react-redux';
import SIDEPANEL from "./sidepanel";
import CONTENTLAYOUT from "./contentLayout";
import io from 'socket.io-client'
import { bindActionCreators } from 'redux';
import { actionSocket } from '../services/socket/actionSocket';
import { actionModal } from '../services/actionModal';
import { actions } from '../services/actions';
import ModalNotiContact from './modals/modalNotiContact';
import ModalMessBoxCon from './modals/modalMessBoxCon';
import PageWelcome from './pageWelcome';

class HOMEPAGE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            userName: '',
            url: 'http://localhost:3010/',
            users: [],
            messages: [],
        };

        this.toggle = this.toggle.bind(this);
        this.handleText = this.handleText.bind(this);
        this.initSocket = this.initSocket.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendText = this.sendText.bind(this);
        this.sendContact = this.sendContact.bind(this);
        this.reContact = this.reContact.bind(this);
    }
    componentWillMount() {
        this.initSocket();
        this.socket.emit('login');
    }
    initSocket() {
        const socket = io.connect(this.state.url);
        socket.on('connect', (data) => {
            this.props.online();
        });
        socket.on('message', (data) => {
            const { recentChats, messages } = data;
            const { user, recLocal } = this.props;
            const recent = recentChats.find(r => r.FK_UserID === user.UserID);
            if (recent.RecentChatID === recLocal.RecentChatID) {
                this.props.sendmessage({
                    messages: messages,
                    recentChat: recent,
                });
            }
            else {
                this.props.logMess({
                    recentChat: recent,
                });
            }
        });
        socket.on('login', (data) => {
            console.log(data);
            if (data) {
                data.forEach(e => {
                    if (e && e.user.UserID === this.props.user.UserID) {
                        this.props.notiContact(e);
                    }
                });
            }
        });
        socket.on('contact', (data) => {
            this.props.notiContact(data);
        });
        socket.on('recontact', (data) => {
            const { is, user, creId } = data;
            if (is) {
                if (this.props.user.UserID === creId)
                    this.props.creContact({ id: this.props.user.UserID, uId: user.UserID });
                else
                    this.props.creContact({ id: user.UserID, uId: creId });
            }
            else {
                if (this.props.user.UserID === creId)
                    this.props.mesConShow({ mess: `${user.UserName} không đồng ý kết bạn!` })
            }
        });
        this.socket = socket;
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal

        }))
    }
    handleText(e) {
        this.setState({ userName: e.target.value });
    }
    closeModal() {
        this.socket = socket.sendMessage
    }
    sendText(data) {
        this.socket.emit('message', data);
    }
    sendContact(data) {
        this.socket.emit('contact', data);
    }
    reContact(data) {
        this.socket.emit('recontact', data);
    }
    render() {
        const { recLocal } = this.props;
        if (!recLocal) {
            return (<div id="frame" >
                <SIDEPANEL sendContact={this.sendContact} />
                <PageWelcome />
                <ModalNotiContact reContact={this.reContact} />
                <ModalMessBoxCon />
            </div>)
        }
        return (
            <div id="frame" >
                <SIDEPANEL sendContact={this.sendContact} />
                <CONTENTLAYOUT {...this.state} sendText={this.sendText} />
                <ModalNotiContact reContact={this.reContact} />
                <ModalMessBoxCon />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        recLocal: state.recentChat ? state.recentChat : null
    };
}

function mapDispatchToProps(dispatch) {
    return {
        online: bindActionCreators(actionSocket.online, dispatch),
        sendmessage: bindActionCreators(actionSocket.sendmessage, dispatch),
        logMess: bindActionCreators(actionSocket.logMess, dispatch),
        notiContact: bindActionCreators(actionModal.modalNotiContact, dispatch),
        mesConShow: bindActionCreators(actionModal.modalMessConShow, dispatch),
        creContact: bindActionCreators(actions.fetchCreContact, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HOMEPAGE);