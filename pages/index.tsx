import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Articles from './Articles'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'


type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  console.log("morePosts", morePosts);
  return (
    <>
      {/* <Layout> */}
        <Head>
          <title>{`Home - ${CMS_NAME}`}</title>
        </Head>
        <Navbar />
        
        <div>
          {/* <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0">

          </div> */}
          <div className="bg-white"></div>
          <div className="bg-white w-full">
              <div className="flex-col w-full flex ml-10 mr-10">
                  <div className="flex w-auto bg-gray-100">
                      <Sidebar />
                      <div  className="flex-col w-full ml-10 mr-10">
                      <Articles listArticles={[]} />
                      </div>
                  </div>
              </div>
          </div>
      </div >
        {/* <Container> */}
          {/* <Intro /> */}          
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        {/* </Container> */}
      {/* </Layout> */}
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
