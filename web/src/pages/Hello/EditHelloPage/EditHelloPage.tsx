import EditHelloCell from 'src/components/Hello/EditHelloCell'

type HelloPageProps = {
  id: number
}

const EditHelloPage = ({ id }: HelloPageProps) => {
  return <EditHelloCell id={id} />
}

export default EditHelloPage
