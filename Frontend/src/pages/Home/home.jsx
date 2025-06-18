import React from 'react'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import Food from '../../components/FoodDisplay/Food'
import AppDownload from '../../components/AppDownload/AppDownload'

export default function home() {
  return (
    <div>
      <Header/>
      <Menu/>
      <Food/>
      <AppDownload/>
    </div>
  )
}
