import axios from 'axios';
import type { Note } from '../types/note.ts';

export interface NotesProps {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


axios.defaults.baseURL = 'https://notehub-public.goit.study/api';


const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
if (!NOTEHUB_TOKEN) {
  throw new Error('NOTEHUB_TOKEN is not defined!');
}


export async function fetchNotes({
  page = 1,
  perPage = 10,
  search,
}: FetchNotesParams): Promise<NotesProps> {
  const { data } = await axios.get<NotesProps>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return data;
}


export async function createNote(data: CreateNoteProps) {
  const res = await axios.post<Note>('/notes', data, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
}


export async function deleteNote(id: Note['id']) {
  const { data } = await axios.delete(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return data;
}