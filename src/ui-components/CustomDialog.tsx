import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const BootstrapDialogTitle: FC<DialogTitleProps> = ({
  children,
  onClose,
  ...other
}) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} component="div">
      {children}
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

const CustomDialog: FC<DynamicFormProps> = ({
  children,
  title,
  handleEdit,
  open,
  edit,
  handleAddCandidate,
  handleClose,
  position,
  handleAddCompanyUser,
}) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography variant="h6">{title}</Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          {edit ? (
            <>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          ) : position ? (
            <></> ? (
              handleAddCandidate
            ) : (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleAddCandidate}
              >
                Register
              </Button>
            )
          ) : (
            handleAddCompanyUser && (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleAddCompanyUser}
              >
                Register
              </Button>
            )
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export interface DynamicFormProps {
  handleAddCandidate?: () => void;
  title: string;
  handleEdit?: () => void;
  open: boolean;
  edit?: boolean;
  handleClose: () => void;
  position?: boolean;
  handleAddCompanyUser?: () => void;
}

export interface DialogTitleProps {
  id: string;
  onClose: () => void;
}

export default CustomDialog;
