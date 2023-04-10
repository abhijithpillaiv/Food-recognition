import React from 'react'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function logout() {
    const [cookies, setCookie,removeCookie] = useCookies(['status']);
    const [cookiesid, setCookieid,removeCookieid] = useCookies(['id']);

    const navigate = useNavigate()

    useEffect(() => {
        removeCookie('status')
        removeCookieid('id')
        navigate('/')
        window.location.reload(false)
    }, []);
  return<div>Logging Out...</div>
}
