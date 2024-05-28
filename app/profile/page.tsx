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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPhotoFilm } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

export default function UserProfile() {
  const { isAuthenticated, user } = useAuthentication();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
    <section className="x-section-padding py-8 flex flex-col space-y-16">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-3">
          <FaPhotoFilm className="text-5xl" />
          <div className="font-bold text-xl">
            <h2 className="">Photo Labs</h2>
            <p className="text-base">Pictures worth 1024 words!</p>
          </div>
        </Link>
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
              <MenuItem onClick={() => router.push("/profile")}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <IoIosLogOut />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </nav>
      <section className="flex flex-col space-y-6">
        <h2 className="main-title">My Profile</h2>
        <section>
          <h1>
            <span className="font-bold">Name:</span> {user?.first_name}{" "}
            {user?.last_name}
          </h1>
          <p>
            <span className="font-bold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-bold">Username:</span> {user?.username}
          </p>
        </section>
      </section>
      <section>
        <h2 className="main-title">Albums</h2>
      </section>
    </section>
  );
}
