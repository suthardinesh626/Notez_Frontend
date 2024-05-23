import React, { useState } from 'react';
import { updateNote } from '../service/noteService';

const UpdateNote = ({ noteId }: { noteId: string }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateNote(noteId, title, content);
            console.log(response);
            // Handle success, e.g., close modal or show success message
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show error message
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
                <button type="submit">Update Note</button>
            </form>
        </>
    );
};

export default UpdateNote;