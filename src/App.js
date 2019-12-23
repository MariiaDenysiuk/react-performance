import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialTableDemo from "./pages/Wells/Wells";
import Drilling from "./pages/Drillings/Drilling";
import Completion from "./pages/Completion/Completion";
import { grey } from '@material-ui/core/colors';
import Financial from "./pages/Financial/Financial";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: {
            main: '#f5f5f5',
        },
    },
});

export default function SimpleTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar position="static" style={{backgroundColor: '#212121', color: 'white'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Wells" {...a11yProps(0)} />
                        <Tab label="Drills" {...a11yProps(1)} />
                        <Tab label="Completion" {...a11yProps(2)} />
                        <Tab label="Financial" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <MaterialTableDemo></MaterialTableDemo>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Drilling/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <Completion/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Financial/>
                </TabPanel>
            </div>
        </ThemeProvider>
    );
}