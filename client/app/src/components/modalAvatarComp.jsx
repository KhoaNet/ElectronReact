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
import Avatar from 'react-avatar-edit';
import { actions } from '../services/actions';

class ModalAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: null,
            src: '',
            fileName: ''
        }

        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
        this.onFileLoad = this.onFileLoad.bind(this);
        this.ok = this.ok.bind(this);
        this.close = this.close.bind(this);
    }
    ok() {
        const { user, avatar, toggle, option, image } = this.props;
        const arr = this.state.fileName.split('.');
        const name = user.UserID + '.' + arr[1];
        if (option === "img") {
            image({
                'img': this.state.preview,
                'type': arr[1]
            })
        }
        else {
            avatar({
                'img': this.state.preview
                , 'name': name, id: user.UserID
            });
        }
        toggle();
    }
    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }

    onBeforeFileLoad(elem) {
        // if (elem.target.files[0].size > 71680) {
        //     alert("File is too big!");
        //     elem.target.value = "";
        // };
    }
    onFileLoad(file) {
        if (file) {
            this.setState({ fileName: file.name });
        }
    }
    close() {
        this.props.image(...this.state);
        this.setState({
            preview: null,
            src: '',
            fileName: ''
        });
    }
    render() {
        const { users, show, toggle, user, loading } = this.props;

        return (
            <Modal size="lg" isOpen={show} toggle={toggle} isClose={this.close} >
                <ModalHeader toggle={toggle}>Chình sửa hình ảnh</ModalHeader>
                <ModalBody>

                    <div className="d-flex justify-content-center">
                        <Avatar
                            width={390}
                            height={295}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                            src={this.state.src}
                            onFileLoad={this.onFileLoad}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Label>Preview</Label>
                    </div>
                    <div className="d-flex justify-content-center"><img src={this.state.preview} /></div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.ok} >Chọn</Button>
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
        avatar: bindActionCreators(actions.fetchAvatarUser, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAvatar);