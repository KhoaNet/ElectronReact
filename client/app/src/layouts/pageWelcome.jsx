import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import {
    Button
} from 'reactstrap';

const pStyle = {
    'fontSize': '70px',
    'font-weight': 'bold'
};
const divStyle = {
    backgroundImage: "url(" + "http://localhost:3010/api/lib/pageWelCome.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

class PageWelecome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        const { user } = this.props;
        return (
            <div class="content" style={divStyle}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="d-flex justify-content-center">
                    <h6 style={pStyle}>Welcome,{user.UserName}</h6>
                </div>
                <div className="d-flex justify-content-center">
                    <Avatar round="20px" size="120px" src={user.UserAvatar} />
                </div>
                <br />
                <br />
                <div className="d-flex justify-content-center">
                    <Button color="primary">Bắt đầu trò chuyện</Button>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageWelecome);