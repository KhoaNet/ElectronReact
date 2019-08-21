import axios from 'axios';

export function fetchGetUsers() {
    return axios({
        method: "GET",
        url: "http://localhost:3010/api/users"
    });
}

export function fetchRecentChats(userId) {
    return axios({
        method: "GET",
        url: `http://localhost:3010/api/recentChats/${userId}`
    });
}

export function fetchGroups(groupId, userId) {
    return axios({
        method: "GET",
        url: `http://localhost:3010/api/getGroups/?groupId=${groupId}&userId=${userId}`
    });
}

export function fetchGetStart(groupId) {
    return axios({
        method: "GET",
        url: `http://localhost:3010/api/getStart/${groupId}`
    });
}

export function createChat(obj) {
    return axios({
        method: "POST",
        url: `http://localhost:3010/api/createChat`,
        data: obj
    });
}

export function createGrpChat(obj) {
    return axios({
        method: "POST",
        url: `http://localhost:3010/api/createGrpChat`,
        data: obj
    });
}

export function avatarUser(obj) {
    return axios({
        method: "POST",
        url: `http://localhost:3010/api/avatar`,
        data: obj
    });
}

export function contact(id) {
    return axios({
        method: "GET",
        url: `http://localhost:3010/api/contacts/${id}`,
    });
}

export function creContact(obj) {
    return axios({
        method: "POST",
        url: `http://localhost:3010/api/createContacts`,
        data: obj
    });
}

export function messCon(obj) {
    return axios({
        method: "POST",
        url: `http://localhost:3010/api/messcon`,
        data: obj
    });
}