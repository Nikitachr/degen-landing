import React, { FC } from 'react'
import { useField } from 'formik'

interface INftSelect {
    name: string
}

export const ProviderSelect: FC<INftSelect> = ({ ...props }) => {
    const [field, , helpers] = useField(props)

    return (
        <div className="grid grid-cols-2 gap-2 md:gap-3">
            <img className={`cursor-pointer w-full transition rounded-2xl ${field.value === 'visa' && 'border-2 border-black'}`}
                 onClick={() => helpers.setValue('visa')} src="/images/visa.png" alt="visa"/>

            <img className={`cursor-pointer w-full transition rounded-2xl ${field.value === 'mastercard' && 'border-2 border-black'}`}
                 onClick={() => helpers.setValue('mastercard')} src="/images/mastercard.png" alt="mastercard"/>

            <img className={`cursor-pointer w-full transition rounded-2xl ${field.value === 'americanexpress' && 'border-2 border-black'}`}
                 onClick={() => helpers.setValue('americanexpress')} src="/images/american.png" alt="american"/>
        </div>
    )
}
