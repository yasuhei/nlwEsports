import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as toggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/input'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Form } from './Form'


interface Game {
    id: string;
    title: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Nome invalido'),
    yearsPlaying: yup.number().required(),
    discord: yup.string().required(),
    weekDays: yup.string().required(),
    hourStart: yup.string().required(),
    hourEnd: yup.string().required(),
    useVoiceChannel: yup.boolean().required()
})


export function CreateModal() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDAys] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)


    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])



    // onSubmit={handleCreateAd}
    async function handleCreateAd(event: FormEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        console.log(handleCreateAd, 'chamou')
        const data = Object.fromEntries(formData)
        if (!data.name) {
            return
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Anúncio criado com sucesso')
        } catch (error) {
            console.log(error)
            alert('Erro ao criar o anúncio')

        }
    }

    return (
        <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
            <Dialog.Title className='text-3xl font-black' >Publique um anúncio</Dialog.Title>
            <Form onSubmit={handleCreateAd}  >
                <div className='mt-8 flex flex-col gap-4'>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select
                            name='game'
                            id="game"
                            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                            defaultValue=''

                        >
                            <option disabled   >
                                Selecione o game que deseja jogar
                            </option>

                            {games.map(game => {
                                return (
                                    <option
                                        key={game.id}
                                        value={game.id}
                                    >
                                        {game.title}

                                    </option>
                                )

                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                        <Input
                            name='name'
                            type="text"
                            id='name'
                            placeholder='Como te chamam dentro do jogo?'
                            className='bg-zinc-900 '
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quanto anos</label>
                            <Input
                                type="text"
                                id='yearsPlaying'
                                placeholder='Tudo bem ser ZERO'
                                name='yearsPlaying'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord</label>
                            <Input
                                type="text"
                                id='discord'
                                placeholder='Usuario#0000'
                                name='discord'
                            />
                        </div>
                    </div>


                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <toggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                onValueChange={setWeekDAys}
                                value={weekDays}
                            >
                                <toggleGroup.Item
                                    value='0'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Domingo'>D</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='1'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Segunda' >S</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='2'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Terça'>T</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='3'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quarta'>Q</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='4'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Quinta'>Q</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='5'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sexta'>S</toggleGroup.Item>
                                <toggleGroup.Item
                                    value='6'
                                    className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    title='Sábado'>S</toggleGroup.Item>
                            </toggleGroup.Root>
                        </div>

                        <div className='flex flex-col gap-2 flex-1' >
                            <label htmlFor="hourStart">Qual horário do dia?</label>


                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" id='hourStart' placeholder='De' name='hourStart' />
                                <Input type="time" id='hourEnd' placeholder='Até' name='hourEnd' />
                            </div>

                        </div>
                    </div>




                    <label className='mt-2 flex gap-2 text-sm items-center'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }

                            }>
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>

                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            type='button'
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 flex items-center gap-3  px-5 h-12 rounded-md font-semibold hover:bg-violet-600'
                            type='submit'>
                            <GameController size={24} />
                            Encontrar duo</button>
                    </footer>
                </div>
            </Form>

        </Dialog.Content>
    )
}
