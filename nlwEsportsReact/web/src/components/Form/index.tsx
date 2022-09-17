import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup'

interface Props {
    children: React.ReactNode,
    defaultValues?: any,
    validationSchema?: yup.AnyObjectSchema
    onSubmit: SubmitHandler<any>
}

export function Form({ children, validationSchema, defaultValues, onSubmit }: Props) {
    const resolver = validationSchema || yup.object().shape({});
    const methods = useForm({ defaultValues, resolver: yupResolver(resolver) });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>

                {children}
            </form>

        </FormProvider>
    )
}