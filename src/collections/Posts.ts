import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'


import { slugField } from 'payload'



export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
  {
      name: 'title',
      type: 'text',
      // Pass the Lexical editor here and override base settings as necessary
      required: true,
    },
  
    {
      name: 'content',
      type: 'richText',
      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
            return [...rootFeatures,
            InlineToolbarFeature(),
            FixedToolbarFeature(),
            HeadingFeature({
              enabledHeadingSizes: ['h2', 'h3', 'h4'],
            }),
            HorizontalRuleFeature(),
          ]},
      }),
    },
  ],
}
