import React from 'react'
import { Progress } from 'antd';
const ProgressBar = ({percentage}) => {
  return (
    <div>
        
        <Progress  percent={percentage}/>
    </div>
  )
}

export default ProgressBar