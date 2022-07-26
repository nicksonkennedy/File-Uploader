import React,{useState} from 'react'
import axios from 'axios'
import { Notification } from './Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';
import ProgressBar from './ProgressBar';
import { Divider } from 'antd';



const key = 'updatable';
const FileUploads = () => {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('No File Selected')
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)

    const onChange =  e =>{
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmit = async e =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post(`http://localhost:5000/upload`, formData , {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: ProgressEvent =>{
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                    //clear percentage
                    setTimeout(() =>setUploadPercentage(0) ,10000);
                }
            })
            const {fileName, filePath} = res.data 
            setUploadedFile({fileName, filePath})
            //message after upload
            setMessage('File Uploaded Succesfully')
            setFileName('')
        
        } catch (error) {
            if(error.response.status === 500){
                setErrorMessage('There was a problem with server')
                setUploadPercentage('')
            }else{
                setErrorMessage(error.response.data.msg)
                setUploadPercentage('')
            }
        }
    }

  return (
    <>
        <div className='mb-5 '>
           <h1 className='text-center'> <FontAwesomeIcon icon={faFileAlt}/> React File Uploader</h1>
        </div>


        <form onSubmit={onSubmit}>
            {message ? <Notification msg={message} /> : null}
            {errorMessage ? <ErrorMessage errorMsg ={errorMessage} /> : null}
        <div className="custom-file  ">
        <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
  <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
</div>
        {file && <ProgressBar percentage={uploadPercentage}/>}
        <input type='submit' value='Upload'  className='btn btn-info btn-block mt-4' />
        </form>

        <Divider className='mt-5'>Couple Photos</Divider>

        {uploadedFile ? <div className='row mt-5'>
           <div className='col-md-6 m-auto'>
               <img style={{width:'100%'}}  src={uploadedFile.filePath} alt='' />
               <h6 className='text-center'>{uploadedFile.fileName}</h6>
           </div>
        </div>: null}

    </>
  )
}

export default FileUploads