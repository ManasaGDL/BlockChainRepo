import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import {dropdownContext,dataContext,loadingContext,tableDataContext,tableloadingContext} from 'context/DropDownContext';

// types
import { openDrawer } from 'store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);
const [ valuesSelected ,setValuesSelected] = useState({"client_id":0})
const [ data, setData] = useState({})//chart Data
const [ loading , setLoading] = useState(false)
const [ tabledata, setTabledata] = useState([])
const [ tableLoading,setTableLoading]= useState(false)
  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <dropdownContext.Provider value={{ valuesSelected ,setValuesSelected}}>
      <dataContext.Provider value={{data, setData}}>
        <loadingContext.Provider value={{loading,setLoading}}>
          <tableDataContext.Provider value={{tabledata, setTabledata}}>
            <tableloadingContext.Provider value={{tableLoading,setTableLoading}}>
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
    </tableloadingContext.Provider>
    </tableDataContext.Provider>
    </loadingContext.Provider>
    </dataContext.Provider>
    </dropdownContext.Provider>
  );
};

export default MainLayout;
