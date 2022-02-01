import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { fetchLessonById, fetchLessonIds } from '../lib/supabase'
import { Lesson } from '../lib/types'

type Props = {
  lesson: Lesson
}
interface Params extends ParsedUrlQuery {
  id: string
}

const LessonDetails: NextPage<Props> = ({ lesson }) => {
  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { id } = ctx.params!
  const lesson = await fetchLessonById(id)

  return {
    props: {
      lesson,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const lessonIds = await fetchLessonIds()

  const paths = lessonIds.map((id) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default LessonDetails
