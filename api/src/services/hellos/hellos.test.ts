import type { Hello } from '@prisma/client'

import { hellos, hello, createHello, updateHello, deleteHello } from './hellos'
import type { StandardScenario } from './hellos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('hellos', () => {
  scenario('returns all hellos', async (scenario: StandardScenario) => {
    const result = await hellos()

    expect(result.length).toEqual(Object.keys(scenario.hello).length)
  })

  scenario('returns a single hello', async (scenario: StandardScenario) => {
    const result = await hello({ id: scenario.hello.one.id })

    expect(result).toEqual(scenario.hello.one)
  })

  scenario('creates a hello', async () => {
    const result = await createHello({
      input: { message: 'String' },
    })

    expect(result.message).toEqual('String')
  })

  scenario('updates a hello', async (scenario: StandardScenario) => {
    const original = (await hello({ id: scenario.hello.one.id })) as Hello
    const result = await updateHello({
      id: original.id,
      input: { message: 'String2' },
    })

    expect(result.message).toEqual('String2')
  })

  scenario('deletes a hello', async (scenario: StandardScenario) => {
    const original = (await deleteHello({ id: scenario.hello.one.id })) as Hello
    const result = await hello({ id: original.id })

    expect(result).toEqual(null)
  })
})
