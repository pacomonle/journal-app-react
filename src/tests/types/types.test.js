const { types } = require("../../types/types")
import '@testing-library/jest-dom'


describe('Pruebas en types.js', () => {
    test('should comprobar que retorna la const types', () => {

        const tipadoTest = {

            login : '[auth] Login',
            logout: '[auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[notes] New note',
            notesActive: '[notes] Set active note',
            notesLoad: '[notes] Load notes',
            notesUpdated: '[notes] Updated note',
            notesFileUrl: '[notes] Updated image note',
            notesDeleted: '[notes] Deleted note',
            notesLogOutCleaned: '[notes] Logout cleaned notes',
        }

       expect(types).toEqual(tipadoTest)
    })
    
})
