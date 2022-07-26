import React from 'react'
import { Alert } from 'antd';
const ErrorMessage = ({errorMsg}) => {
    const onClose = (e) => {
        console.log('');
      };
  return (
    <div className='mb-3'>
        <Alert
      message={errorMsg}
      type="error"
      closable
      banner={true}
      onClose={onClose}
    />
    </div>
  )
}

export default ErrorMessage