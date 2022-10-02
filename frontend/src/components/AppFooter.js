import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div style={{margin:'10px'}}>
        {/* <span className="ms-1">&copy; Abhi's Project</span> */}
        <span>
        <span >Designed by </span>
        <a href={"https://www.linkedin.com/in/abhijith-v-pillai"} >
          @avp
        </a>
        </span >
      </div>
      <div className="ms-2">
     
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
