import React, { FC } from 'react'
import { useField } from 'formik'
import { bgColors } from '@/constant/colors';

interface INftSelect {
    name: string
}

export const BackgroundSelect: FC<INftSelect> = ({ ...props }) => {
    const [field, , helpers] = useField(props)

    return (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
            {bgColors.map((el) => (
                <div
                    style={{
                        background: el.hex,
                    }}
                    onClick={() => helpers.setValue(el.value)}
                    className={`w-full transition cursor-pointer rounded-xl aspect-square ${
                        (field.value === el.value || el.value === 'white') && 'border border-2 border-black'
                    }`}
                    key={el.value}
                />
            ))}
        </div>
    )
}
