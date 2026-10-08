'use client';
import {useEffect} from 'react';
export default function AnalyticsTracker(){useEffect(()=>{const key='flores_visitor';let visitor=localStorage.getItem(key);if(!visitor){visitor=crypto.randomUUID();localStorage.setItem(key,visitor)}fetch('/api/track',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({path:location.pathname,visitor_id:visitor,referrer:document.referrer||null})}).catch(()=>{});},[]);return null}
