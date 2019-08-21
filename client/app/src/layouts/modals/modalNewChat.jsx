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
} from 'reactstrap';
import Avatar from 'react-avatar';

import { actions } from '../../services/actions'

class ModalNewChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchUser: '',
            modal: true,
        }

        this.search = this.search.bind(this);
        this.chat = this.chat.bind(this);
    }

    search(e) {
        this.setState({
            searchUser: e.target.value
        });
    }
    chat(userMessage) {
        if (userMessage) {
            this.props.createChat({
                createName: this.props.user.UserName,
                createBy: this.props.user.UserID,
                userId: userMessage.UserID,
                userName: userMessage.UserName,
                avatarCreate: this.props.user.UserAvatar,
                avatarUser: userMessage.UserAvatar
            });
            this.props.toggle();
        }
    }
    render() {
        const { users, show, toggle, user, recentChats } = this.props;
        const filter = users.filter(u => u.UserName.toLowerCase().indexOf(this.state.searchUser.toLowerCase()) !== -1
            && u.UserID != user.UserID
            && !recentChats.find(r => r.GroupName === u.UserName));
        return (
            <Modal isOpen={show} toggle={toggle}  >
                <ModalHeader toggle={toggle}>
                    <Label>New Chat</Label>
                </ModalHeader>
                <ModalBody >
                    <Row>
                        <Col>
                            <Input type="text" id="searchUsers" placeholder="Search" onChange={this.search} />
                        </Col>
                    </Row>
                    <Row><br /></Row>
                    <Row id="row_item_btn" >
                        <Col>
                            <ListGroup flush >
                                {filter.map(f => {
                                    return <ListGroupItem tag="a" onClick={() => this.chat(f)}>
                                        <Avatar round="20px" size="40" src={f.UserAvatar} />
                                        <Label size="60">{f.UserName.toUpperCase()}</Label>
                                    </ListGroupItem>
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter> */}
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
        createChat: bindActionCreators(actions.fetchCreateChat, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewChat);