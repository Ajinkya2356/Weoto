import React, { Component } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  valuetext = (value) => {
    return `${value}`;
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    this.props.onChange(newValue); // Notify parent component of value change
  };

  render() {
    const { title, ...props } = this.props;
    const { value } = this.state;

    return (
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <label htmlFor="type">{title} &nbsp;</label>
        </Grid>
        <Grid item>
          <Box
            sx={{
              minWidth: 260,
              bgcolor: "#f1f3f3",
              borderColor: "blue",
              borderRadius: 2,
              border: 2,
              px: 1,
              marginBottom: 1,
            }}
          >
            <Grid container spacing={2} alignItems="center" className="p-0">
              <Grid item>0</Grid>
              <Grid item xs>
                <Slider
                  size="small"
                  getAriaLabel={() => "Stats range"}
                  value={value}
                  onChange={this.handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={this.valuetext}
                  min={0}
                  max={210}
                  {...props}
                />
              </Grid>
              <Grid item>210</Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default RangeSlider;
