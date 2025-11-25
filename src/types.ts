export type Idea = {
  _id: string
  title: string
  summary: string
  description: string
  tags: string[]
  createdAt: string
  user: string
}

export type NewIdea = Omit<Idea, '_id' | 'createdAt'>

export type RegisterUserType = {
  name: string
  email: string
  password: string
}

export type LoginUserType = Omit<RegisterUserType, 'name'>
