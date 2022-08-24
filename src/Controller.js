import React from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default class Controller extends React.Component {
    constructor() {
        super()
        this.state = {
            toggle:false,
            clients:[""],
            value:''
        }
    }

    componentDidMount=async ()=>{
        // let clients = await fetch(`/getClients`).then(res=>res.json()).then(res=>res.clients)
        // this.setState({clients:clients})
    }

    valuetext = (value) => {
        return `${value}°C`
    }

    handleCommits = () => {
        let power = this.state.toggle
        let bri = Number(document.getElementById('bri').innerText)
        let R = Number(document.getElementById('R').innerText)
        let G = Number(document.getElementById('G').innerText)
        let B = Number(document.getElementById('B').innerText)
        let data = {
            "on": power,
            "bri": bri,
            "seg": [{
              "col": [
                [R, G, B, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
              ]
            }]
          }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify({client:this.state.value,data:data})
        }
        console.log(data)
        //fetch(`/updateValues`,options) //Add prod API
    }

    handleChange = (event) => {
        this.setState({value:event.target.value});
    };

    render() {
        return (
            <Box sx={{ width: 400,minWidth: 200 }}>
                <Box sx={{ minWidth: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <ToggleButton
                    value="check"
                    selected={this.state.toggle}
                    onChange={() => {
                    this.setState({toggle:!this.state.toggle})
                    this.handleCommits()
                    }}
                >
                    <PowerSettingsNewIcon></PowerSettingsNewIcon>
                </ToggleButton>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Clients</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.value}
                    label="Clients"
                    onChange={this.handleChange}
                >
                    {this.state.clients.map((val,ind)=>{
                        return (<MenuItem value={ind} key={ind}>{val}</MenuItem>)
                    })}
                </Select>
                </FormControl>
                </Stack>
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <BrightnessLowIcon></BrightnessLowIcon>
                    <Slider
                        aria-label="Brightness"
                        id="bri"
                        defaultValue={0}
                        getAriaValueText={this.valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                        onChangeCommitted={this.handleCommits}
                    />
                    <BrightnessHighIcon></BrightnessHighIcon>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <p>R</p><Slider
                        aria-label="R"
                        id="R"
                        defaultValue={0}
                        getAriaValueText={this.valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                        onChangeCommitted={this.handleCommits}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <p>G</p><Slider
                        aria-label="G"
                        id="G"
                        defaultValue={0}
                        getAriaValueText={this.valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                        onChangeCommitted={this.handleCommits}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <p>B</p><Slider
                        aria-label="B"
                        id="B"
                        defaultValue={0}
                        getAriaValueText={this.valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        min={0}
                        max={255}
                        onChangeCommitted={this.handleCommits}
                    />
                </Stack>
            </Box>
        )
    }
}