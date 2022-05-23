import { FC, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

import MainCard from "../ui-components/MainCard";
import Transitions from "../ui-components/Transitions";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cookie } from "universal-cookie";

const SettingsAppBar: FC<SettingsAppBarProps> = ({ user, logout }) => {
  const theme = useTheme();

  const [selectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const handleLogout = async () => {
    logout();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (
    event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {user && (
        <Typography variant="subtitle2" mt={4} color="black" fontWeight={300}>
          Hello {user.first_name}!
        </Typography>
      )}
      {user && (
        <Chip
          sx={{
            height: "auto",
            alignItems: "center",
            borderRadius: "25px",
            transition: "all .2s ease-in-out",
            backgroundColor: "white",
            '&[aria-controls="menu-list-grow"], &:hover': {
              background: `white`,
            },
            "& .MuiChip-label": {
              lineHeight: 0,
            },
          }}
          icon={
            <Avatar
              src={user.avatar}
              sx={{
                margin: "8px 0 8px 8px !important",
                cursor: "pointer",
              }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              color="inherit"
            />
          }
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />
      )}
      {user && (
        <Popper
          placement="top"
          open={open}
          anchorEl={anchorRef.current}
          transition
          popperOptions={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 14],
                },
              },
            ],
          }}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClose}>
              <Transitions in={open} {...TransitionProps}>
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                  >
                    <div
                      style={{
                        margin: "3%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          Hello,
                        </Typography>
                        <Typography variant="subtitle1">
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Stack>
                      <Divider />
                    </div>

                    <Box>
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `5px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Transitions>
            </ClickAwayListener>
          )}
        </Popper>
      )}
    </div>
  );
};

export interface SettingsAppBarProps {
  user: Cookie;
  logout: () => void;
}

export default SettingsAppBar;
