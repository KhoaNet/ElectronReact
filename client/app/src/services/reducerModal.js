import {
    MODAL_NOTICONTACT_SHOW,
    MODAL_NOTICONTACT_CLOSE,
    MODAL_MESS_CON_SHOW,
    MODAL_MESS_CON_CLOSE
} from './modalType';

export const modalNotiContact = () => {
    return (state = null, action) => {
        switch (action.type) {
            case MODAL_NOTICONTACT_SHOW:
                return action.data;
            case 'MODAL_NOTICONTACT_ClOSE':
                return null;
            default:
                return state
        }
    }
}

export const modalMessCon = () => {
    return (state = null, action) => {
        switch (action.type) {
            case MODAL_MESS_CON_SHOW:
                return action.data;
            case MODAL_MESS_CON_CLOSE:
                return null;
            default:
                return state
        }
    }
}