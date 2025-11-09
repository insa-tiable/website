import { headers as getHeaders } from 'next/headers.js'

import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  // Get all posts (example of using Payload in a frontend page)
  const posts = await payload.find({
    collection: 'posts',
    where: {
      published: {
        equals: true,
      },
    }
  });

  let postsList: {
    name: string, 
    url: string }[] = [];

  for (const post of posts.docs) {
    postsList.push(
      {name: post.title || 'No Title',
        url: post.url || '#'}
    );
  }

  return (
    <div className="home">
      <div className="content">
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>

                 
        </div>
   <div className="posts">
            <h2>Posts</h2>
            {postsList.length > 0 ? (
              <ul>
                {postsList.map((title, index) => (
                  <li key={index}>
                    <a href={`/posts/${title.url}`}>{title.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts found.</p>
            )}
          </div>


      </div>
      
    </div>
  )
}
