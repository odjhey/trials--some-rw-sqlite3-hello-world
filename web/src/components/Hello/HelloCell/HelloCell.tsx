import type { FindHelloById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Hello from 'src/components/Hello/Hello'

export const QUERY = gql`
  query FindHelloById($id: Int!) {
    hello: hello(id: $id) {
      id
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Hello not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ hello }: CellSuccessProps<FindHelloById>) => {
  return <Hello hello={hello} />
}
