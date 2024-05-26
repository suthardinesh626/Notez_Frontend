import { useEffect, useState, FormEvent } from "react";
import { createNote, getNotes } from '../service/noteService';

const Sidebar = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [notes, setNotes] = useState<any[]>([]);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
            setSuccess(false);  // Reset success state after fetching notes
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        fetchNotes();
        // Refetch every 10 seconds
        const intervalId = setInterval(fetchNotes, 10000);
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (success) {
            fetchNotes();
            setSuccess(false);
        }
    }, [success]);

    return (
        <>
            <div className=" w-full flex flex-col p-9 ">
                <h5 className="text-3xl font-extrabold text-purple-500 ">Titles</h5>
                {notes.length === 0? (
                    <p>No notes available</p>
                ) : (
                    <div className='w-full  flex flex-col justify-center  flex-wrap  h-2/3 '>
                        {notes.map((note) => (
                            <div key={note._id} className=' border p-3 my-2 mx-2 rounded-lg bg-gray-200'>
                                <h3 className='font-bold'>{note.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Sidebar;