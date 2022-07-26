import React from 'react'
import { Alert } from 'antd';

export const Notification = ({msg}) => {
    const onClose = (e) => {
        console.log('');
      };
  return (
    <div className='mb-3'>
        <Alert
      message={msg}
      type="success"
      closable
      banner={true}
      onClose={onClose}
    />
    </div>
  )
}
