import { useEffect, useState } from "react";
import { getNotes } from '../service/noteService';

const Sidebar = () => {
    const [notes, setNotes] = useState<any[]>([]);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotes();
        const intervalId = setInterval(fetchNotes, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full flex flex-col p-4 md:p-9">
            <h5 className="text-3xl font-extrabold text-purple-500">Titles</h5>
            {notes.length === 0 ? (
                <p>No notes available</p>
            ) : (
                <div className='w-full flex flex-col justify-center flex-wrap h-2/3'>
                    {notes.map((note) => (
                        <div key={note._id} className='border p-3 my-2 mx-2 rounded-lg bg-gray-200'>
                            <h3 className='font-bold'>{note.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Sidebar;
