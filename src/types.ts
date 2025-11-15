export type Idea = {
  _id: string
  title: string
  summary: string
  description: string
  tags: string[]
  createdAt: string
}

export type NewIdea = Omit<Idea, '_id' | 'createdAt'>
