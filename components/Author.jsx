import React from 'react';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20 flex flex-col items-center">

    <div className='pr-28'>
      <div className="absolute -top-14 h-28 w-28 overflow-hidden rounded-full">
        <img
          unoptimized
          alt={author.name}
          src={author.photo.url}
          className="object-cover h-full w-full"
        />
      </div>
    </div>

    <div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>

  </div>
);

export default Author;