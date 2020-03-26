import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  endpoint: process.env.REACT_APP_GRAPHQL_API,
}
