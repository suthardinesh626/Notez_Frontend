import axios from 'axios';

// Base URL of your API
const API_URL = 'http://13.233.1.169:8000/api/v1/note';

interface ApiResponse {
  message: string;
}
interface Note {
  id: string;
  title: string;
  content: string;
  user: string;
}

interface UpdateNoteResponse extends ApiResponse {
  note: Note;
}
const createNote = async (title: string, content: string): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.post<ApiResponse>(`${API_URL}/createnote`, {
      title,
      content,
    }, {
      headers: {
        'Authorization': `${token}`
      }
    });
    // console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

const getNotes = async (): Promise<Note[]> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.get<Note[]>(`${API_URL}/allnote`, {
      headers: {
        'Authorization': `${token}`
      }
    });
    // console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

const deleteNote = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.delete(`${API_URL}/deletenote/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        });

        // console.log(response.data.message);
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};

const updateNote = async (id: string, title: string, content: string): Promise<UpdateNoteResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.put<UpdateNoteResponse>(`${API_URL}/updatenote/${id}`, {
      title,
      content,
    }, {
      headers: {
        'Authorization': `${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};
export { createNote, getNotes, deleteNote, updateNote }

