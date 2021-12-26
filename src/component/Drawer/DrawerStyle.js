import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
   
  }, page: {

        background: theme.palette.background.paper,
        width: '100%',
      
      },
   
  navgivationLogo: {
    width: "50%",
    cursor: "pointer",
  },
  navigationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(6),
    
  },
  navigationDrawer: {
    width: "240px",
    border:'none',
    whiteSpace:'nowrap',
    overflowX:'hidden',
   
   
   
  },navigationtoolBar:{

    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingLeft:theme.spacing(8),
    ...theme.mixins.toolbar,

  },
  navigationList: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    flex:1,
    

  },navigationDawercollapse:{
        width:theme.spacing(9)
  },
  menuItemicon: {
    width: "100%",
  },
  menuitem: {
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuItemactive: {
    backgroundColor: "#EBEBEC",
  },
  navigationSpacer:{
      flex:1
  },navigationtoolbarCollaps:{
      justifyContent:'center',
      paddingLeft:0
  },toolbar:{
      [theme.breakpoints.down('sm')]:{
        ...theme.mixins.toolbar,
      }
     
    }
}));
