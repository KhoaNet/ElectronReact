import React, { Component } from 'react';
import { connect } from 'react-redux';
import electron from 'electron';
import { bindActionCreators } from 'redux';
import {
    Button
    , ButtonDropdown
    , DropdownToggle
    , DropdownMenu
    , DropdownItem
    , Label
    , Modal
    , ModalHeader
    , ModalFooter
    , ModalBody
    , Input
    , Row
    , Col
    , Container
    , ListGroup
    , ListGroupItem
    , Dropdown
    , Collapse, CardBody, Card, Nav, NavItem, NavLink, TabContent, TabPane
    , UncontrolledDropdown, Link
    , Badge
} from 'reactstrap';
import path from 'path';
import { ChatList } from 'react-chat-elements'

import { actions } from '../services/actions'
import ModalNewChat from './modals/modalNewChat'
import ModalNewGroupChat from './modals/modalNewGroupChat'
import ModalProfileUser from './modals/modalProfileUser'
import Contacts from './contacts';
import moment from 'moment';
import classnames from 'classnames';

class SIDEPANEL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cbChatOpen: false,
            modalNewChat: false,
            modalNewGrpChat: false,
            searchUsers: '',
            collapse: false,
            modalModalProfileUser: false,
            search: '',
            activeTab: '1',
        };
        this.openMessage = this.openMessage.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleModalNewChat = this.toggleModalNewChat.bind(this);
        this.toggleModalNewGrpChat = this.toggleModalNewGrpChat.bind(this);
        this.toggleModalProfileUser = this.toggleModalProfileUser.bind(this);
        this.clickChat = this.clickChat.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.logOut = this.logOut.bind(this);
        this.option = this.option.bind(this);
        this.search = this.search.bind(this);
    }

    toggleDropDown() {
        this.setState({
            cbChatOpen: !this.state.cbChatOpen
        });
    }
    toggleModalNewChat() {
        this.setState({
            modalNewChat: !this.state.modalNewChat
        });
    }
    toggleModalNewGrpChat() {
        this.setState({
            modalNewGrpChat: !this.state.modalNewGrpChat
        });
    }
    toggleModalProfileUser() {
        this.setState({
            modalModalProfileUser: !this.state.modalModalProfileUser
        });
    }
    openMessage(groupID) {
        this.props.fetchGroup(groupID);
    }
    logOut() {
        const { pathname } = global.location;
        electron.remote.getCurrentWindow().loadURL(`file:/${path.join(pathname, '../')}/login/login.html`);
    }
    option() {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    clickChat(c) {
        this.openMessage(c.FK_GroupID)
    }
    search(e) {
        this.setState({
            search: e.target.value
        });
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const { user, recentChats, users, lstChat } = this.props;
        if (!user && !recentChats && users) { return <div></div> }
        const filter = lstChat.filter(u => u.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        return (
            <div id="sidepanel">
                <div id="profile">
                    <div class="wrap">
                        <img id="profile-img" src={user.UserAvatar} class="online" alt="" />
                        <p>{user.UserName}</p>
                        <i onClick={this.toggleModalProfileUser} class="fas fa-info-circle fa-10x expand-button"></i>
                    </div>
                </div>

                <div id="search">
                    <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
                    <input type="text" placeholder="Tìm kiếm tin nhắn" onChange={this.search} />
                </div>

                <Nav id="bar" tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggleTab('1'); }}
                        >
                            <i class="fa fa-comments-o fa-fw" aria-hidden="true"></i>Tin nhắn <Badge color="danger">4</Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggleTab('2'); }}
                        >
                            <i class="far fa-address-book" aria-hidden="true"></i> Danh bạ
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => this.logOut()}>
                            Đăng xuất
                        </NavLink>
                    </NavItem>
                </Nav>
                <div id="contacts">

                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Nav id="bar" tabs>
                                <NavItem>
                                    <NavLink href="#"> Tin nhắn gần nhất</NavLink>
                                </NavItem>
                                <Dropdown nav isOpen={this.state.cbChatOpen} toggle={this.toggleDropDown}>
                                    <DropdownToggle nav>
                                        + Tạo tin nhắn
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem onClick={this.toggleModalNewChat} >Chat</DropdownItem>
                                        <DropdownItem onClick={this.toggleModalNewGrpChat}>Nhóm Chat</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Nav>
                            <div className="clearfix"></div>
                            <ChatList
                                className='chat-list'
                                dataSource={filter}
                                onClick={this.clickChat}
                            />

                        </TabPane>
                        <TabPane tabId="2">
                            <Contacts sendContact={this.props.sendContact} />
                        </TabPane>
                    </TabContent>
                </div>

                <ModalNewChat show={this.state.modalNewChat} toggle={this.toggleModalNewChat} />
                <ModalNewGroupChat show={this.state.modalNewGrpChat} toggle={this.toggleModalNewGrpChat} />
                <ModalProfileUser show={this.state.modalModalProfileUser} toggle={this.toggleModalProfileUser} />
                {/* ModalNewChat */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        recentChats: state.recentChats,
        users: state.users ? state.users : [],
        recentChat: state.recentChat ? state.recentChat : null,
        lstChat: state.recentChats ? state.recentChats.map(r => {
            return {
                avatar: r.UserAvatar,
                title: r.GroupName,
                subtitle: r.MessageLastText,
                date: new Date(r.LastTime),
                ...r
            }
        }) : [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGroup: bindActionCreators(actions.fetchGroup, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SIDEPANEL);