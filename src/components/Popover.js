import React, { Component } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";



class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };

  render() {
    let { text } = this.props;
    const { open, anchorEl } = this.state;
    const id = open ? "read-more-popover" : undefined;

    return (
      <div>
        <Link
          aria-describedby={id}
          variant="body2"
          onClick={this.handleClick}
          style={{ cursor: "pointer" }}
        >
          Read More
        </Link>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 370, left: 540 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            "& .MuiPopover-paper": {
              width: "685px",
              height: "275px",
              borderRadius: "8px",
              backgroundColor: "#2E3156",
              boxShadow: "0px 4px 20px 0px #2E3156",
            },
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontFamily: "Roboto",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: " 400",
              lineHeight: "18px",
              padding: "3%",
              paddingRight:'5%'
            }}
          >
            {text}
          </Typography>
          <IconButton
            aria-label="Close"
            onClick={this.handleClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#fff",
              fontSize:'10px',
            }}
          >
            <i class="bi bi-x-lg"></i>
          </IconButton>
        </Popover>
      </div>
    );
  }
}

export default YourComponent;
