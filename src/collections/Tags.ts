import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'


import titleToUrl, { formatSlugHook } from '@/url-transform'

import { slugField } from 'payload'
import { env } from 'process'



export const Tags: CollectionConfig = {
  slug: 'tags',
  disableDuplicate: true,
  access: {
    read: ({req}) => { return true},
  },
  admin: {
    useAsTitle: 'category',
    
  },
  fields: [
  {
      name: 'category',
      type: 'text',
      // Pass the Lexical editor here and override base settings as necessary
      required: true,
    },

  ],
}
