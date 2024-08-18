import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import { classes } from "../constants/styles";
import { StyledDiv } from "../styles";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import Button from "@mui/material/Button";
import {
  AppointmentFormContainerBasicProps,
  CommitAppointmentType,
} from "./models.d";

function AppointmentFormContainerBasic({
  visible,
  visibleChange,
  appointmentData,
  cancelAppointment,
  commitChanges,
  target,
  onHide,
}: AppointmentFormContainerBasicProps) {
  const [appointmentChanges, setAppointmentChanges] = useState<
    Partial<CommonTypes.AppointmentI>
  >({});

  const changeAppointment = ({
    field,
    changes,
  }: {
    field: keyof CommonTypes.AppointmentI;
    changes: string | Date | null;
  }) => {
    setAppointmentChanges((prev) => ({
      ...prev,
      [field]: changes,
    }));
  };

  const commitAppointment = (type: CommitAppointmentType) => {
    const appointment = {
      ...appointmentData,
      ...appointmentChanges,
    };
    if (type === CommitAppointmentType.Deleted) {
      commitChanges({ [type]: appointment.id! });
    } else if (type === CommitAppointmentType.Changed) {
      commitChanges({ [type]: appointment });
    } else {
      commitChanges({ [type]: appointment });
    }
    setAppointmentChanges({});
  };

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };

  const isNewAppointment = appointmentData.id === undefined;

  const applyChanges = isNewAppointment
    ? () => commitAppointment(CommitAppointmentType.Added)
    : () => commitAppointment(CommitAppointmentType.Changed);

  const textEditorProps = (field: keyof CommonTypes.AppointmentI) => ({
    variant: "outlined" as const,
    onChange: ({ target: change }: { target: { value: string } }) =>
      changeAppointment({
        field: field,
        changes: change.value,
      }),
    value: displayAppointmentData[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = (field: keyof CommonTypes.AppointmentI) => ({
    value: displayAppointmentData[field],
    onChange: (date: moment.Moment | null) => {
      const dateValue = date ? date.toDate() : displayAppointmentData[field];
      if (
        typeof dateValue === "string" ||
        typeof dateValue === "number" ||
        dateValue instanceof Date
      ) {
        changeAppointment({
          field: field,
          changes: new Date(dateValue),
        });
      } else {
        console.error(
          `Nieprawidłowy typ danych dla pola ${field}: ${typeof dateValue}`
        );
      }
    },
    ampm: false,
    inputFormat: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });

  const startDatePickerProps = pickerEditorProps("startDate");
  const endDatePickerProps = pickerEditorProps("endDate");

  const cancelChanges = () => {
    setAppointmentChanges({});
    visibleChange();
    cancelAppointment();
  };

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      fullSize
      onHide={onHide}
    >
      <StyledDiv>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
            size="large"
          >
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField {...textEditorProps("title")} label="Tytuł" />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Start"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...startDatePickerProps}
              />
              <DateTimePicker
                label="Koniec"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...endDatePickerProps}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <LocationOn className={classes.icon} color="action" />
            <TextField {...textEditorProps("location")} label="Lokalizacja" />
          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField
              {...textEditorProps("notes")}
              label="Notatka"
              multiline
              rows={6}
            />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment(CommitAppointmentType.Deleted);
              }}
            >
              Usuń
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
          >
            {isNewAppointment ? "Stwórz" : "Zapisz"}
          </Button>
        </div>
      </StyledDiv>
    </AppointmentForm.Overlay>
  );
}

export default AppointmentFormContainerBasic;
