/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Avatar as MuiAvatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Box,
} from "@mui/material";
import {
    Logout,
    Notifications,
} from "@mui/icons-material";
import { IoAdd } from "react-icons/io5";
import { FaFirstOrder, FaShopify } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCurrentUser, setUserInfo } from "../redux/reducers/authSlice";
import { useSelector } from "react-redux";

const Avatar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const decoded = useSelector(selectCurrentUser);
    const user = useSelector(selectCurrentUser);

    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(setUserInfo({}));
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    return (
        <div className="ml-auto md:ml-0">
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MuiAvatar
                        alt={decoded?.name}
                        src={decoded?.profileImage}
                        sx={{ width: 34, height: 34 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiMuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
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
                <MenuItem>
                    <Link
                        to={`/profile/${decoded._id}`}
                        className="flex items-center"
                    >
                        <MuiAvatar
                            alt={decoded?.name}
                            src={decoded?.profileImage}
                            sx={{ width: 32, height: 32, mr: 2 }}
                        />{" "}
                        Profile
                    </Link>
                </MenuItem>
                {console.log(user)}
                {(user) && (
                    <Box>
                        <Divider />
                    </Box>
                )}
                <MenuItem>
                    <Link to="/notifications">
                        <ListItemIcon>
                            <Notifications fontSize="small" />
                        </ListItemIcon>
                        Notifications
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/user-orders">
                        <ListItemIcon>
                            <FaFirstOrder fontSize="small" />
                        </ListItemIcon>
                        Orders
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Avatar;
