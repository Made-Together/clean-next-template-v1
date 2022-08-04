import React from "react";

export default function TailwindUnpurge() {
	return (
		<div
			data-unpurge-classes={`
        md:text-left md:text-center md:text-right
        lg:text-left lg:text-center lg:text-right

        max-w-xxs max-w-xs max-w-sm max-w-md max-w-md max-w-lg max-w-xl max-w-2xl max-w-3xl max-w-4xl max-w-5xl max-w-6xl
        md:max-w-xxs md:max-w-xs md:max-w-sm md:max-w-md md:max-w-md md:max-w-lg md:max-w-xl md:max-w-2xl md:max-w-3xl md:max-w-4xl md:max-w-5xl md:max-w-6xl

        w-1/2 w-1/3 w-1/4 w-1/5 w-1/6
        md:w-1/2 md:w-1/3 md:w-1/4 md:w-1/5 md:w-1/6

        grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8
        md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8
        lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8

        col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
        md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12

        bg-transparent bg-lighter-purple-2 bg-current bg-black bg-dark-grey bg-grey bg-white bg-dark-green bg-light-blue bg-lighter-blue bg-beige bg-light-beige bg-orange bg-yellow bg-light-yellow bg-lighter-yellow bg-purple bg-light-purple bg-lighter-purple bg-pink bg-lime bg-light-lime bg-lighter-lime bg-mid-grey
        text-transparent text-current text-black text-dark-grey text-grey text-white text-dark-green text-light-blue text-lighter-blue text-beige text-light-beige text-orange text-yellow text-light-yellow text-lighter-yellow text-purple text-light-purple text-lighter-purple text-pink text-light-lime text-mid-grey text-6xl md:text-8xl self-center md:self-start

        !opacity-100
      `}
		/>
	);
}
