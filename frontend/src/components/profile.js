import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function ProfileStatistics({user}) {
  return (
    <div  style={{backgroundColor: '#eee' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center align-items-center ">
          <MDBCol md="12" xl="12">
            <MDBCard >
             {user? <MDBCardBody className="text-center">
                <div className="mb-2 pb-2">
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle" fluid style={{ width: '70px' }} />
                </div>
                <MDBTypography style={{fontSize:'10px'}} tag="h4">{user.name}</MDBTypography>
                <MDBCardText style={{fontSize:'10px'}} className="text-muted ">
                  Recipe <span >|</span> <a href="#!">logout</a>
                </MDBCardText>
                
                <MDBBtn rounded size="sm">
                <Link to='/account' style={{ fontWeight: 'bold', textDecoration: 'none' }}>Account</Link>
                </MDBBtn>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  
                  <div className="px-3">
                    <MDBCardText className="mb-1 h10">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Calorie intake(Week)</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h10">4751</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Calorie intake(Today)</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>:
              <MDBCardBody className="text-center">
              <div className="mb-2 pb-2">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  className="rounded-circle" fluid style={{ width: '70px' }} />
              </div>
              <MDBBtn  rounded size="sm">
              <Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/login">Signin</Link>
              </MDBBtn>
            </MDBCardBody>}

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}