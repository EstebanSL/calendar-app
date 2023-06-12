import { calendarEvent } from '../interfaces';
import { supabase } from './supabaseClient';

export const getEvents = async (userID: string): Promise<any> => {
  const { data, error } = await supabase.from('Events').select('*').filter('user', 'eq', userID);
  if (error) {
    return error;
  } else {
    return data;
  }
};

export const saveNewEvents = async (calendarEvent: calendarEvent): Promise<any> => {
  const { data, error } = await supabase.from('Events').insert([calendarEvent])
}

export const updateEvent = async (calendarEvent: calendarEvent): Promise<any> => {
  const calendarEventUpdated: any = calendarEvent
  delete calendarEventUpdated['sourceResource']
  const { data, error } = await supabase.from('Events').update(calendarEventUpdated).eq('id', calendarEventUpdated.id)}
  
  export const deleteEvent = async (calendarEvent: calendarEvent): Promise<any> => {
    const { data, error } = await supabase.from('Events').delete().eq('id', calendarEvent.id)
  }