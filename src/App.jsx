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
          const url = res.endpoints[0].public_url;
          setHttpsUrl(url);
          window.location.href = url;
        }
      });
  }, []);

  return (
    <div>
      <img src={mgwLogo} />
      <h2 className="mt-1">MUGIWARA WIFI</h2>
      <h4>CONNECT EVERYWHERE</h4>
      {msg === '' && <a href={httpsUrl}>Redirect to NGROK link</a>}

      <p className="error">{msg}</p>
    </div>
  );
}

export default App;
