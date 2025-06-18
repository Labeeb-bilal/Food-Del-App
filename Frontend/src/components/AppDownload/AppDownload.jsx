import React from 'react'
import googlePlaypic from '../../assets/ToConvertPng.png'
import AppStorepic from '../../assets/AppStore.png'
import './AppDownload.css'


export default function AppDownload() {
  return (
        <div className='app-download'>
        <p>For Better Experience Download <br/>TomaTo App</p>
        <div className='app-download-platforms'>
            <img src={AppStorepic} alt="App Store" />
            <img src={googlePlaypic} alt="Google Play" />
        </div>
        </div>

  )
}
