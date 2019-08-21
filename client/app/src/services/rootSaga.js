import { all, fork, take } from 'redux-saga/effects'
import { watchAll as local } from '../services/saga'
import { watchAll as socket } from '../services/socket/sagaSocket'

export function* rootSaga(){
    yield all([
        fork(local),
        fork(socket)
    ])
}