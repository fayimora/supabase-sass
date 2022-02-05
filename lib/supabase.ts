import { createClient } from '@supabase/supabase-js'
import { Lesson } from './types'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export const getCurrentUser = () => supabase.auth.user()

export async function fetchLessons(): Promise<Lesson[]> {
  const { data } = await supabase.from('lessons').select('*')
  return data as Lesson[]
}

export async function fetchLessonIds(): Promise<number[]> {
  const lessons = await fetchLessons()
  return lessons.map((l) => l.id)
}

export async function fetchLessonById(id: string): Promise<Lesson> {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()
  return lesson as Lesson
}
