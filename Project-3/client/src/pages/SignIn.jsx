import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SignIn() {
    
  const [Data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const handleChange = (e) =>{
    setData({
      ...Data,
    [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
    setLoading(true);
    const res = await fetch("/api/auth/signup",
      {
        method:'POST',
        headers: {
          'Content-Type' : "application/json",

        },
        body: JSON.stringify(Data)
      }
    );
    const data = res.json()
    if (data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);

    }catch(error){
      setLoading(false);
      setError(error.message);

    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-9'>Sign In</h1>
      <form onChange={handleChange} onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type = "email" placeholder='email' className='border p-3 rounded-lg ' id = 'email'/>
        
        <input type = "password" placeholder='password' className='border p-3 rounded-lg ' id = 'password'/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>
        {loading ? 'loading..' : "Sign In"}
        </button>
        </form>

        <div className='flex gap:2 mt-5'>
          <p>Don't have an Account?</p>
          <Link to = {"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
     
  )
}
