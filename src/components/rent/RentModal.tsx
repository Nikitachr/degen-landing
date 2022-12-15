import {useContext} from "react";
import {RentContext} from "@/context/Rent";

export const RentModal = () => {
    const { rentModal } = useContext(RentContext);

    if (!rentModal) return null;

    return <div className="fixed bg-white p-4 rounded-3xl left-1/2 top-1/2 transform -translate-1/2 border shadow-2xl">
        123
    </div>
}