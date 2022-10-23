import React, { FC } from 'react'
import { useField } from 'formik'
import { Nft } from 'alchemy-sdk'
import Image from 'next/image';

interface INftSelect {
    name: string
}

const monkeis = [
    {
        path: "/images/monkey_1.png",
        value: "monkey_1"
    },
    {
        path: "/images/monkey_2.png",
        value: "monkey_2"
    },
    {
        path: "/images/monkey_3.png",
        value: "monkey_3"
    },
    {
        path: "/images/monkey_4.png",
        value: "monkey_4"
    }
]

export const NftSelect: FC<INftSelect> = ({ ...props }) => {
    const [field, , helpers] = useField(props)

    return (
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-3">
                {monkeis.map((el) => (
                    <div
                        key={el.value}
                        onClick={() => helpers.setValue(el.value)}
                        className={`transition overflow-hidden rounded-2xl cursor-pointer border-2 ${el.value === field.value ? 'border-black' : 'border-gray-300'}`}
                    >
                        <img src={el.path}/>
                    </div>
                ))}
            </div>
    )
}
