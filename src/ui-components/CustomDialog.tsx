import * as React from "react";
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

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
}) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="h6" sx={{ fontFamily: "Anek Odia" }}>
            {title}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Cancel
            </Button>
            {edit ? (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleAddCandidate}
              >
                Register
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export interface DynamicFormProps {
  handleAddCandidate?: () => void;
  title: string;
  handleEdit?: () => void;
  open: boolean;
  edit?: boolean;
  handleClose: () => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default CustomDialog;
