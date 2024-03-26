import type { InferGetStaticPropsType, GetStaticProps } from 'next'


async function getData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home(){
  const data = await getData()
 
  return <div>{data.toString()}</div>
}
