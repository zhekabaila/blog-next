export interface User {
  id: number
  username: string
  email: string
  password: string
  gender: string
  role: string
  article?: Article[]
}

export interface Article {
  id: number
  title: string
  content: string
  published: boolean
  author: User
  authorId: number
  comments?: Comments[]
  createdAt: string
  updatedAt: string
}

export interface Comments {
  id: number
  content: string
  article: Article
  articleId: number
  createdAt: string
  updatedAt: string
}
