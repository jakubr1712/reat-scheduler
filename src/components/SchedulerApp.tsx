import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  DayView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/firebaseService";
import { classes } from "../constants/styles";
import { StyledFab } from "../styles";
import AppointmentFormContainerBasic from "../components/AppointmentFormContainerBasic";
import { ChangeSet, AppointmentModel } from "@devexpress/dx-react-scheduler";

import useToggle from "../hooks/useToggle";
import { getCurrentDate } from "../utils/getCurrentDate";
import { removeUndefined } from "../utils/removeUndefined";
import { startDayHour, endDayHour } from "../constants/common";

function SchedulerApp() {
  const queryClient = useQueryClient();
  const {
    data: appointmentsData = [],
    isLoading,
    error,
  } = useQuery<CommonTypes.AppointmentI[]>("appointments", getAppointments);

  const addMutation = useMutation(addAppointment, {
    onSuccess: () => queryClient.invalidateQueries("appointments"),
    onError: (error) => {
      console.error("Failed to add appointment:", error);
      alert("Failed to add meeting. Please try again.");
    },
  });

  const updateMutation = useMutation(updateAppointment, {
    onSuccess: () => queryClient.invalidateQueries("appointments"),
    onError: (error) => {
      console.error("Failed to update appointment:", error);
      alert("Failed to update meeting. Please try again.");
    },
  });

  const deleteMutation = useMutation(deleteAppointment, {
    onSuccess: () => queryClient.invalidateQueries("appointments"),
    onError: (error) => {
      console.error("Failed to delete appointment:", error);
      alert("Failed to delete meeting. Please try again.");
    },
  });

  const [editingFormVisible, setEditingFormVisible] = useToggle(false);
  const [isNewAppointment, setIsNewAppointment] = useToggle(false);

  const currentDate = getCurrentDate();

  const [editingAppointment, setEditingAppointment] = useState<
    CommonTypes.AppointmentI | undefined
  >(undefined);
  const [previousAppointment, setPreviousAppointment] = useState<
    CommonTypes.AppointmentI | undefined
  >(undefined);
  const [addedAppointment, setAddedAppointment] = useState<
    Partial<CommonTypes.AppointmentI>
  >({});

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      addMutation.mutate(added as CommonTypes.AppointmentI);
    }
    if (changed) {
      updateMutation.mutate({
        id: changed.id!,
        changes: removeUndefined(changed as Partial<CommonTypes.AppointmentI>),
      });
    }
    if (deleted !== undefined) {
      deleteMutation.mutate(deleted.toString());
    }
  };

  const onEditingAppointmentChange = (
    editingAppointment: Partial<AppointmentModel>
  ) => {
    if (!editingAppointment) {
      setEditingAppointment(undefined);
      return;
    }

    const appointment: CommonTypes.AppointmentI = {
      id: editingAppointment.id?.toString(),
      title: editingAppointment.title || "",
      startDate: editingAppointment.startDate
        ? new Date(editingAppointment.startDate)
        : new Date(),
      endDate: editingAppointment.endDate
        ? new Date(editingAppointment.endDate)
        : new Date(),
      notes: editingAppointment.notes,
      location: editingAppointment.location,
      allDay: editingAppointment.allDay ?? false,
    };

    setEditingAppointment(appointment);
  };

  const onAddedAppointmentChange = (
    appointment: Partial<CommonTypes.AppointmentI>
  ) => {
    setAddedAppointment(appointment);
    if (editingAppointment) {
      setPreviousAppointment(editingAppointment);
    }
    setEditingAppointment(undefined);
    setIsNewAppointment(true);
  };

  const AppointmentFormComp = connectProps(
    AppointmentFormContainerBasic,
    () => {
      const currentAppointment =
        appointmentsData.find(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        ) || addedAppointment;

      const cancelAppointment = () => {
        if (isNewAppointment) {
          setEditingAppointment(previousAppointment);
          setIsNewAppointment(false);
        }
      };

      return {
        visible: editingFormVisible,
        visibleChange: setEditingFormVisible,
        appointmentData: currentAppointment,
        cancelAppointment,
        commitChanges,
        onEditingAppointmentChange,
      };
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while loading events.</div>;
  }

  const startDate = new Date(currentDate);
  startDate.setHours(startDayHour);

  const endDate = new Date(currentDate);
  endDate.setHours(startDayHour + 1);

  return (
    <Paper>
      <Scheduler data={appointmentsData || []} height={660}>
        <ViewState defaultCurrentDate={currentDate} />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={onEditingAppointmentChange}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <AppointmentForm
          overlayComponent={AppointmentFormComp}
          visible={editingFormVisible}
          onVisibilityChange={setEditingFormVisible}
        />
        <DragDropProvider />
      </Scheduler>
      <StyledFab
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          setEditingFormVisible(true);
          onEditingAppointmentChange({});
          onAddedAppointmentChange({
            startDate,
            endDate,
          });
        }}
      >
        <AddIcon />
      </StyledFab>
    </Paper>
  );
}

export default SchedulerApp;
