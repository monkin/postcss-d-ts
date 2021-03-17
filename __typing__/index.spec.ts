import {launch, run, rfs } from '../test-runner'

const {NODE_ENV} = process.env

//@ts-expect-error
process.env.NODE_ENV = "production"
const launchers = launch()

//@ts-expect-error
afterAll(() => process.env.NODE_ENV = NODE_ENV)

it('bootstrap3', async () => {
  const from = require.resolve("bootstrap3/dist/css/bootstrap.css")
  , localFrom = `${__dirname}/bootstrap3.css`
  , input = rfs(from)

  await run(launchers, {
    from: localFrom,
    input,
    output: false
  })
})

it('bootstrap4', async () => {
  const from = require.resolve("bootstrap4/dist/css/bootstrap.css")
  , localFrom = `${__dirname}/bootstrap4.css`
  , input = rfs(from)

  await run(launchers, {
    from: localFrom,
    input,
    output: false
  })
})

it('material10', async () => {
  const from = require.resolve("material10/dist/material-components-web.css")
  , localFrom = `${__dirname}/material10.css`
  , input = rfs(from)

  await run(launchers, {
    from: localFrom,
    input,
    output: false
  })
})
