'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'
import image1 from '../../public/garden1.png'
import image2 from '../../public/garden2.png'
import image3 from '../../public/garden3.png'
import image4 from '../../public/garden4.png'
import image5 from '../../public/garden5.png'
import image6 from '../../public/garden6.png'

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true}, [Autoplay({ delay: 6000 })])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla flex flex-row gap-2">
        <button className="embla__prev" onClick={scrollPrev}>
            Prev
        </button>

        <div className="embla__viewport mx-auto  mt-12" ref={emblaRef}>
            <div className="embla__container h-full">
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image1} width={300} height={300} alt="garden image"/>
                </div>
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image2} width={300} height={300} alt="garden image"/>
                </div>
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image3} width={300} height={300} alt="garden image"/>
                </div>
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image4} width={300} height={300} alt="garden image"/>
                </div>
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image5} width={300} height={300} alt="garden image"/>
                </div>
                <div className="embla__slide flex items-center justify-center">
                    <Image src={image6} width={300} height={300} alt="garden image"/>
                </div>
            </div>
        </div>

        <button className="embla__next" onClick={scrollNext}>
            Next
        </button>
    </div>
    
  )
}
