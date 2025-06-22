import React from 'react'
import {useNavigate} from 'react-router-dom'

function BlogCard({blog}) {

  const {title, category, subTitle, image, _id } = blog;
  console.log({"blog":blog
  })
  const navigate = useNavigate()

  return ( 

    <div onClick={()=>navigate(`/blog/${_id}`)}>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-3 px-3 py-1 inline-block bg-primary/20 
      rounded-full text-primary text-xs'>{category[0].name}</span>
      <div className='p-3'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600'
        //  dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}
         >{subTitle.slice(0,80)}</p>
      </div>
    </div>
  )
}

export default BlogCard