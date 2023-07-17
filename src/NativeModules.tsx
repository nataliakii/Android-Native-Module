/**
 * This exposes the native CalendarModule and BirthdayModule modules as JS modules.
 * CalendarModule has functions for creating calendar events and retrieving calendar events for the week.
 * BirthdayModule has a function for retrieving the number of days until the next birthday event.
 */
import {NativeModules} from 'react-native';

const {CalendarModule, BirthdayModule} = NativeModules;

interface CalendarInterface {
  createCalendarEvent(name: string, location: string, date: string): void;
  getCalendarEventsForWeek(): Promise<CalendarEvent[]>;
}

interface CalendarEvent {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface BirthdayInterface {
  getDaysUntilBirthday(): Promise<number>;
}

export const Calendar: CalendarInterface = CalendarModule;
export const Birthday: BirthdayInterface = BirthdayModule;
