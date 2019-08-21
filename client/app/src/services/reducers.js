import {
    FETCH_SUCESS
    , FETCH_RECENTCHATS_SUCESS
    , FETCH_GROUPS_SUCCESS
    , FETCH_GETUSERS_SUCCESS
    , FETCH_USER_USERS_RECENTCHAT_SUCCESS
    , FETCH_CREATE_CHAT_SUCCESS
    , USER_ONLINE
    , USER_MESSAGE
    , FETCH_CREATE_GROUP_CHAT_SUCCESS
    , FETCH_LOGIN_SUCCESS
    , FETCH_LOGIN_NOTSUCCESS
    , RECIVE_MESSAGE
    , FETCH_AVATAR_USER_SUCCESS
    , FETCH_CREATE_CONTACT_SUCCESS
    , FETCH_CONTACTS_SUCCESS,
    LOG_MESSAGE,
    LOG_MESSAGE_SUCCESS,

} from './types';

export const users = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_GETUSERS_SUCCESS:
                return action.data;
            case FETCH_USER_USERS_RECENTCHAT_SUCCESS:
                return action.data.users;
            default:
                return state
        }
    }
}

export const user = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_RECENTCHATS_SUCESS:
                return action.data.user;
            case FETCH_USER_USERS_RECENTCHAT_SUCCESS:
                return action.data.user;
            case FETCH_LOGIN_SUCCESS:
                return action.data.user;
            case FETCH_LOGIN_NOTSUCCESS:
                return null;
            case FETCH_AVATAR_USER_SUCCESS:
                return action.data.user;
            default:
                return state
        }
    }
}

export const group = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_GROUPS_SUCCESS:
                return action.data.group;
            default:
                return state
        }
    }
}

export const messages = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_GROUPS_SUCCESS:
                return action.data.messages;
            case USER_MESSAGE:
                return action.data.messages;
            default:
                return state
        }
    }
}

export const groupDetails = () => {
    return (state = null, action) => {
        switch (action.type) {
            // case FETCH_GROUPS_SUCCESS:
            //     return action.data.groupDetails;
            default:
                return state
        }
    }
}

export const recentChats = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_RECENTCHATS_SUCESS:
                return action.data.recentChats;
            case FETCH_USER_USERS_RECENTCHAT_SUCCESS:
                const data = action.data.recentChats.map(r => {
                    return Object.assign({}, r, { unread: 0 })
                })
                return data;
            case FETCH_CREATE_CHAT_SUCCESS:
                return action.data.recentChats;
            case FETCH_CREATE_GROUP_CHAT_SUCCESS:
                return action.data.recentChats;
            case FETCH_USER_USERS_RECENTCHAT_SUCCESS:
                return action.data.recentChats;
            case LOG_MESSAGE_SUCCESS:
                return action.data;
            case FETCH_GROUPS_SUCCESS:
                return action.data.recentChats;
            default:
                return state
        }
    }
}

export const recentChat = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_GROUPS_SUCCESS:
                return action.data.recentChat;
            case FETCH_CREATE_CHAT_SUCCESS:
                return action.data.recentChat;
            case USER_MESSAGE:
                return action.data.recentChat;
            default:
                return state
        }
    }
}

export const contacts = () => {
    return (state = null, action) => {
        switch (action.type) {
            case FETCH_CREATE_CONTACT_SUCCESS:
                return action.data.contacts;
            case FETCH_CONTACTS_SUCCESS:
                return action.data.contacts;
            default:
                return state
        }
    }
}

export const socket = () => {
    return (state = null, action) => {
        switch (action.type) {
            case USER_ONLINE:
                return { status: 'online' };
            default:
                return state
        }
    }
}
