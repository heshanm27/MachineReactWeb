import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';


const Dashroutes = [
  {
    label: "Dashboard",
    path: "/dashbord",
    icon: <DashboardOutlinedIcon/>,
    activeIcon: <DashboardIcon/>,
    component: 'Dashboard',
  },
  {
    label: "Warrenty",
    path: "/warrenty",
    icon: <ReceiptOutlinedIcon/>,
    activeIcon: <ReceiptIcon/>,
    component: 'Transactions',
  },
  {
    label: "Add Item",
    path: "/additem",
    icon: <AddBoxOutlinedIcon/>,
    activeIcon: <AddBoxIcon/>,
    component: 'Secure',
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <SettingsOutlinedIcon/>,
    activeIcon: <SettingsIcon/>,
    component: 'Settings',
  },
];

export default Dashroutes;
