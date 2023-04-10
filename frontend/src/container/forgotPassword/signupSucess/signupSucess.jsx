import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signupSucess.css'
import axios from 'axios'
import { useParams } from 'react-router';
import Alert from '../../../components/alert/index';
import { port } from '../../../context/collection';
import { useCookies } from 'react-cookie';
import {cookie} from '../../../context/collection'

function signupSucess() {
    const {token}=useParams()
    const [, setCookie] = useCookies([cookie]);


    const history = useNavigate()
    const [confirm, setconfirm] = useState({isOpen:false})

    useEffect(() => {
        console.log('in');
      axios.get(port+'/api/addUser/'+token).then((res)=>{
          if(res.data!==false){
              console.log(res.data);
            setconfirm({isOpen:true,title:"Account Added",color:'green',info:true,subtitle:"Your account is sucessfully added.",onConfirm:()=> {setCookie(cookie, res.data, { path: '/' });setconfirm({...confirm, isOpen:false});history('/');window.location.reload()}})
          }else{
            setconfirm({isOpen:true,title:"Error",color:'red',info:true,subtitle:"Error occured while adding account please try again.",onConfirm:()=> {history('/signup');setconfirm({...confirm, isOpen:false})}})
          }
      })
    }, [token])


    return (
            <div className="mainSignup" >
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                               
                                <form  className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text"  name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email"  name="email" id="email" placeholder="Your Email" />

                                    </div>
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="password" id="pass" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="text" name="re_password" id="re_pass" placeholder="Repeat your password" />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                        <label for="agree-term"  className="label-agree-term"><span><span></span></span>I agree all statements in  <Link to='/' className="term-service">Terms of service</Link></label>
                                    </div>
                                    <div className="form-group form-button">
                                         <input type="submit" name="signup" id="signup" className="form-submit" value="Register" /> 

                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src={require("../img/logo.jpeg")} alt="Logo" /></figure>
                                <Link to='/login' className="signup-image-link">I am already member</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Alert confirm={confirm} setconfirm={setconfirm}/>
            </div>
    )
}

export default signupSucess
