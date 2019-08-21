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
    , Dropdown
    , Collapse, CardBody, Card, Nav, NavItem, NavLink, TabContent, TabPane
    , UncontrolledDropdown, Link
    , Badge
} from 'reactstrap';
import ModalNewContacts from './modals/modalNewContacts';
import Avatar from 'react-avatar';
import { ChatList as ContactList } from 'react-chat-elements';
import { actions } from '../services/actions';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCon: false,
            modalNewCon: false,
        }
        this.togNewCon = this.togNewCon.bind(this);
        this.togModNewCon = this.togModNewCon.bind(this);
        this.messCon = this.messCon.bind(this);
    }

    togNewCon() {
        this.setState({
            newCon: !this.state.newCon
        })
    }
    togModNewCon() {
        this.setState({
            modalNewCon: !this.state.modalNewCon
        })
    }

    messCon(c) {
        const { user, messCon } = this.props;
        messCon({
            userId: user.UserID,
            contactId: c.ContactID,
        })
    }

    render() {
        const { contacts, lstCons } = this.props;
        const keys = [];

        contacts.sort((a, b) => {
            const nameA = a.UserName;
            const nameB = b.UserName;
            if (nameA < nameB) {
                if (!keys.find(k => k === nameA.substring(0, 1)))
                    keys.push(nameA.substring(0, 1));
                if (!keys.find(k => k === nameB.substring(0, 1)))
                    keys.push(nameB.substring(0, 1));
                return - 1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return (
            <div>
                <Nav id="bar" tabs>
                    <NavItem>
                        <NavLink href="#">Danh bạ</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={this.togModNewCon}>+ Thêm người</NavLink>
                    </NavItem>
                </Nav>
                <div className="clearfix"></div>

                <ListGroup>
                    {/* {contacts.map((c) => {
                        return <ListGroupItem tag="button" action>
                            <Avatar round="20px" size="40" src={c.UserAvatar} />
                            <Label size="60"><span>&nbsp;</span><b>{c.UserName}</b></Label>
                        </ListGroupItem>
                    })} */}

                    <ContactList
                        className='chat-list'
                        dataSource={lstCons}
                        onClick={this.messCon}
                    />

                </ListGroup>
                <ModalNewContacts show={this.state.modalNewCon} toggle={this.togModNewCon} sendContact={this.props.sendContact} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        contacts: state.contacts ? state.contacts : [],
        lstCons: state.contacts ? state.contacts.map(r => {
            return {
                avatar: r.UserAvatar,
                title: r.UserName,
                date: '',
                ...r
            }
        }) : [],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        messCon: bindActionCreators(actions.fetchMessCon, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
