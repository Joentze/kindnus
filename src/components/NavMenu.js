import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

const NavMenu = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "#5a5aff",
          textTransform: "none",
        }}
      >
        <b>KindNUS</b>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/")}>Send a message</MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/happy")}>Happy</MenuItem>
        <MenuItem onClick={() => navigate("/sad")}>Sad</MenuItem>
        <MenuItem onClick={() => navigate("/angry")}>Angry</MenuItem>
        <MenuItem onClick={() => navigate("/loved")}>Love</MenuItem>
      </Menu>
    </div>
  );
};
export default NavMenu;
