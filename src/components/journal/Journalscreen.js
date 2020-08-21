import React from 'react'
import NoteScreen from '../notes/NoteScreen'
import Sidebar from './Sidebar'
// import NothingSelected from './NothingSelected'

const Journalscreen = () => {
    return (
        <div className="journal__main-content">
            
            <Sidebar />


            <main>

                {/* <NothingSelected /> */}
                <NoteScreen />

            </main>


        </div>
    )
}

export default Journalscreen
