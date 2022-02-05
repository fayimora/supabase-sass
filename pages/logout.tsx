import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'

type Props = {}

const Logout = (props: Props) => {
  const router = useRouter()
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }
    logout()
  }, [])
  return <div></div>
}

export default Logout
