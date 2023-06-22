import { useEffect, useState } from 'react';
import mgwLogo from './assets/mgw.png';
import './App.css';

const NGROK_API_URL = import.meta.env.VITE_NGROK_API_URL;
const NGROK_API_KEY = import.meta.env.VITE_NGROK_API_KEY;
const NGROK_VERSION = import.meta.env.VITE_NGROK_VERSION;

function App() {
  const [httpsUrl, setHttpsUrl] = useState('');
  const [msg, setMsg] = useState('');

  const requestOption = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${NGROK_API_KEY}`,
      'Ngrok-Version': NGROK_VERSION,
    },
  };

  useEffect(() => {
    fetch(NGROK_API_URL, requestOption)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.status_code >= 100) {
          console.log(res.msg);
          setMsg(res.msg);
        } else {
          setHttpsUrl(res.endpoints[1].public_url);
          window.location.href = res.endpoints[1].public_url;
        }
      });
  }, []);

  return (
    <div className="mt-5">
      <img src={mgwLogo} />
      <h1 className="mt-1">MUGIWARA WIFI</h1>
      <h2>CONNECT EVERYWHERE</h2>
      {msg === '' && <a href={httpsUrl}>Redirect to NGROK link</a>}

      <p className="error">{msg}</p>
    </div>
  );
}

export default App;
