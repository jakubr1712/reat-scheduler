import { RefObject } from "react";

export interface AppointmentFormContainerBasicProps {
  visible: boolean;
  visibleChange: () => void;
  appointmentData: CommonTypes.AppointmentI;
  cancelAppointment: () => void;
  target: RefObject<unknown>;
  onHide: () => void;
  commitChanges: (args: {
    added?: CommonTypes.AppointmentI;
    changed?: CommonTypes.AppointmentI;
    deleted?: string;
  }) => void;
}

export enum CommitAppointmentType {
  Added = "added",
  Changed = "changed",
  Deleted = "deleted",
}
