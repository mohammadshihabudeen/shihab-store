"use client"
import { useUserContext } from '@/context/UserContext'
import React from 'react'

const NameCard = () => {
    const {user} = useUserContext()
  return (
        <h1 className="text-2xl font-bold">
          Welcome to the Dashboard, {user?.username}!
        </h1>
  )
}

export default NameCard
