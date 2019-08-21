import {
    FETCH_API_REQUEST
    , FETCH_RECENTCHATS_REQUEST
    , FETCH_GROUPS_REQUEST
    , FETCH_GETUSERS_REQUEST
    , FETCH_USER_USERS_RECENTCHAT_REQUEST
    , FETCH_CREATE_CHAT_REQUEST
    , FETCH_CREATE_GROUP_CHAT_REQUEST
    , FETCH_LOGIN_REQUEST
    , FETCH_DOWNFILE
    , FETCH_AVATAR_USER_REQUEST
    , FETCH_CREATE_CONTACT_REQUEST
    , FETCH_CONTACTS_REQUEST
    , FETCH_MESSSAGE_CONTACT_REQUEST
    , LOG_MESSAGE
} from './types';

export const actions = {
    fetchLogin: (data) => {
        return { type: FETCH_LOGIN_REQUEST, data: data }
    },
    fetchGetUsers: () => {
        return { type: FETCH_GETUSERS_REQUEST }
    },
    fetchRecentChats: (userId) => {
        return { type: FETCH_RECENTCHATS_REQUEST, Id: userId }
    },
    fetchGroup: (groupId) => {
        return { type: FETCH_GROUPS_REQUEST, Id: groupId }
    },
    fetchGetStart: (userId) => {
        return { type: FETCH_USER_USERS_RECENTCHAT_REQUEST, Id: userId }
    },
    fetchCreateChat: (obj) => {
        return { type: FETCH_CREATE_CHAT_REQUEST, obj: obj }
    },
    fetchCreateGrpChat: (obj) => {
        return { type: FETCH_CREATE_GROUP_CHAT_REQUEST, obj: obj }
    },
    fetchAvatarUser: (obj) => {
        return { type: FETCH_AVATAR_USER_REQUEST, obj: obj }
    },
    fetchContact: (Id) => {
        return { type: FETCH_CONTACTS_REQUEST, Id: Id }
    },
    fetchCreContact: (obj) => {
        return { type: FETCH_CREATE_CONTACT_REQUEST, obj: obj }
    },
    fetchMessCon: (obj) => {
        return { type: FETCH_MESSSAGE_CONTACT_REQUEST, obj: obj }
    },
}