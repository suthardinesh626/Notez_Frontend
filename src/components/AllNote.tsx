import React, { useState, useEffect } from "react";
import { getNotes, deleteNote } from "../service/noteService";



const AllNote: React.FC = () => {
    const [notes, setNotes] = useState<Array<{ title: string; content: string; id: string }>>([]);

    const fetchNotes = async () => {
        try {
            const fetchedNotes = await getNotes();
            setNotes(fetchedNotes);
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (noteId: string) => {
        try {
            await deleteNote(noteId);
            fetchNotes();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    return (
        <div className='w-full flex flex-row flex-wrap justify-start items-start p-6 '>
            {/* 1st step here the Note will be clicked then it will ne  */}
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className='w-4/12 flex flex-col justify-start items-end m-4 p-2 border-2 rounded-2xl cursor-pointer '>
                        <button onClick={() => handleDelete(note.id)} className="w-4/12 text-white bg-red-400  border m-2 p-1 rounded-xl">Delete</button>
                        <div className="w-full flex flex-col items-start p-2">
                            <h3 className="text-gray-700 font-extrabold " >{note.title}</h3>
                            <p className="text-gray-800 font-medium" >{note.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );
};

export default AllNote;