import React from 'react'
import landing_im from '../assets/heroo.png'
import { AiOutlineSearch } from 'react-icons/ai'
export const Hero = () => {
    return (
        <div className='w-full bg-white py-24'>
            <div className="mx-5 md:max-w-[1480px] md:ml-20  max-w-[600px] m-auto  grid md:grid-cols-2">
                <div className='flex flex-col justify-start gap-4'>
                    <p className='py-2 text-2xl text-[#355FCF] font-medium '>We Provid All Health Care Solution</p>
                    <h1 className='leading-[72px] py-4 md:text-6xl text-5xl font-semibold '><span className='text-[#355FCF]'>Take Care </span>To Of Your Health And It Will Take Care Of You </h1>
                    <p className='py-4 text-lg text-gray-600'> Far far away,behind the word mountains,far from the countries vokalia and consonantia,there live the blind text</p>
                    <form className='max-w-[700px] py-4 shadow-lg rounded-md flex justify-between ' >
                        {/* <input
                            type="text"
                            className='bg-white mx-3'
                            placeholder='What do want '
                        />
                        <button>
                            <AiOutlineSearch
                            size={20}
                            className='icon'
                            style={{color:'#000',marginRight:'20px'}}
                            />
                        </button> */}
                    </form>
                </div>
                <img className='order-first md:order-last md:ml-5' src={landing_im} alt="heroimag" />

            </div>
        </div>
    )
}
