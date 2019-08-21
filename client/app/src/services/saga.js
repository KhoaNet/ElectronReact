import { put, take, fork, all, call, takeLatest, select } from 'redux-saga/effects'
import {
    FETCH_API_REQUEST
    , FETCH_SUCESS
    , FETCH_RECENTCHATS_REQUEST
    , FETCH_RECENTCHATS_SUCESS
    , FETCH_GROUPS_REQUEST
    , FETCH_GROUPS_SUCCESS
    , FETCH_GETUSERS_REQUEST
    , FETCH_GETUSERS_SUCCESS
    , FETCH_USER_USERS_RECENTCHAT_REQUEST
    , FETCH_USER_USERS_RECENTCHAT_SUCCESS
    , FETCH_CREATE_CHAT_REQUEST
    , FETCH_CREATE_CHAT_SUCCESS
    , USER_MESSAGE
    , FETCH_CREATE_GROUP_CHAT_REQUEST
    , FETCH_CREATE_GROUP_CHAT_SUCCESS
    , FETCH_LOGIN_REQUEST
    , FETCH_LOGIN_SUCCESS
    , FETCH_LOGIN_NOTSUCCESS
    , RECIVE_MESSAGE
    , FETCH_DOWNFILE
    , FETCH_AVATAR_USER_REQUEST
    , FETCH_AVATAR_USER_SUCCESS
    , FETCH_CREATE_CONTACT_REQUEST
    , FETCH_CREATE_CONTACT_SUCCESS
    , FETCH_CONTACTS_REQUEST
    , FETCH_CONTACTS_SUCCESS
    , FETCH_MESSSAGE_CONTACT_SUCCESS
    , FETCH_MESSSAGE_CONTACT_REQUEST
} from './types';

import {
    fetchGetUsers
    , fetchRecentChats
    , fetchGroups
    , fetchGetStart
    , createChat
    , createGrpChat
    , fetchLogin
    , avatarUser
    , creContact
    , contact
    , messCon
} from './api';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

function* watchFetchLogin() {
    while (true) {
        const { data } = yield take(FETCH_LOGIN_REQUEST);
        const response = yield call(() => fetchLogin(data));
        if (response.data.user) {
            yield put({ type: FETCH_LOGIN_SUCCESS, data: response.data });
        }
        else {
            yield put({ type: FETCH_LOGIN_NOTSUCCESS, data: response.data });
        }
    }
}

function* watchFetchGetUsers() {
    while (true) {
        yield take(FETCH_GETUSERS_REQUEST);
        const response = yield call(fetchGetUsers);
        yield put({ type: FETCH_GETUSERS_SUCCESS, data: response.data });
    }
}

function* watchFetchRecentChats() {
    while (true) {
        const { Id } = yield take(FETCH_RECENTCHATS_REQUEST);
        const response = yield call(() => fetchRecentChats(Id));
        yield put({ type: FETCH_RECENTCHATS_SUCESS, data: response.data });
    }
}

function* watchFetchGroups() {
    while (true) {
        const { Id } = yield take(FETCH_GROUPS_REQUEST);
        const uId = yield select(state => state.user.UserID);
        const response = yield call(() => fetchGroups(Id, uId));
        const{recentChat,group,messages} = response.data;
        const recLocals = yield select(state => state.recentChats);
        recLocals.forEach(e => {
            if (e.RecentChatID === recentChat.RecentChatID) {
                e.unread = 0;
                e.MessageLastText = recentChat.MessageLastText;
            }
        });

        yield put({ type: FETCH_GROUPS_SUCCESS, data: {
            recentChats:recLocals,
            recentChat:recentChat,
            group:group,
            messages:messages
        } });
    }
}

function* watchFetchGetStart() {
    while (true) {
        const { Id } = yield take(FETCH_USER_USERS_RECENTCHAT_REQUEST);
        const response = yield call(() => fetchGetStart(Id));
        yield put({ type: FETCH_USER_USERS_RECENTCHAT_SUCCESS, data: response.data });
    }
}

function* watchFetchCreateChat() {
    while (true) {
        const { obj } = yield take(FETCH_CREATE_CHAT_REQUEST);
        const response = yield call(() => createChat(obj));
        yield put({ type: FETCH_CREATE_CHAT_SUCCESS, data: response.data });
    }
}

function* watchMessageChats() {
    while (true) {
        yield take(USER_MESSAGE);
        const id = yield select(state => state.user.UserID);
        const response = yield call(() => fetchRecentChats(id));
        yield put({ type: FETCH_RECENTCHATS_SUCESS, data: response.data });
    }
}

function* watchFetchGroupChat() {
    while (true) {
        const { obj } = yield take(FETCH_CREATE_GROUP_CHAT_REQUEST);
        const response = yield call(() => createGrpChat(obj));
        yield put({ type: FETCH_CREATE_GROUP_CHAT_SUCCESS, data: response.data });
    }
}

function* watchFetchAvatarUser() {
    while (true) {
        const { obj } = yield take(FETCH_AVATAR_USER_REQUEST);
        yield put(showLoading())
        const response = yield call(() => avatarUser(obj));
        yield put(hideLoading())
        yield put({ type: FETCH_AVATAR_USER_SUCCESS, data: response.data });
    }
}
function* watchFetchCon() {
    while (true) {
        const { Id } = yield take(FETCH_CONTACTS_REQUEST);
        const response = yield call(() => contact(Id));
        yield put({ type: FETCH_CONTACTS_SUCCESS, data: response.data });
    }
}
function* watchFetchCreCon() {
    while (true) {
        const { obj } = yield take(FETCH_CREATE_CONTACT_REQUEST);
        const response = yield call(() => creContact(obj));
        yield put({ type: FETCH_CREATE_CONTACT_SUCCESS, data: response.data });
    }
}
function* watchFetchMessCon() {
    while (true) {
        const { obj } = yield take(FETCH_MESSSAGE_CONTACT_REQUEST);
        const response = yield call(() => messCon(obj));
        if (response.data.isNew)
            yield put({ type: FETCH_CREATE_CHAT_SUCCESS, data: response.data });
        else
            yield put({ type: FETCH_GROUPS_SUCCESS, data: response.data });
    }
}

export function* watchAll() {
    yield all([
        watchFetchGetUsers(),
        watchFetchRecentChats(),
        watchFetchGroups(),
        watchFetchGetStart(),
        watchFetchCreateChat(),
        watchMessageChats(),
        watchFetchGroupChat(),
        watchFetchLogin(),
        watchFetchAvatarUser(),
        watchFetchCreCon(),
        watchFetchCon(),
        watchFetchMessCon()
    ])
}
