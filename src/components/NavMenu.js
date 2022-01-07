import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
        <b
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          KindNUS
          <KeyboardArrowDownIcon />
        </b>
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
        <MenuItem
          style={{
            fontFamily: "Nunito",
            color: "#5959ff",
          }}
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Send a Message
        </MenuItem>
        <Divider />
        <MenuItem
          style={{
            fontFamily: "Nunito",
            color: "#5959ff",
          }}
          onClick={() => {
            navigate("/happy");
            handleClose();
          }}
        >
          Happy
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "Nunito",
            color: "#5959ff",
          }}
          onClick={() => {
            navigate("/sad");
            handleClose();
          }}
        >
          Sad
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "Nunito",
            color: "#5959ff",
          }}
          onClick={() => {
            navigate("/angry");
            handleClose();
          }}
        >
          Angry
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "Nunito",
            color: "#5959ff",
          }}
          onClick={() => {
            navigate("/loved");
            handleClose();
          }}
        >
          Love
        </MenuItem>
      </Menu>
    </div>
  );
};
export default NavMenu;
