import { useTheme } from "@mui/material/styles";
import MuiChip, { ChipProps } from "@mui/material/Chip";

interface chipProps extends ChipProps {
  chipcolor?: string;
  sx?: {};
  disabled?: boolean;
  label?: string;
  avatar?: React.ReactElement | undefined;
  onDelete?: () => void;
  onClick?: () => void;
}

const Chip = ({
  chipcolor,
  disabled,
  sx = {},
  variant,
  ...others
}: chipProps) => {
  const theme = useTheme();

  let defaultSX = {
    color: theme.palette.primary.main,
    bgcolor: theme.palette.primary.light,
    ":hover": {
      color: theme.palette.primary.light,
      bgcolor: theme.palette.primary.dark,
    },
  };

  let outlineSX = {
    color: theme.palette.primary.main,
    bgcolor: "transparent",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    ":hover": {
      color: theme.palette.primary.light,
      bgcolor: theme.palette.primary.dark,
    },
  };

  switch (chipcolor) {
    case "Waiting":
      variant === "outlined"
        ? (outlineSX = {
            color: theme.palette.secondary.main,
            bgcolor: "transparent",
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
            ":hover": {
              color: theme.palette.secondary.main,
              bgcolor: theme.palette.secondary.light,
            },
          })
        : (defaultSX = {
            color: theme.palette.secondary.main,
            bgcolor: theme.palette.secondary.light,
            ":hover": {
              color: theme.palette.secondary.light,
              bgcolor: theme.palette.secondary.main,
            },
          });
      break;
    case "In progress":
      variant === "outlined"
        ? (outlineSX = {
            color: theme.palette.success.dark,
            bgcolor: "transparent",
            border: "1px solid",
            borderColor: theme.palette.success.dark,
            ":hover": {
              color: theme.palette.success.dark,
              bgcolor: theme.palette.success.light + 60,
            },
          })
        : (defaultSX = {
            color: theme.palette.success.dark,
            bgcolor: theme.palette.success.light + 60,
            ":hover": {
              color: theme.palette.success.light,
              bgcolor: theme.palette.success.dark,
            },
          });
      break;
    case "Closed":
      variant === "outlined"
        ? (outlineSX = {
            color: theme.palette.error.main,
            bgcolor: "transparent",
            border: "1px solid",
            borderColor: theme.palette.error.main,
            ":hover": {
              color: theme.palette.error.dark,
              bgcolor: theme.palette.error.light,
            },
          })
        : (defaultSX = {
            color: theme.palette.error.dark,
            bgcolor: theme.palette.error.light + 60,
            ":hover": {
              color: theme.palette.error.light,
              bgcolor: theme.palette.error.dark,
            },
          });
      break;
    default:
  }

  if (disabled) {
    variant === "outlined"
      ? (outlineSX = {
          color: theme.palette.grey[500],
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: theme.palette.grey[500],
          ":hover": {
            color: theme.palette.grey[500],
            bgcolor: "transparent",
          },
        })
      : (defaultSX = {
          color: theme.palette.grey[500],
          bgcolor: theme.palette.grey[50],
          ":hover": {
            color: theme.palette.grey[500],
            bgcolor: theme.palette.grey[50],
          },
        });
  }

  let SX = defaultSX;
  if (variant === "outlined") {
    SX = outlineSX;
  }
  SX = { ...SX, ...sx };
  return <MuiChip {...others} sx={SX} />;
};

export default Chip;
