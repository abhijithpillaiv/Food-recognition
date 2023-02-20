import React, { useContext, useState } from 'react'
import './login.css'
import '../fonts/material-icon/css/material-design-iconic-font.min.css'
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { cookie } from '../../context/collection'
import { LoginContext } from '../../context/loginContext'
import Alert from '../../views/pages/alert';
import { port } from '../../context/collection'
function login() {
    // Cookie
    const [, setCookie] = useCookies([cookie]);
    const { setUser } = useContext(LoginContext)


    const [confirm, setconfirm] = useState({isOpen:false})

    const [forgotPass, setforgotPass] = useState(false)
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    const [incorrect, setincorrect] = useState(false)
    const history = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        try {
            console.log('in');
            axios.post(port+'/api', { email: Email, password: Password }).then((resolve) => {
                if (resolve.data.logstatus) {
                    setCookie(cookie, resolve.data._id, { path: '/' });
                    setUser(resolve.data);
                    history('/')
                    window.location.reload();
                }
                else {
                    setincorrect(true)
                }

            })
        } catch (error) {
        }
    }
    const forgotPassHandler = (e) => {
        e.preventDefault()
        try {
            axios.post(port+'/api/forgetPass', {email:Email}).then((resolve) => {
                if (resolve.data===true) {
                    setconfirm({isOpen:true,title:"Action Needed",color:'green',info:true,subtitle:"Please check your email "+Email+" for Confirmation.",onConfirm:()=> { window.location.href = 'https://mail.google.com/mail/u/0/#inbox';setconfirm({...confirm, isOpen:false})}})
                }
                else {
                    setincorrect(true)
                }

            })
        } catch (error) {
        }
    }


    return (
        <div className="main" >
            {forgotPass?
            <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img style={{height:'300px',width:'auto'}} src={require("../img/logo.jpeg")} alt="logo" /></figure>
                        <Link to="/signup" className="signup-image-link">Create an account</Link>

                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Enter your Email</h2>

                        {incorrect ? <p style={{ color: "red", 'paddingBottom': '3px' }}>            Email not found in database</p> : null}

                        <form onSubmit={forgotPassHandler} className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="your_name" placeholder="Email" />
                            </div>

                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Continue" />
                            </div>
                        </form>
                       
                    </div>
                </div>
            </div>
        </section>
        :<section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img style={{height:'300px',width:'auto'}} src={require("../img/logo.jpeg")} alt="logo" /></figure>
                            <Link to="/signup" className="signup-image-link">Create an account</Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Login</h2>

                            {incorrect ? <p style={{ color: "red", 'paddingBottom': '3px' }}>            Incorrect Email or Password</p> : null}

                            <form onSubmit={handleLogin} className="register-form" id="login-form">
                                <div className="form-group">
                                    <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="your_name" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="your_pass" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                    <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>

                                <div className="form-group">
                                    <label style={{cursor:'pointer',color:'blue'}} onClick={()=>setforgotPass(true)} className="label-agree-term"><span><span></span></span>Forgot Password</label>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </section>
            }
                            <Alert confirm={confirm} setconfirm={setconfirm}/>
        </div>

    )
}

export default login
