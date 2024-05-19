import React from 'react'
import { useState } from 'react'

const Notes = () => {
    const [notesText, setNotesText] = useState<string>("");


    return (
        <>
            <div className='flex flex-row justify-start items-center p-10 '>
                <div className='w-1/6  border-2 rounded-lg bg-slate-100 p-3 m-4'>
                    <div className='flex flex-row justify-between'>
                        <h3 className='text-2xl font-bold opacity-20'>Title</h3>
                        <button>
                            <img className='w-7 h-7' src='https://img.icons8.com/color/48/000000/pin.png' />
                        </button>
                    </div>
                    <div className='w-full'>
                        <textarea name=""  id="" placeholder='Create you notes' ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes