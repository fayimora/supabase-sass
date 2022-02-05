import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { getCurrentUser, fetchLessons } from '../lib/supabase'
import { Lesson } from '../lib/types'

type Props = {
  lessons: Lesson[]
}

const Home: NextPage<Props> = ({ lessons }) => {
  const user = getCurrentUser()
  const userName = user?.user_metadata.full_name

  return (
    <div className="mx-auto my-16 w-full max-w-3xl px-2">
      <h1 className="mb-4 text-2xl">Lessons</h1>
      {userName && <h3>{userName + ' is logged in'}</h3>}
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

export const getStaticProps: GetStaticProps = async () => {
  const lessons = await fetchLessons()

  return {
    props: {
      lessons,
    },
  }
}

export default Home
