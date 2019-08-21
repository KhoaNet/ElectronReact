import * as typeModal from './modalType';

export const actionModal = {
    modalNotiContact: (data) => {
        return { type: typeModal.MODAL_NOTICONTACT_SHOW, data: data }
    },
    closeModalNotiContact: () => {
        return { type: 'MODAL_NOTICONTACT_ClOSE', }
    },
    modalMessConShow: (data) => {
        return { type: typeModal.MODAL_MESS_CON_SHOW, data: data }
    },
    modalMessConClose: () => {
        return { type: typeModal.MODAL_MESS_CON_CLOSE, }
    }
}