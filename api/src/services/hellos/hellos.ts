import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const hellos: QueryResolvers['hellos'] = () => {
  return db.hello.findMany()
}

export const hello: QueryResolvers['hello'] = ({ id }) => {
  return db.hello.findUnique({
    where: { id },
  })
}

export const createHello: MutationResolvers['createHello'] = ({ input }) => {
  return db.hello.create({
    data: input,
  })
}

export const updateHello: MutationResolvers['updateHello'] = ({
  id,
  input,
}) => {
  return db.hello.update({
    data: input,
    where: { id },
  })
}

export const deleteHello: MutationResolvers['deleteHello'] = ({ id }) => {
  return db.hello.delete({
    where: { id },
  })
}
