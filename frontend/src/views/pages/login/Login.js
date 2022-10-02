import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { port } from '../../../assets/collection';

const Login = () => {
  const [cookies, setCookie] = useCookies(['status']);
  const [cookiesid, setCookieid] = useCookies(['id']);
  const [email, setemail] = useState(null);
  const [pswd, setpswd] = useState(null);
  const [forgot, setforgot] = useState(null);
  const [incorrect, setincorrect] = useState(null);


  const submitHandler = () => {
    axios.post(port+'api/admin' , { 'email': email, 'password': pswd }).then((res) => {
      if (res.data) {
        setCookieid('id',res.data,{path:'/'})
        setCookie('status', true, { path: '/' })
        window.location.reload(false)
      }
      else {
        setincorrect(true)
      }
    })
  }
  const forgotHandler = () => {
    axios.post(port+'api/admin/forgetPass',{'email':email}).then((res)=>{
      window.alert("mail sent successfully")
    })
  }
  return forgot?
        <div>
      < div className = " min-vh-100 d-flex flex-row align-items-center" >
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Forgot Password</h1>
                  {/* <p className="text-medium-emphasis">Sign In to your account</p> */}
                  <p>Enter your provided email.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText >
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={(e) => setemail(e.target.value)} placeholder="email" autoComplete="username" />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton onClick={forgotHandler} color="primary" className="px-4">
                        Submit
                      </CButton>
                    </CCol>

                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
    </div >
    </div >
      : <div className=" min-vh-100 d-flex flex-row align-items-center">
  <CContainer>
    <CRow className="justify-content-center">
      <CCol md={8}>
        <CCardGroup>
          <CCard className="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                {incorrect ? <p style={{ color: 'red' }}>Invailid username or password.</p> : null}
                <CInputGroup className="mb-3">
                  <CInputGroupText >
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput onChange={(e) => setemail(e.target.value)} placeholder="Username" autoComplete="username" />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText >
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput onChange={(e) => setpswd(e.target.value)}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton onClick={submitHandler} color="primary" className="px-4">
                      Login
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="text-right">
                    <CButton onClick={()=>setforgot(true)} color="link" className="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</div>
}

export default Login
