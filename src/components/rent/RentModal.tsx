import CloseIcon from  "public/svg/Close.svg";
import {ChangeEvent, useCallback, useContext, useState} from "react";

import {RentContext} from "@/context/Rent";
export const RentModal = () => {
    const { rentModal,  closeModal, rent } = useContext(RentContext);
    const [value, setValue] = useState(0);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.valueAsNumber);
    }, []);

    if (!rentModal) return null;

    return <div className="fixed bg-white p-4 w-full max-w-md rounded-3xl left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 border shadow-2xl">
        <button onClick={closeModal} className="ml-auto w-fit block">
            <CloseIcon/>
        </button>
        <div className="p-8">
            <img className="w-full rounded-2xl" src={rentModal.img} alt=""/>
        </div>

        <h3 className="text-center">{rentModal.title}</h3>

        <p className="text-center">0.0001 WETH/day</p>

        <div className="grid mt-4 gap-1">
            <p>Duration</p>
            <input value={value} onChange={onChange} className="w-full p-2 rounded-xl" type="number"/>
        </div>

        <p className="mt-8">Total: {(0.0001 * value).toFixed(4)}</p>
        <button onClick={() => rent(value)}
            className="button-gradient w-full text-white rounded-xl mt-2 font-bold p-3">Rent</button>
    </div>
}