import type { FindHellos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Hellos from 'src/components/Hello/Hellos'

export const QUERY = gql`
  query FindHellos {
    hellos {
      id
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No hellos yet. '}
      <Link
        to={routes.newHello()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ hellos }: CellSuccessProps<FindHellos>) => {
  return <Hellos hellos={hellos} />
}
