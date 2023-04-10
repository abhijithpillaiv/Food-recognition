import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
import axios from 'axios'
import { validEmail} from '../regex';
import Alert from '../../../components/alert/index';
import { port } from '../../../context/collection';
function signup() {


    const [confirm, setconfirm] = useState({isOpen:false})


    const [Name, setName] = useState(null)
    const [Password, setPassword] = useState('')
    const [rePassword, setrePassword] = useState('re')
    const [Email, setEmail] = useState(null)
    const [incorrect, setincorrect] = useState(false)
    const [flag, setflag] = useState(false)
    const [emailErr, setEmailErr] = useState(true);
    const [pwdError, setPwdError] = useState(true);
    const [Terms, setTerms] = useState(true)
    const [Phone, setPhone] = useState(null)


    useEffect(() => {
        var repass = document.getElementById('re_pass')
        var email = document.getElementById('email')
        //var pass = document.getElementById('pass')


        if (!validEmail.test(Email)) {
            setEmailErr(true);
            email.classList.add('invalid')
            email.classList.remove('valid')
        }
        else {
            setEmailErr(false);
            email.classList.remove('invalid')
            email.classList.add('valid')
        }

        if (Password !== rePassword) {
            setPwdError(true);
            repass.classList.add('invalid')
            repass.classList.remove('valid')
        }
        else {
            setPwdError(false);
            repass.classList.add('valid')
            repass.classList.remove('invalid')
        }
    }, [Email, Password, rePassword, Terms])

    const submitHandler = (event) => {
        event.preventDefault();
        if (validEmail.test(Email) === true && Password === rePassword && Terms === false) {
            axios.post(port+'/api/signup', { name: Name, email: Email, password: Password,phone:Phone }).then((response) => {
                if (response.data === false) {
                    setincorrect(true)
                }else{
                    setconfirm({isOpen:true,title:"Action Needed",color:'green',info:true,subtitle:"Please check your email "+Email+" for registration.",onConfirm:()=> { window.location.href = 'https://mail.google.com/mail/u/0/#inbox'}})
                    //setconfirm({...confirm, isOpen:false})
                }
    
            })
        }
        else {
            setflag(true)
        }
    }
    return (
            <div className="mainSignup" >
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                {incorrect && <p style={{ color: "red", paddingBottom: "3px" }}>            MailId alredy taken</p> }
                                {flag&& emailErr && <p style={{ color: "red", paddingBottom: "3px" }}>            Email ID incorrect</p> }
                                {flag&& pwdError && <p style={{ color: "red", paddingBottom: "3px" }}>            Password incorrect</p> }
                                
                                <form onSubmit={submitHandler} className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" placeholder="Your Email" />

                                    </div>
                                  
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="pass" placeholder="Password" />
                                    </div>
                                   

                                    <div className="form-group">
                                        <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="text" onChange={(e) => { setrePassword(e.target.value) }} name="re_password" id="re_pass" placeholder="Repeat your password" />
                                    </div>
                                    <div className="form-group">
                                        <input  type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                        <label style={{paddingLeft:"10px"}} for="agree-term" onClick={() => setTerms(!Terms)} className="label-agree-term"><span><span></span></span>I agree all statements in  <Link to='/' className="term-service">Terms of service</Link></label>
                                        {flag&& Terms &&  <p style={{ color: "red", paddingBottom: "3px", }}>Accept Terms and conditions.</p>  }
                                    </div>
                                    <div className="form-group form-button">
                                        {/* {valid ? <input type="submit" name="signup" id="signup" className="form-submit" value="Register" /> : <input onClick={validation} type='button' name="signup" id="signup" className="form-submit" value="Register" />} */}
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

export default signup