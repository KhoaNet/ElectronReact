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
import { actions } from '../../services/actions';

class ModalNewContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchUser: ''
        }

        this.addUser = this.addUser.bind(this);
        this.search = this.search.bind(this);
    }

    addUser(u) {
        const { user, creContact, toggle } = this.props;
        this.props.sendContact({
            creId: user.UserID,
            user: u,
            name:user.UserName,
            avatar:user.UserAvatar,
        });
        // creContact({
        //     id: user.UserID,
        //     user: u
        // });
        toggle();
        this.setState({
            searchUser: ''
        });
    }

    search(e) {
        this.setState({
            searchUser: e.target.value
        })
    }

    render() {
        const { show, toggle, users, user, contacts } = this.props;
        const filter = users.filter(u => u.UserName.toLowerCase().indexOf(this.state.searchUser.toLowerCase()) !== -1
            && u.UserID != user.UserID && !contacts.find(c => c.FK_UserID === u.UserID));
        return (
            <Modal isOpen={show} toggle={toggle} >
                <ModalHeader toggle={toggle}>Thêm người vào danh bạ</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Input type="text" id="searchUsers" placeholder="Search" onChange={this.search} />
                        </Col>
                    </Row>
                    <Row><br /></Row>
                    <ListGroup flush>
                        {filter.map((f) => {
                            return <ListGroupItem tag="a" action>
                                <Avatar round="20px" size="40" src={f.UserAvatar} />
                                <Label size="60"><span>&nbsp;</span>{f.UserName}</Label>
                                <Button className="float-right" color="primary" onClick={() => this.addUser(f)}>Add</Button>
                            </ListGroupItem>
                        })}

                    </ListGroup>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={this.ok} >Lưu</Button>
                </ModalFooter> */}
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        user: state.user,
        contacts: state.contacts ? state.contacts : [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        creContact: bindActionCreators(actions.fetchCreContact, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewContacts);