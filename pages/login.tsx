import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'

type Props = {}

const Login = (props: Props) => {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.signIn({ provider: 'github' })
  }, [])
  return <p>Logging in...</p>
}

export default Login
