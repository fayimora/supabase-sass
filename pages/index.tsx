import { GetStaticProps } from 'next'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export type Lesson = {
  id: number
  title: string
  description: string
}

type Props = {
  lessons: Lesson[]
}

export default function Home({ lessons }: Props) {
  return (
    <div className="mx-auto my-16 w-full max-w-3xl px-2">
      <h1>Working...</h1>
      {lessons.map((lesson) => {
        return (
          <Link key={lesson.id} href={`/${lesson.id}`}>
            <a className="mb-4 flex h-40 rounded p-8 text-xl shadow">
              {lesson.title}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: lessons } = await supabase.from('lessons').select('*')

  return {
    props: {
      lessons,
    },
  }
}
