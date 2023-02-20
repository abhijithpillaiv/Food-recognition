import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core'

function alert(props) {
    const{confirm,setconfirm}=props
    return (
      <Dialog open={confirm.isOpen}>
          <DialogTitle>
          </DialogTitle>

          <DialogContent>
              <Typography style={{color:confirm.color,textAlign:'center'}} variant='h6'>
                  {confirm.title}
              </Typography>
              <Typography variant='subtitle2'>
                  {confirm.subtitle}
              </Typography>
          </DialogContent>

          <DialogActions>
          {confirm.info?<button onClick={confirm.onConfirm} type="button" className="btn btn-primary">OK</button>:
          <span><button onClick={confirm.onConfirm} type="button" className="btn btn-primary">Yes</button>
          <button onClick={()=>setconfirm({...confirm,isOpen:false})} type="button" className="btn btn-danger">No</button></span>}
          </DialogActions>
      </Dialog>
    )
}

export default alert
