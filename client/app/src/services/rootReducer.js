import { combineReducers } from 'redux'
import { users, user, recentChats, group, messages, groupDetails, socket, recentChat, contacts } from './reducers'
import { modalNotiContact, modalMessCon } from './reducerModal'
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
    user: user(),
    users: users(),
    recentChats: recentChats(),
    recentChat: recentChat(),
    group: group(),
    groupDetails: groupDetails(),
    messages: messages(),
    contacts: contacts(),
    socket: socket(),
    loadingBar: loadingBarReducer,
    modalNotiContact: modalNotiContact(),
    modalMessCon: modalMessCon(),
})

export default rootReducer
