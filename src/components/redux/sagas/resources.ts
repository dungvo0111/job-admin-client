import { takeEvery, fork, call, put } from 'redux-saga/effects'

import {
  CRUD_LOAD_ONE,
  CRUD_LOAD_MANY,
  CRUD_UPDATE_ONE,
  CRUD_UPDATE_MANY,
  CRUD_CREATE_ONE,
  CRUD_CREATE_MANY,
  CRUD_DELETE_ONE,
  CRUD_DELETE_MANY,
  fetchSuccess,
  fetchError,
  fetchStart,
  CrudOperations,
  ResourcesActions,
  showNotification,
  MessageType,
} from 'common/redux/actions'

import ResourcesService from '../../services/resources'
import { ResourceType } from 'common/types'
import { stateChange } from '../../../common/components/DataTable/reducer'

export function getCRUDMessage(
  resource: ResourceType,
  operation: CrudOperations,
  messageType: MessageType
) {
  let resourceName = resource as string
  const words = operation.split('_')
  if (words[2] === 'ONE') {
    resourceName = resourceName.slice(0, resourceName.length - 1)
  }
  return `${
    messageType === 'Success' ? 'Successful' : 'Failed'
  } to ${words[1].toLowerCase()} ${resourceName.replace('-', ' ')}`
}

function crudSagaAction<T extends ResourcesActions>(
  action: CrudOperations,
  api: any
) {
  return function* () {
    yield takeEvery(action, function* (actionCreator: T) {
      const { options } = actionCreator
      const resource = actionCreator.payload.resource
      try {
        let response
        yield put(fetchStart(resource, action))
        if (options?.serverPagination) {
          response = yield call(
            api,
            ...Object.values({ ...actionCreator.payload })
          )
          yield put(
            fetchSuccess(resource, action, response.data, actionCreator.payload)
          )
          const { total } = response

          return yield put(
            stateChange(resource, {
              total,
            })
          )
        }

        response = yield call(
          api,
          ...Object.values({
            ...actionCreator.payload,
          })
        )

        yield put(
          fetchSuccess(resource, action, response, actionCreator.payload)
        )

        if (!actionCreator.type.includes('CRUD_LOAD') && response) {
          yield put(
            showNotification(
              options?.notification?.success ||
                getCRUDMessage(resource, actionCreator.type, 'Success'),
              {
                variant: 'success',
              }
            )
          )
        }

        if (options?.onSuccess) {
          options.onSuccess(response)
        }
      } catch (error) {
        yield put(fetchError(resource, action, error))

        yield put(
          showNotification(
            options?.notification?.error ||
              error.response?.data.message ||
              error.message ||
              getCRUDMessage(resource, actionCreator.type, 'Failure'),
            {
              variant: 'error',
            }
          )
        )

        if (options?.onFailure) {
          options.onFailure(error)
        }
      }
    })
  }
}

export function crud() {
  return [
    crudSagaAction(CRUD_LOAD_MANY, ResourcesService.loadMany),
    crudSagaAction(CRUD_LOAD_ONE, ResourcesService.loadOne),
    crudSagaAction(CRUD_CREATE_ONE, ResourcesService.create),
    crudSagaAction(CRUD_CREATE_MANY, ResourcesService.createMany),
    crudSagaAction(CRUD_UPDATE_ONE, ResourcesService.updateOne),
    crudSagaAction(CRUD_UPDATE_MANY, ResourcesService.updateMany),
    crudSagaAction(CRUD_DELETE_ONE, ResourcesService.deleteOne),
    crudSagaAction(CRUD_DELETE_MANY, ResourcesService.deleteMany),
  ].map(fork)
}
