import axios from 'axios';

// Base URL of your API
const API_URL = 'http://localhost:8000/api/v1/note'; // Adjust the port and URL as needed

interface ApiResponse {
  message: string;
  // Add other fields as needed
}
interface Note {
  _id: string;
  title: string;
  content: string;
  user: string;
  // Add other fields as needed
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



//write a code for updating the note 
const updateNote = async (id: string, title: string, content: string): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.put<ApiResponse>(`${API_URL}/updatenote/${id}`, {
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

export { createNote, getNotes,  updateNote };

