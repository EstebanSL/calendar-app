export interface calendarEvent {
  id?: string;
  start: Date,
  end:   Date,
  notes: string,
  title: string,
  user?:  number
}