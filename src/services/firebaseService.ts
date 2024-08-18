import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getAppointments = async (): Promise<
  CommonTypes.AppointmentI[]
> => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      notes: data.notes,
      location: data.location,
      allDay: data.allDay ?? false,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    } as CommonTypes.AppointmentI;
  });
};

export const addAppointment = async (
  appointment: Omit<CommonTypes.AppointmentI, "id">
) => {
  await addDoc(collection(db, "appointments"), {
    ...appointment,
    startDate: new Date(appointment.startDate).toISOString(),
    endDate: new Date(appointment.endDate).toISOString(),
  });
};

export const updateAppointment = async ({
  id,
  changes,
}: {
  id: string;
  changes: Partial<CommonTypes.AppointmentI>;
}) => {
  const appointmentDoc = doc(db, "appointments", id);
  const updatedData = {
    ...changes,
    ...(changes.startDate && {
      startDate: new Date(changes.startDate).toISOString(),
    }),
    ...(changes.endDate && {
      endDate: new Date(changes.endDate).toISOString(),
    }),
  };
  await updateDoc(appointmentDoc, updatedData);
};

export const deleteAppointment = async (id: string) => {
  await deleteDoc(doc(db, "appointments", id));
};
