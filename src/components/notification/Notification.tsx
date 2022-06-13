import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import { SEVERITY } from "@/types/SeverityType";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface IProps {
  severity: SEVERITY;
  message: string;
}
export const Notification = React.forwardRef(
  ({ message, severity }: IProps, ref) => {
    const [state, setState] = React.useState<State>({
      open: false,
      vertical: "top",
      horizontal: "center",
    });
    const { vertical, horizontal, open } = state;

    const handleOpenNoti = (newState: SnackbarOrigin) => () => {
      setState({ open: true, ...newState });
    };

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
);
