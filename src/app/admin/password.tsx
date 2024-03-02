'use client';
import { useEffect } from "react"

export default function Password(){

  useEffect(() => {
    const password = prompt("Enter password")
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert("You are not authorized to view this page")
      window.location.href = "/"
    } 
  }, [])
  
  return (
    <div>
      
    </div>
  )
}