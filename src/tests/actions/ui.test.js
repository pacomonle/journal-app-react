import '@testing-library/jest-dom'
import { types } from '../../types/types'
const { setError, removeError, startLoading, finishLoading } = require("../../actions/ui")

describe('Pruebas en ui actions', () => {
    // probando acciones sincronas

    test('should funcionar todas las acciones', () => {
        const action = setError('error!!!')
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'error!!!'
        })

        const removeAction = removeError()
        expect(removeAction).toEqual({
            type: types.uiRemoveError
        })

        const loadingAction = startLoading()
        expect(loadingAction).toEqual({
            type: types.uiStartLoading
        })

        const finLoadingAction = finishLoading()
        expect(finLoadingAction).toEqual({
            type: types.uiFinishLoading
        })
    })
    


})
