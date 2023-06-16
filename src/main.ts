import z from 'zod'
import Ajv from 'ajv'
import typia from 'typia'
import Benchmark from 'benchmark'

type User = {
  name: string
  age: number
  projects: Array<{
    name: string
    stars: number
    isPublic: boolean
  }>
}
const typiaValidate = typia.createValidate<User>()

const ajvValidate = new (Ajv as any)({allErrors: true}).compile({
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "projects": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "stars": {
            "type": "number"
          },
          "isPublic": {
            "type": "boolean"
          }
        },
        "required": ["name", "stars", "isPublic"]
      }
    }
  },
  "required": ["name", "age", "projects"]
})

const zodSchema = z.object({
  name: z.string(),
  age: z.number(),
  projects: z.array(
    z.object({
      name: z.string(),
      stars: z.number(),
      isPublic: z.boolean()
    })
  )
})

function getData(): User {
  return {
    name: 'username',
    age: 101,
    projects: [
      {name: 'foo', stars: 142, isPublic: true},
      {name: 'bar', stars: 1, isPublic: true},
      {name: 'baz', stars: 12, isPublic: false},
      {name: 'lorem', stars: 14, isPublic: true},
      {name: 'ipsum', stars: 42, isPublic: false},
    ]
  }
}

const suite = new Benchmark.Suite()
suite
  .add('zod', () => zodSchema.parse(getData()))
  .add('typia', () => typiaValidate(getData()))
  .add('ajv', () => ajvValidate(getData()))
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run()