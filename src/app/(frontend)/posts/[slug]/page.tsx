import { getPayload } from "payload";
import { headers as getHeaders } from 'next/headers.js'



import config from "@/payload.config";
import { Fragment } from "react";
import Image from "next/image";
import { Gutter } from "@payloadcms/ui";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { MyRefreshRouteOnSave } from "./refresh";
import TopBar from "../../components/topBar";
import { Media, Tag, TagsSelect } from "@/payload-types";
interface PageProps {
    params: Promise<{ slug: string }>;
}


export default async function Page({ params: paramsPromise }: PageProps) {
    const { slug } = await paramsPromise
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

    if (!data.published && user?.role !== 'admin' && user?.role !== 'editor') {
        return <div>Page not found</div>
    }


    const media = data?.bannerImage as Media;
    const tags = data?.tags as Tag[];


    return <Fragment>
        <main >
            <TopBar />
            <Gutter className="bg-cbg">
                <MyRefreshRouteOnSave />

                <section className=" max-h-screen flex md:flex-row flex-col justify-center m-5 md:py-0 px-5 mx-auto bg-linear-to-b  to-transparent">


                    <picture  className="
                    m-5 relative wrapper flex mx-auto md:h-[80vh] h-[70vh] max-h-[50%] md:max-h-[90%] max-w-[90ch] w-full min-w-[50vw] rounded-lg " >
                     <Image objectFit="cover"  src={media.url!} alt={media.alt || 'Banner Image'} fill={true} className=" blur-xl opacity-30 rounded-lg" />
                    <Image objectFit="cover"  src={media.url!} alt={media.alt || 'Banner Image'} fill={true} className="rounded-lg" />
                    
                    </picture>
                   <div className="my-auto m-5">

                        <h1 className="text-center">
                            {data?.title}
                        </h1>
                        <div className="text-center text-ctext/70">
                            Écrit par {data?.author}
                            {data?.["published-date"] && ` le ${new Date(data?.['published-date']).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}`}
                        </div>

                        {
                            data?.tags && data?.tags.length > 0 && <div className="text-center mt-2">
                                {tags.map((tag: any, index: number) => (
                                    <span key={tag.id}>
                                        {tag.category}{index < data.tags!.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        }
                    </div>

                </section>



                <div className="max-w-prose mx-auto text-justify p-5">
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


