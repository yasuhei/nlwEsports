import { InputHTMLAttributes } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'


type InputProps = Omit<UseControllerProps, 'control | shouldUnregister '> & InputHTMLAttributes<HTMLInputElement>

export function Input({ name, rules, ...rest }: InputProps) {

    const { control } = useFormContext()

    return (

        <Controller control={control} name={name} rules={rules} render={({ field, fieldState: { error } }) => {
            return (
                <input
                    {...rest}
                    {...field}

                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'

                />
            )
        }} />


    )
}

