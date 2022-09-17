import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import './styles/main.css'
import logoImage from './assets/Logo.svg'
import { GamerBanner } from './components/GamerBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import { CreateModal } from './components/CreateModal'
import axios from 'axios';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export interface Game {
  id: string;
  ttile: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free",
    slides: {
      perView: 7,
      origin: 'auto'
    },
  })


  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt='' className="max-w-[285px]" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui</h1>

      <div ref={ref} className="grid grid-cols-2 gap-4 mt-16 keen-slider">
        {games.map(game => {
          return (
            <GamerBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.ttile}
              adsCount={game._count.ads}
            />

          )

        })}
      </div>


      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <CreateModal />

          </Dialog.Overlay>

        </Dialog.Portal>

      </Dialog.Root>


    </div>



  )
}

