import { type SchemaTypeDefinition } from 'sanity'
import { portfolioItemType } from './portfolioItemType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItemType],
}
