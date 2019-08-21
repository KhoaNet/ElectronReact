import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import ModalAvatar from '../../components/modalAvatarComp';

class ModalProfileUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            pass: '',
            sex: '',
            avatar: '',

            modalAvatar: false
        }
        this.name = this.name.bind(this);
        this.email = this.email.bind(this);
        this.address = this.address.bind(this);
        this.male = this.male.bind(this);
        this.female = this.female.bind(this);

        this.toggleModalAvatar = this.toggleModalAvatar.bind(this);
        this.ok = this.ok.bind(this);
    }
    ok() {
        console.log(this.state);
    }
    name(e) {
        this.setState({
            name: e.target.value
        });
    }
    email(e) {
        this.setState({
            email: e.target.value
        });
    }
    address(e) {
        this.setState({
            address: e.target.value
        });
    }
    male(e) {
        this.setState({
            sex: 'Male'
        });
    }
    female(e) {
        this.setState({
            sex: 'Female'
        });
    }
    toggleModalAvatar() {
        this.setState({
            modalAvatar: !this.state.modalAvatar
        });
    }

    render() {
        const { users, show, toggle, user } = this.props;
        return (
            <Modal isOpen={show} toggle={toggle} >
                <ModalHeader toggle={toggle}>Thông tin người dùng</ModalHeader>
                <ModalBody>
                    <ListGroup flush>
                        <ListGroupItem >
                            <div className="d-flex justify-content-center">
                                <img src={user.UserAvatar} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button onClick={this.toggleModalAvatar}>Change</Button>
                                <ModalAvatar show={this.state.modalAvatar} toggle={this.toggleModalAvatar} />
                            </div>
                        </ListGroupItem>
                        <ListGroupItem >
                            <div class="float-left"><i class="far fa-id-badge fa-2x"></i><b> User Name</b></div>
                            <div class="float-right"><Input type="text" defaultValue={user.UserName} onChange={this.name} /></div>
                        </ListGroupItem>
                        <ListGroupItem >
                            <div class="float-left"><i class="far fa-envelope fa-2x"></i><b> Email</b></div>
                            <div class="float-right"><Input type="text" defaultValue={user.UserEmail} onChange={this.email} /></div>
                        </ListGroupItem>
                        <ListGroupItem >
                            <div class="float-left"><i class="fas fa-map-marker-alt fa-2x"></i><b> Address</b></div>
                            <div class="float-right"><Input type="text" defaultValue={user.UserAddress ? user.UserAddress : ''} onChange={this.address} /></div>
                        </ListGroupItem>
                        <ListGroupItem >
                            <div class="float-left">
                                <Input type="checkbox" onChange={this.male} defaultValue={user.UserSex === 'Male' ? true : false} />
                                <i class="fas fa-male fa-2x"></i>
                                <b> Male</b>
                            </div>
                            <div class="float-right">
                                <Input type="checkbox" onChange={this.female} defaultValue={user.UserSex === 'Female' ? true : false} />
                                <i class="fas fa-female fa-2x"></i>
                                <b>Female</b>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.ok} >Lưu</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProfileUser);
// <Avatar round="50px" size="200" src="http://localhost:3010/api/upload/avatar/1.jpg" />
