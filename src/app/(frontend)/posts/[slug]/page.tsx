import { getPayload } from "payload";
import { headers as getHeaders } from 'next/headers.js'


import config from "@/payload.config";
import { Fragment } from "react";
import { Gutter } from "@payloadcms/ui";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { MyRefreshRouteOnSave } from "./refresh";
interface PageProps {
    params: Promise<{ slug: string }>;
}


export default async function Page ({params: paramsPromise}: PageProps) {
    const { slug  } = await paramsPromise
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })


    const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 1,
    where: {
      url: {
        equals: slug,
      },
    },
  })




  if (!pageRes?.docs?.length) {
    return <div>Page not found</div>
  }


  const data = pageRes?.docs?.[0];

  if(!data.published && user?.role !== 'admin' && user?.role !== 'editor') {
    return <div>Page not found</div>
    }

  return <Fragment>
      <main >
        <Gutter>
            <MyRefreshRouteOnSave/>
            <h1>{slug}</h1>
            <div> 
                {data?.title}
            </div>
            <div>
                <RichText
                    data={data?.content}
                />
            </div>
        </Gutter>
      </main>
    </Fragment>

}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pagesRes = await payload.find({
    collection: 'posts',
    depth: 0,
    draft: true,
    limit: 100,
    where: {
        published: {
            equals: true,
        },
    }
  })

  const pages = pagesRes?.docs

  return pages.map(({ url }) =>
    ({
        slug: url as string,
    })
  )
}


