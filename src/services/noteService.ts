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

// базовий URL API
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

// береться токен із environment
const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!NOTEHUB_TOKEN) {
  throw new Error('NOTEHUB_TOKEN is not defined! Check Vite or Vercel environment variables.');
}

/**
 * Отримання нотаток
 */
export async function fetchNotes({
  page,
  perPage = 12,
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

/**
 * Створення нотатки
 */
export async function createNote(data: CreateNoteProps): Promise<Note> {
  const { data: note } = await axios.post<Note>('/notes', data, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return note;
}

/**
 * Видалення нотатки
 */
export async function deleteNote(id: Note['id']): Promise<void> {
  await axios.delete(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
}