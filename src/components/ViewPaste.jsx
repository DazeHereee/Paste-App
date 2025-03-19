import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { updateToPastes } from '../redux/pasteSlice';
import { addToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const ViewPaste = () => {
    const {id} = useParams();
    const allPastes = useSelector((state)=> state.paste.pastes);
    const paste = allPastes.filter((p) => p._id === id);
    console.log(paste[0].title);

  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between'>
      <input className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
       type="text"
       placeholder='enter title here'
       value={paste[0].title}
       disabled
       onChange={(e)=>{setTitle(e.target.value)}} 
       />
       {/* <button className='p-2 rounded-2xl mt-2'
       onClick={createPaste}>
        {
            pasteId ? "update My Paste" : "Create My Paste"
        }
       </button> */}
    </div>
    <div className='mt-8'>
        <textarea
        className='rounded-2xl mt-4,
        min-w-[500px] p-4'
        value={paste[0].content}
        disabled
        placeholder='enter content here'
        onChange={(e)=>{setValue(e.target.value)}}
        rows={20}/>
    </div>
    </div>
  )
}

export default ViewPaste;
