import {
    USER_ONLINE
    , USER_MESSAGE
    , LOG_MESSAGE
} from '../types';

export const actionSocket = {
    online: () => {
        return { type: USER_ONLINE }
    },
    sendmessage: (data) => {
        return { type: USER_MESSAGE, data }
    },
    logMess: (data) => {
        return { type: LOG_MESSAGE, data }
    }
}