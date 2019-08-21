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

import { actionModal } from '../../services/actionModal'

class ModalMessBoxCon extends Component {
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
        close();
    }

    render() {
        const { show, mess } = this.props;
        return (
            <Modal isOpen={show} toggle={this.toggle}  >
                <ModalHeader toggle={this.toggle}>
                    <Label>Thông báo</Label>
                </ModalHeader>
                <ModalBody >
                    <div className="d-flex justify-content-center">
                        <Label>{mess}</Label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Chấp Nhận</Button>{' '}
                </ModalFooter>
            </Modal >
        );
    }
}

function mapStateToProps(state) {
    let show = false;
    if (state.modalMessCon) {
        show = true;
    }
    return {
        show: show,
        mess: state.modalMessCon ? state.modalMessCon.mess : '',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        close: bindActionCreators(actionModal.modalMessConClose, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessBoxCon);