import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./Profileimg.css";
import { Globalcontext } from "../store/context";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Profileimage({ avtar, email, name,button }) {
  const{Selectedstate}=Globalcontext()
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("i am rendor");
  return (
    <React.Fragment>
  
      <Button onClick={handleOpen}>{button}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="mui-modal">
          <CloseIcon className="close-icon" onClick={handleClose}/>
            <Avatar src={avtar} className="profile-img" />
          <Box sx={{textAlign:"center",padding:"15px 0 0"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
            <Typography id="modal-modal-description">{email}</Typography>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default Profileimage;
