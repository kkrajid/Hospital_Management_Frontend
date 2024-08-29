import React from 'react'
import landing_im from '../assets/heroo.png'
import { AiOutlineSearch } from 'react-icons/ai'
export const Hero = () => {
    return (
        <div className='w-full bg-white '>
            <div className='w-full h-full bg-[#345ECE]  p-4 '>
                <div className='w-full h-full'>
                    <div className='md:w-5/6 h-full grid md:grid-cols-2 m-auto '>
                        <div className='  md:h-[600px] h-[400px]  '>
                            <div className='w-full h-2/6  '>

                            </div>
                            <div className='flex flex-col justify-start gap-4 h-4/6 '>
                                <p className='py-2 text-2xl text-white font-medium '>We Provid All Health Care Solution</p>
                                <h1 className='leading-[72px] py-4 md:text-6xl text-5xl font-semibold '><span className='text-white'>Take Care </span>To Of Your Health And It Will Take Care Of You </h1>
                                <p className='py-4 text-lg text-white'> Far far away,behind the word mountains,far from the countries vokalia and consonantia,there live the blind text</p>

                            </div>
                        </div>
                        <div className=' md:h-[600px]  h-[400px] flex justify-end'>
                            <img className='order-first md:order-last md:ml-5' src={landing_im} alt="heroimag" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
