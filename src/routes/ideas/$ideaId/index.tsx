import { deleteIdea, fetchIdea } from '@/api/ideas'
import NotFound from '@/components/NotFound'
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from '@tanstack/react-router'

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  })

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  notFoundComponent: NotFound,
  loader: async ({ params, context: { queryClient } }) => {
    try {
      const idea = await queryClient.ensureQueryData(
        ideaQueryOptions(params.ideaId)
      )

      if (!idea) throw notFound()
      return idea
    } catch (error) {
      // If fetchIdea throws an error (e.g., 404 from API), show NotFound page
      throw notFound()
    }
  },
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

  const navigate = useNavigate()

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: '/ideas' })
    },
  })

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want delete this idea?'
    )
    if (confirmDelete) {
      await deleteMutate()
    }
  }

  return (
    <div className='p-4'>
      <Link
        to='/ideas'
        className='text-blue-500 underline block mb-4'
      >
        ← Back to Ideas
      </Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>

      {/* Edit Link */}
      <Link
        to='/ideas/$ideaId/edit'
        params={{ ideaId: idea._id }}
        className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'
      >
        Edit
      </Link>

      {/* Delete Button */}
      <button
        disabled={isPending}
        onClick={handleDelete}
        className='text-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 mt-4 px-4 py-2 rounded transition'
      >
        {isPending ? 'Deleting...' : 'Delete Idea'}
      </button>
    </div>
  )
}
