import type { Prisma, Hello } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.HelloCreateArgs>({
  hello: {
    one: { data: { message: 'String' } },
    two: { data: { message: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Hello, 'hello'>
