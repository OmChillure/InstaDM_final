"use client"
import React, { useState, useEffect } from 'react'

function Page() {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUsername = window.localStorage.getItem('instagramUsername')
    console.log('Stored username:', storedUsername)
    setUsername(storedUsername)
  }, [])
  
  return (
    <div>
      {username ? <p>Instagram Username: {username}</p> : <p>No username found</p>}
    </div>
  )
}

export default Page