import { put, take, fork, all, call, takeLatest, select } from 'redux-saga/effects'
import {
    LOG_MESSAGE
    , LOG_MESSAGE_SUCCESS
} from '../types';

function* watchLogMess() {
    while (true) {
        const { data } = yield take(LOG_MESSAGE);
        const recent = data.recentChat;
        const recLocals = yield select(state => state.recentChats);
        recLocals.forEach(e => {
            if (e.RecentChatID === recent.RecentChatID) {
                e.unread++;
                e.MessageLastText = recent.MessageLastText;
            }
        });
        yield put({ type: LOG_MESSAGE_SUCCESS, data: recLocals });
    }
}

export function* watchAll() {
    yield all([
        watchLogMess()
    ])
}
