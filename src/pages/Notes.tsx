import React, { useState, FormEvent, useEffect } from 'react';
import { createNote, getNotes } from '../service/noteService';



const DataForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const status = await createNote(title, content);
            setSuccess(true);
            // await getNotes();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className='min-w-full flex flex-col p-3 w-4/12 rounded-lg'>
                <form className='border-2 p-3 rounded-xl bg-gray-200 ' onSubmit={handleSubmit}>
                    <div className='w-full underline my-2' >
                        <input
                            className='w-full my-2 bg-gray-200 font-bold focus:outline-none focus:ring-0'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter Title'
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            className='w-full my-1 bg-gray-200 border font-bold focus:outline-none focus:ring-0'
                            value={content}
                            placeholder='Enter content'
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <button className='border-2 p-2 rounded-lg bg-purple-300 font-bold hover:shadow-md  focus:outline-none focus:ring-0 ' type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                    {error && <div style={{ color: 'red', fontSize: '17px' }}>Error: {error}</div>}
                    {success && <div style={{ color: 'purple', fontSize: '17px' }}>Note saved!</div>}
                </form>
            </div>

        </>
    );
};

export default DataForm;
