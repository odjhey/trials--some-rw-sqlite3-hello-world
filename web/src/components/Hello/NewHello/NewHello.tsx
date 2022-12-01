import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HelloForm from 'src/components/Hello/HelloForm'

import type { CreateHelloInput } from 'types/graphql'

const CREATE_HELLO_MUTATION = gql`
  mutation CreateHelloMutation($input: CreateHelloInput!) {
    createHello(input: $input) {
      id
    }
  }
`

const NewHello = () => {
  const [createHello, { loading, error }] = useMutation(
    CREATE_HELLO_MUTATION,
    {
      onCompleted: () => {
        toast.success('Hello created')
        navigate(routes.hellos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateHelloInput) => {
    createHello({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Hello</h2>
      </header>
      <div className="rw-segment-main">
        <HelloForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHello
