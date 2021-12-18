import React from 'react'
import { Outlet} from "react-router";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },


}))


export default function Feed() {

    const classes =useStyles();
    return (
        <div className={classes.root}>
              <main className={classes.content}>
              <Container maxWidth="md" className={classes.container}>
            <Outlet />
            </Container>
            </main>
        </div>
    )
}
