import React, { useState, useEffect } from "react";
import { getNotes } from "../service/noteService";



const AllNote = () => {
    const [notes, setNotes] = useState<Note[]>([]); // Use Note type here
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const data = await getNotes();
            setNotes(data);
            setLoading(false);
            setSuccess(false);  // Reset success state after fetching notes
        } catch (err) {
            setLoading(false);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };


    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        if (success) {
            fetchNotes();
        }
    }, [success]);

    return (
        <div className='w-full p-6'>
            <h2 className='text-xl font-bold text-purple-500'>Notes</h2>
            <div className='flex flex-col w-full'>
                {loading ? (
                    <p>Loading...</p>
                ) : notes.length === 0 ? (
                    <p>No notes available</p>
                ) : (
                    <div className='flex flex-row flex-wrap justify-start p-3 h-2/3'>
                        {notes.map((note) => (
                            <div key={note._id} className='w-1/4 border p-1 my-2 mx-2 rounded-xl hover:shadow-xl'>
                                <div className='flex justify-end'>
                                    <button
                                        className='bg-red-500 text-white p-1 rounded'
                                 
                                    >
                                        Delete
                                    </button>

                                </div>
                                <div className='p-3'>
                                    <h3 className='font-bold'>{note.title}</h3>
                                    <p>{note.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    );
};

export default AllNote;
