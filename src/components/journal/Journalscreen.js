import React from 'react'
import NoteScreen from '../notes/NoteScreen'
import Sidebar from './Sidebar'
import NothingSelected from './NothingSelected'
import { useSelector } from 'react-redux'


const Journalscreen = () => {

const {active} = useSelector(state => state.notes)

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            
            <Sidebar />

            <main>
                {
                    (active) 
                    ?  (<NoteScreen />)

                    : (<NothingSelected />)
                }   
            </main>


        </div>
    )
}

export default Journalscreen
