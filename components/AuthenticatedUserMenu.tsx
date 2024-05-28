"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSwitchAccount } from "react-icons/md";
export default function AuthenticatedUserMenu() {
  let { isAuthenticated, user } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    isAuthenticated = false;
    router.push("/auth/login");
  };

  return (
    <>
      {isAuthenticated && (
        <div className="flex items-center space-x-3 text-lg">
          <p className="font-medium">Hello, {user?.first_name}</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.first_name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => router.push("/profile")}
              className="flex items-center space-x-2"
            >
              <MdOutlineSwitchAccount className="text-xl" />
              <p>My Account</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <IoIosLogOut className="text-xl" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
