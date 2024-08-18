declare namespace CommonTypes {
  interface AppointmentI {
    id?: string;
    title: string;
    notes?: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    allDay: boolean;
  }
}
