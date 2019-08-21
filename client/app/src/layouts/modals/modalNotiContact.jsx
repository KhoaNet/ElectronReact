import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button
    , Label
    , Modal
    , ModalHeader
    , ModalFooter
    , ModalBody
} from 'reactstrap';
import Avatar from 'react-avatar';

import { actionModal } from '../../services/actionModal'

class ModalNotiContact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.props.close();
    }
    ok(type) {
        const { close, reContact, user, creId } = this.props;
        reContact({
            creId: creId,
            user:user,
            is: type
        });
        close();
    }

    render() {
        const { show, user, avatar, name } = this.props;
        return (
            <Modal isOpen={show} toggle={this.toggle}  >
                <ModalHeader toggle={this.toggle}>
                    <Label>Lời mời kết bạn</Label>
                </ModalHeader>
                <ModalBody >
                    <div className="d-flex justify-content-center">
                        <Avatar round="20px" size="170" src={avatar} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Label><b>{name}</b> muốn kết bạn với bạn?</Label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.ok(true)}>Chấp Nhận</Button>{' '}
                    <Button color="secondary" onClick={() => this.ok(false)}>Không đồng ý</Button>
                </ModalFooter>
            </Modal >
        );
    }
}

function mapStateToProps(state) {
    let show = false;
    if (state.modalNotiContact && state.modalNotiContact.user.UserID === state.user.UserID) {
        show = true;
    }
    return {
        show: show,
        user: state.modalNotiContact ? state.modalNotiContact.user : [],
        creId: state.modalNotiContact ? state.modalNotiContact.creId : [],
        name: state.modalNotiContact ? state.modalNotiContact.name : '',
        avatar: state.modalNotiContact ? state.modalNotiContact.avatar : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        close: bindActionCreators(actionModal.closeModalNotiContact, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNotiContact);