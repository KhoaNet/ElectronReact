import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    , TabContent
    , TabPane
    , Nav
    , NavItem
    , NavLink
} from 'reactstrap';
import Avatar from 'react-avatar';
import classnames from 'classnames';
import ModalAvatar from '../../components/modalAvatarComp';
import { actions } from '../../services/actions'

class ModalNewGroupChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchUser: '',
            modal: true,
            userCheck: [],
            groupName: '',
            activeTab: '1',
            modalAvatar: false,
            fileImg: null
        }

        this.search = this.search.bind(this);
        this.check = this.check.bind(this);
        this.groupChat = this.groupChat.bind(this);
        this.groupName = this.groupName.bind(this);
        this.close = this.close.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModalAvatar = this.toggleModalAvatar.bind(this);
        this.image = this.image.bind(this);
    }

    search(e) {
        this.setState({
            searchUser: e.target.value
        });
    }
    check(userMessage) {
        const { userCheck } = this.state;
        if (userMessage) {
            if (userCheck.length === 0) {
                this.setState({ userCheck: [...userCheck, userMessage] });
            };
            const check = userCheck.filter(u => u.UserID === userMessage.UserID);
            if (check.length === 0) {
                this.setState({ userCheck: [...userCheck, userMessage] });
            }
        }
    }
    groupChat() {
        this.props.createGrpChat({
            createName: this.props.user.UserName,
            createBy: this.props.user.UserID,
            users: this.state.userCheck,
            groupName: this.state.groupName,
            fileImg: this.state.fileImg,
        });
        this.props.toggle();
    }
    groupName(e) {
        this.setState({
            groupName: e.target.value
        });
    }
    close() {
        this.setState({
            groupName: '',
            userCheck: [],
            searchUser: '',
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    toggleModalAvatar() {
        this.setState({
            modalAvatar: !this.state.modalAvatar
        });
    }
    image(i) {
        this.setState({
            fileImg: i
        });
    }
    render() {
        const { userCheck, fileImg } = this.state;
        const { users, show, toggle, user } = this.props;
        const filter = users.filter(u => u.UserName.toLowerCase().indexOf(this.state.searchUser.toLowerCase()) !== -1
            && u.UserID != user.UserID && u.UserID);

        return (
            <Modal isOpen={show} toggle={toggle} isClose={this.close}  >
                <ModalHeader toggle={toggle}>
                    <Label>New Group Chat</Label>
                </ModalHeader>
                <ModalBody >
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}
                            >
                                Hình
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                            >
                                Chi tiết
                  </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="d-flex justify-content-center">
                                <br />
                                <Avatar round="20px" size="250px" src={fileImg ? fileImg.img : 'http://localhost:3010/api/lib/camera.png'} onClick={this.toggleModalAvatar} />
                                <ModalAvatar option="img" show={this.state.modalAvatar} toggle={this.toggleModalAvatar} image={this.image} />
                                <br />
                            </div>
                            <Row><br /></Row>
                            <div className="d-flex justify-content-center">
                                <Input type="text" id="searchUsers" placeholder="Tên nhóm" onChange={this.groupName} />
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col>
                                    <Input type="text" id="searchUsers" placeholder="Tìm người đùng" onChange={this.search} />
                                </Col>
                            </Row>
                            <Row><br /></Row>
                            <Row>
                                {
                                    userCheck.map(u => {
                                        return <div class="float-left">
                                            <Col >
                                                <Avatar round="20px" size="40" src={u.UserAvatar} />
                                            </Col>
                                        </div>
                                    })
                                }
                            </Row>
                            <Row id="row_item_btn" >
                                <Col>
                                    <ListGroup flush >
                                        {filter.map(f => {
                                            return <ListGroupItem tag="a" onClick={() => this.check(f)}>
                                                <Avatar round="20px" size="40" src={f.UserAvatar} />
                                                <Label size="60">{f.UserName.toUpperCase()}</Label>
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.groupChat}>Chọn</Button>{' '}
                    {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
                </ModalFooter>
            </Modal >
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users ? state.users : [],
        user: state.user ? state.user : [],
        recentChats: state.recentChats ? state.recentChats : []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createGrpChat: bindActionCreators(actions.fetchCreateGrpChat, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewGroupChat);