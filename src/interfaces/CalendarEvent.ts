export interface calendarEvent {
  _id?: string;
  start: Date,
  end:   Date,
  notes: string,
  title: string,
  user?:  EventUser
}

export interface EventUser {
  name: string,
  id:   number
}