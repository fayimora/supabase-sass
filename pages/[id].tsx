import { GetStaticPaths } from 'next'
import React from 'react'
import { Lesson } from '.'
import { supabase } from '../lib/supabase'

type Props = {
  lesson: Lesson
}

export default function LessonDetails({ lesson }: Props) {
  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const { data: lessons } = await supabase.from('lessons').select('id')

  const paths = lessons?.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { id } }) {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  return {
    props: {
      lesson,
    },
  }
}
