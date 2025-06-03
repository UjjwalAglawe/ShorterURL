import { useEffect, useState } from 'react';
import './App.css';
import { InputBox } from './components/InputBox';
import { Navbar } from './components/Navbar';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;


function App() {
  async function ini(){
    const response = await axios.get(`${URL}/`);
    console.log(response.data);
    
  }
  useEffect(()=>{
    ini();
  });


  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white'>
      <Navbar />

      <div className='max-w-3xl mx-auto px-4 py-16 text-center'>
        <h1 className='text-5xl font-extrabold text-amber-400 mb-6'>
           Make Your URLs Short & Sweet!
        </h1>

        <p className='text-gray-300 text-lg mb-10'>
          Paste your long and messy URLs below, and get a sleek short link you can easily share. Built with love and speed.
        </p>

        <InputBox />

        <div className="mt-20 text-gray-400 text-sm">
          <p> Your links are private and stored securely.</p>
        </div>
      </div>

    </div>
  );
}

export default App;
