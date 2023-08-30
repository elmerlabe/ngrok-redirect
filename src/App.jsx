import { useEffect, useState } from 'react';
import camLogo from './assets/Security-Camera-icon.png';
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
        //console.log(res);
        if (res.status_code >= 100) {
          setMsg(res.msg);
        } else {
          const publicUrl = res.endpoints[0].public_url;
          setHttpsUrl(publicUrl);
          window.location.replace(publicUrl);
        }
      });
  }, []);

  return (
    <div>
      <img src={camLogo} />
      <h2 className="mt-1">RASPBERRY PI CAM</h2>
      <h4>ROOM 102</h4>
      {msg === '' && <a href={httpsUrl}>Redirect to NGROK link</a>}

      <p className="error">{msg}</p>
    </div>
  );
}

export default App;
