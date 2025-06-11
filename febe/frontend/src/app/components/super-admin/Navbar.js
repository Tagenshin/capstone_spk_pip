"use client";

import { useState } from "react";
import { Drawer, Box, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { School, AccountCircle, ExitToApp } from "@mui/icons-material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const AdminNavbar = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          bgcolor: "#3f51b5",
          color: "white",
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Super Admin
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        <ListItem button>
          <School />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <AccountCircle />
          <ListItemText primary="Profil" />
        </ListItem>
        <ListItem button>
          <ExitToApp />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminNavbar;
