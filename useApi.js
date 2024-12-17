import { useState, useEffect } from 'react';

function useApi(endpoint, query='', auto=false) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFecthError = (e) => {
    alert('Error de conexión.  No se pudo completar la solicitud.  Verifique su conexión a internet y, si el problema persiste, contacte al administrador del sistema.');
  }

  const get = async (query='') => {
    setLoading(true);
    try{
      const res = await fetch(endpoint + query);
      const json = await res.json();
      setResponse(json);
    } catch(e){
      handleFecthError(e);
    } finally {
      setLoading(false);
    }
  }

  const post = async (body) => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResponse(json);
    } catch(e){
      handleFecthError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(auto) get(query);
  }, []);

  return { response, loading, get, post };
}

export default useApi;