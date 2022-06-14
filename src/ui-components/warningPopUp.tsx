import { FC } from "react";
import {
  Dialog,
  styled,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      {...other}
    >
      <Typography variant="h6" mt={2}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const WarningPopUp: FC<WarningPopUpProps> = ({
  message,
  title,
  open,
  handleClose,
  action,
}) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      {action && (
        <DialogActions>
          <Button autoFocus onClick={action}>
            Continue
          </Button>
        </DialogActions>
      )}
    </BootstrapDialog>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface WarningPopUpProps {
  message: string;
  open: boolean;
  title: string;
  action?: () => void;
  handleClose: () => void;
}

export default WarningPopUp;
