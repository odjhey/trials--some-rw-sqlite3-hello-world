
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteHelloMutationVariables, FindHelloById } from 'types/graphql'

const DELETE_HELLO_MUTATION = gql`
  mutation DeleteHelloMutation($id: Int!) {
    deleteHello(id: $id) {
      id
    }
  }
`

interface Props {
  hello: NonNullable<FindHelloById['hello']>
}

const Hello = ({ hello }: Props) => {
  const [deleteHello] = useMutation(DELETE_HELLO_MUTATION, {
    onCompleted: () => {
      toast.success('Hello deleted')
      navigate(routes.hellos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteHelloMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete hello ' + id + '?')) {
      deleteHello({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Hello {hello.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{hello.id}</td>
            </tr><tr>
              <th>Message</th>
              <td>{hello.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editHello({ id: hello.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(hello.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Hello
