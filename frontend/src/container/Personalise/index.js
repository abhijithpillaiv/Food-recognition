import React, { useEffect, useState } from 'react'
import BalCalorie from './balCalorie'
import Eattime from './eattime/eattime'
import CIcon from '@coreui/icons-react'
import { CForm, CButton, CCol, CRow } from '@coreui/react';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { port } from '../../context/collection';
import { cookie } from '../../context/collection'
import {
  cilArrowThickToTop
} from '@coreui/icons'
export default function index() {
  const [cookies,] = useCookies([cookie]);

  const [choice, setchoice] = useState('bal');
  const [amrval, setamrval] = useState(0);
  const [temp, settemp] = useState(0);
  const [calories, setcalories] = useState(0);
  const [fat, setfat] = useState(0);
  const [protein, setprotein] = useState(0);
  const [carb, setcarb] = useState(0);
  const [lodr, setlodr] = useState(null)
  useEffect(() => {
    console.log(carb);
  }, [carb]);
  useEffect(() => {
    if (temp) {
      if (choice == 'hwg') {
        setamrval(temp + 500)
      }
      else if (choice == 'mwl') {
        setamrval(temp - 200)
      }
      else if (choice == 'mwg') {
        setamrval(temp + 200)
      }
      else if (choice == 'hwl') {
        setamrval(temp - 500)
      }
      else {
        console.log('bal');
        setamrval(temp)
      }
    }else{setchoice('bal')}
    console.log(choice);
  }, [choice]);
  // Get details
  useEffect(() => {
    if (cookies.data1) {
        axios.get(port + '/api/getDetails/' + cookies.data1).then((res) => {
            console.log(res.data);
            if (res.data) {
              setamrval(res.data.data.hdetails.amr)
            } setuser(res.data)

        })
    }
    setlodr(true)
}, [cookies])
  
  return lodr&& (
    <div className='container-fluid' style={{ paddingTop:'110px', backgroundColor: "white" }}>
      <div >

        <main id="main">
          <div className="container" data-aos="fade-up" style={{ paddingBottom: '20px'}}>
            {choice&&<CForm className="row g-8">
              <CCol xs='auto'>
                <CButton style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'15px'}} color={choice == 'bal' ? "primary" : "light"} onClick={() => { setchoice('bal') }} className="mb-12">
                  Balance
                </CButton>

              </CCol>
              <CCol xs='auto'>

                <CButton style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'15px'}} color={choice == 'mwl' ? "primary" : "light"} onClick={() => { setchoice('mwl') }} className="mb-12">
                  Mild Weight lose
                </CButton>
              </CCol>
              <CCol xs='auto'>

                <CButton style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'15px'}} color={choice == 'mwg' ? "primary" : "light"} onClick={() => { setchoice('mwg') }} className="mb-12">
                  Mild Weight gain
                </CButton>
              </CCol>
              <CCol xs='auto'>

                <CButton style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'15px'}} color={choice == 'hwl' ? "primary" : "light"} onClick={() => { setchoice('hwl') }} className="mb-12">
                  Heavy Weight lose
                </CButton>
              </CCol>
              <CCol xs='auto'>

                <CButton style={{fontFamily:'sans-serif',fontWeight:'bolder',fontSize:'15px'}} color={choice == 'hwg' ? "primary" : "light"} onClick={() => { setchoice('hwg') }} className="mb-12">
                  Heavy Weight gain
                </CButton>
              </CCol>

            </CForm>}
          </div>
          <Eattime carb={carb} fat={fat} protein={protein} calories={calories} setcarb={setcarb} setfat={setfat} setprotein={setprotein} setcalories={setcalories} />
          {amrval ? <BalCalorie carb={carb} fat={fat} protein={protein} calories={calories} amrval={amrval} /> : <div>Add your datas.</div>}
        </main>
        <a href="#" className="back-to-top"><i className="bx bx-up-arrow-alt"><CIcon icon={cilArrowThickToTop} /></i></a>
        <div id="preloadr"></div>
      </div>
    </div>
  )
}
