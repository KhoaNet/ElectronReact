import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Files from 'react-files';
import { save as saveFile } from 'save-file';
import Messages from '../components/messagesComp';

class CONTENTLAYOUT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            File: [],
            isFile:false,
        }
        this.handleText = this.handleText.bind(this);
        this.send = this.send.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.onFilesError = this.onFilesError.bind(this);
    }
    handleText(e) {
        this.setState({ text: e.target.value });
    }
    send() {
        const { messages, user, sendText, group, recentChat } = this.props;
        sendText({
            user: user,
            MessageText: this.state.text,
            FK_GroupID: recentChat.FK_GroupID,
            File: {
                data: this.state.File
                , type: this.state.File.type
                , extension: this.state.File.extension
                , fileName: this.state.File.name
            },
            recentID: recentChat.RecentChatID,
            isFile:this.state.isFile,
            avatar:user.UserAvatar
        });
        
        this.setState({ text: '' });
        this.setState({ File: [] });
        this.setState({ isFile: false });
    }
    keyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.send();
        }
    }
    componentDidMount() {
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    }
    onFilesChange(f) {
        if (f) {
            this.setState({ text: f[0].name });
            this.setState({ File: f[0] });
            this.setState({ isFile: true});
        }
    }
    onFilesError(f) {
        console.log(f);
    }
    render() {
        const { messages, user, recentChat } = this.props;
        if (!messages && !user) { return (<div></div>) }
        return (
            <div class="content">
                <div class="contact-profile">
                    <img src={recentChat.UserAvatar} alt="" />
                    <p>{recentChat.GroupName}</p>
                    {/* <div class="social-media">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                    </div> */}
                </div>
                <Messages />
                <div class="message-input">
                    <div class="wrap">
                        <input type="text" placeholder="Write your message..." onChange={this.handleText} onKeyDown={this.keyDown} value={this.state.text} />
                        <Files
                            className='files-dropzone'
                            onChange={this.onFilesChange}
                            onError={this.onFilesError}
                            accepts={['image/png', '.pdf', 'audio/*', 'image/jpg','text/*']}
                            multiple
                            maxFiles={3}
                            maxFileSize={10000000}
                            minFileSize={0}
                            clickable
                        >
                            <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
                        </Files>
                        <button class="submit" onClick={this.send}><i class="fa fa-paper-plane" aria-hidden="true" ></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        messages: state.messages ? state.messages : [],
        group: state.group ? state.group : [],
        recentChat: state.recentChat ? state.recentChat : []
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CONTENTLAYOUT);