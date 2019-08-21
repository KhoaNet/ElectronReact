import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { /*HashRouter,*/ Route, Switch, withRouter, HashRouter, NavLink } from 'react-router-dom'
import { actions } from './services/actions'
import HOMEPAGE from "./layouts/homePage";
import LoadingBar from 'react-redux-loading-bar';

class App extends Component {
    componentWillMount() {
        const { user, fetchGetStart,contact } = this.props;
        if (!user) {
            let id = global.location.search.split("?", global.location.search.length);
            fetchGetStart(id[1]);
            contact(id[1])
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        if (!user) { return (<div></div>) }
        return (
            <diV>
                <LoadingBar />
                <div id="titlebar">
                    <div id="drag-region">
                        <div id="window-title">
                            <span>ChatIo</span>
                        </div>
                        <div id="window-controls">
                            <div class="button" id="min-button">
                                <span>&#xE921;</span>
                            </div>
                            <div class="button" id="max-button">
                                <span>&#xE922;</span>
                            </div>
                            <div class="button" id="restore-button">
                                <span>&#xE923;</span>
                            </div>
                            <div class="button" id="close-button">
                                <span>&#xE8BB;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loadTitle"></div>
                <div class="clearfix"></div>
                <HOMEPAGE />
            </diV>
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
        fetchRecentChats: bindActionCreators(actions.fetchRecentChats, dispatch),
        getUsers: bindActionCreators(actions.fetchGetUsers, dispatch),
        fetchGetStart: bindActionCreators(actions.fetchGetStart, dispatch),
        contact: bindActionCreators(actions.fetchContact, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);