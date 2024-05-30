import React, { useState, useEffect } from "react";
import { getNotes, deleteNote, updateNote } from "../service/noteService";

const AllNote: React.FC = () => {
    const [notes, setNotes] = useState<Array<{ title: string; content: string; id: string }>>([]);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [showFullContent, setShowFullContent] = useState<{ [key: string]: boolean }>({});

    const fetchNotes = async () => {
        try {
            const fetchedNotes = await getNotes();
            setNotes(fetchedNotes);
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
    };

    const toggleFullContent = (noteId: string) => {
        setShowFullContent(prevState => ({
            ...prevState,
            [noteId]: !prevState[noteId]
        }));
    };

    useEffect(() => {
        fetchNotes();
        const intervalId = setInterval(fetchNotes, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleDelete = async (noteId: string) => {
        try {
            await deleteNote(noteId);
            fetchNotes();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    const startEditing = (note: { title: string; content: string; id: string }) => {
        setEditingNoteId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const saveEdit = async (noteId: string) => {
        try {
            await updateNote(noteId, editTitle, editContent);
            setEditingNoteId(null);
            fetchNotes();
        } catch (error) {
            console.error("Failed to update note:", error);
        }
    };

    return (
        <div className='w-full flex flex-row flex-wrap justify-start items-start p-4'>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div
                        key={note.id}
                        className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col justify-start items-end m-2 p-2 border-2 rounded-2xl cursor-pointer hover:shadow-xl'
                        onClick={() => startEditing(note)}
                    >
                        {editingNoteId === note.id ? (
                            <div className="min-w-full flex flex-col flex-wrap items-end" >
                                <button onClick={() => saveEdit(note.id)} className="sm:w-1/4 md:w-2/5 text-white bg-green-400 border m-2 p-1 rounded-xl">Save</button>
                                <input
                                    className="w-full font-extrabold text-gray-700 focus:outline-none focus:ring-0"
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Title"
                                    autoFocus
                                />
                                <textarea
                                    className="w-full font-medium focus:outline-none focus:ring-0"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="Content"
                                    style={{ minHeight: '150px', maxHeight: '300px', overflowY: 'auto' }}
                                ></textarea>
                            </div>
                        ) : (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }} className="sm:w-1/4 md:w-2/5 text-white bg-red-400 border m-2 p-1 rounded-xl">Delete</button>
                                <div className="w-full flex flex-col items-start p-2">
                                    <h3 className="text-gray-700 font-extrabold">{note.title}</h3>
                                    <p className="text-gray-800 font-medium">
                                        {showFullContent[note.id] || note.content.length <= 200
                                            ? note.content
                                            : `${note.content.substring(0, 200)}...`}
                                    </p>
                                    {note.content.length > 200 && (
                                        <button onClick={(e) => { e.stopPropagation(); toggleFullContent(note.id); }} className="text-blue-500">
                                            {showFullContent[note.id] ? "Show Less" : "Show More"}
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p className="w-full text-center text-gray-500">No notes available.</p>
            )}
        </div>
    );
};

export default AllNote;
