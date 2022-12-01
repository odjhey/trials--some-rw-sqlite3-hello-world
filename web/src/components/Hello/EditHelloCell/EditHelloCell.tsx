import type { EditHelloById, UpdateHelloInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HelloForm from 'src/components/Hello/HelloForm'

export const QUERY = gql`
  query EditHelloById($id: Int!) {
    hello: hello(id: $id) {
      id
      message
    }
  }
`
const UPDATE_HELLO_MUTATION = gql`
  mutation UpdateHelloMutation($id: Int!, $input: UpdateHelloInput!) {
    updateHello(id: $id, input: $input) {
      id
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ hello }: CellSuccessProps<EditHelloById>) => {
  const [updateHello, { loading, error }] = useMutation(
    UPDATE_HELLO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Hello updated')
        navigate(routes.hellos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateHelloInput,
    id: EditHelloById['hello']['id']
  ) => {
    updateHello({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Hello {hello?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <HelloForm hello={hello} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
