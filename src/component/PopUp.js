import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
export default function PopUp(props) {

    const{title,children,openPopup,setOpenPopUp} = props
    return (
      <Dialog open={openPopup}>
          <DialogTitle>
                <div>Title goes Here</div>
          </DialogTitle>
          <DialogContent>
              <div>Body Content Goes Here</div>
          </DialogContent>
      </Dialog>
    )
}
