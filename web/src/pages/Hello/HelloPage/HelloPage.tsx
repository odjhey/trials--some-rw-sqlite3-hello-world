import HelloCell from 'src/components/Hello/HelloCell'

type HelloPageProps = {
  id: number
}

const HelloPage = ({ id }: HelloPageProps) => {
  return <HelloCell id={id} />
}

export default HelloPage
