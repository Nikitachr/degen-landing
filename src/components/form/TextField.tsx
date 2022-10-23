import React, { FC } from 'react'
import { useField } from 'formik'

interface ITextField {
    name: string
    type: string
    label: string
}

export const TextField: FC<ITextField> = ({ label, ...props }) => {
    const [field] = useField(props)

    return (
        <div>
            <input className="rounded-xl w-full py-4 px-3.5 bg-grayBg border-none outline-0q" placeholder={label} {...field} {...props} />
        </div>
    )
}
