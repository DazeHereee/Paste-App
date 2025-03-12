import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const Paste = () => {

    const pastes = useSelector((state)=>
    state.paste.pastes);
    const [searchTerm,setSearchTerm]= useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const ShareButtons = ({ url, title }) => {
      return (
        <div>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
    
          <EmailShareButton url={url} title={title}>
            <EmailIcon size={32} round />
          </EmailShareButton>
    
          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round/>
          </WhatsappShareButton>
    
        </div>
      );
    };

    function handleDelete(pasteId){
      dispatch(removeFromPastes(pasteId));
    }

  return (
    <div>
      <input
      className='p-2 rounded-2xl min-w-[600px] mt-5'
       type="search"
       placeholder='search here'
       value={searchTerm}
       onChange={(e)=>{e.target.value}} />
       <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  <div>
                      {paste.title}
                  </div>
                  <div>
                      {paste.content}
                  </div>
                  <div className='flex flex-row gap-4
                  place-content-evenly'>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                        View
                      </a>
                    </button>
                    <button onClick={()=> handleDelete
                      (paste?._id)
                    }>
                      Delete
                    </button>
                    <button onClick={()=>{
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clipboard")
                    }}>
                      Copy
                    </button>
                    <div>
                      <ShareButtons url={`/pastes/${paste?._id}`} title={paste.title}/>
                    </div>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
       </div>
    </div>
  )
}

export default Paste
