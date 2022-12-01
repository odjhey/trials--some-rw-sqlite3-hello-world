import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Hello/HellosCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteHelloMutationVariables, FindHellos } from 'types/graphql'

const DELETE_HELLO_MUTATION = gql`
  mutation DeleteHelloMutation($id: Int!) {
    deleteHello(id: $id) {
      id
    }
  }
`

const HellosList = ({ hellos }: FindHellos) => {
  const [deleteHello] = useMutation(DELETE_HELLO_MUTATION, {
    onCompleted: () => {
      toast.success('Hello deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteHelloMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete hello ' + id + '?')) {
      deleteHello({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Message</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {hellos.map((hello) => (
            <tr key={hello.id}>
              <td>{truncate(hello.id)}</td>
              <td>{truncate(hello.message)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.hello({ id: hello.id })}
                    title={'Show hello ' + hello.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editHello({ id: hello.id })}
                    title={'Edit hello ' + hello.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete hello ' + hello.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(hello.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HellosList
