import { useState } from 'react';
import mgwLogo from './assets/mgw.png';
import './App.css';

const NGROK_API_URL = import.meta.env.VITE_NGROK_API_URL;
const NGROK_API_KEY1 = import.meta.env.VITE_NGROK_API_KEY1;
const NGROK_API_KEY2 = import.meta.env.VITE_NGROK_API_KEY2;
const NGROK_VERSION = import.meta.env.VITE_NGROK_VERSION;

function App() {
  const [httpsUrl, setHttpsUrl] = useState('');
  const [msg, setMsg] = useState('');

  const handleGetUrl = (key) => {
    console.log(key);

    const requestOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${key}`,
        'Ngrok-Version': NGROK_VERSION,
      },
    };

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
          console.log(url);
          window.location.href = url;
        }
      });
  };

  return (
    <div>
      <img src={mgwLogo} />
      <h2 className="mt-1">MUGIWARA WIFI</h2>
      <h4>CONNECT EVERYWHERE</h4>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={() => handleGetUrl(NGROK_API_KEY1)} type="button">
          MIKHMON
        </button>
        <button
          onClick={() => handleGetUrl(NGROK_API_KEY2)}
          type="button"
          style={{ backgroundColor: 'rgba(13, 202, 240, 1)', color: '#fff' }}
        >
          MGW-WIFI
        </button>
      </div>

      {httpsUrl != '' && (
        <div className="mt-1">
          <a href={httpsUrl}>Redirect to NGROK link</a>
        </div>
      )}

      <p className="error">{msg}</p>
    </div>
  );
}

export default App;
