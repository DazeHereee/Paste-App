import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { updateToPastes } from '../redux/pasteSlice';
import { addToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const ViewPaste = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch();
    const allPastes = useSelector((state)=> state.paste.pastes);
    const {id} = useParams();
    const paste = allPastes.filter((p) => p._id === id[0]);

    useEffect(()=>{
        if(pasteId){
            const paste = allPastes.find((p)=> p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    },[pasteId])

    function createPaste(){
        const paste = {
            title:title,
            content:value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt:new Date().toISOString(),

        }

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
        
    }

  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between'>
      <input className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
       type="text"
       placeholder='enter title here'
       disabled
       value={paste.title}
       onChange={(e)=>{setTitle(e.target.value)}} 
       />
       <button className='p-2 rounded-2xl mt-2'
       onClick={createPaste}>
        {
            pasteId ? "updated My Paste" : "Create My Paste"
        }
       </button>
    </div>
    <div>
        <textarea
        className='rounded-2xl mt-4,
        min-w-[500px] p-4'
        value={paste.content}
        disabled
        placeholder='enter content here'
        onChange={(e)=>{setValue(e.target.value)}}
        rows={20}/>
    </div>
    </div>
  )
}

export default ViewPaste;
