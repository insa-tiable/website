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



export const Posts: CollectionConfig = {
  slug: 'posts',
  disableDuplicate: true,
  disableBulkEdit: true,
  access: {
    read: ({req}) => {
   

      if(req.user?.role === 'admin' || req.user?.role === 'editor') {
        return true
      }
      // if not logged in, only allow published posts
      
        return {
          published: {
            equals: true,
          },
        }
      
    },
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, collectionConfig, locale }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${(data.url)}`,
        
    },

    
  },
  fields: [
  {
      name: 'title',
      type: 'text',
      // Pass the Lexical editor here and override base settings as necessary
      required: true,
      
    },

    {
      name: 'tags', 
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },

    {
      name: 'url',
      type: 'text', 
      hooks: {
        beforeValidate: [formatSlugHook('title')], 
        afterRead: [
          ({ value, originalDoc }) => {
            if (value) return value
            if (originalDoc.title) return titleToUrl(originalDoc.title)
            return value
          },
        ],
      },
    },

    {
      name: 'author',
      type: 'text',
    },

    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'published-date',
      type: 'date',
      admin: {
        condition: (data) => {
          return data.published === true
        },
      },

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
