import { FinishForm } from "./components/finish-form";
import { PurchaseDetails } from "./components/purchase-details";


export default function Payment() {
    return ( 
        <div className="flex bg-[#f8f6f7]">
            <div className="flex flex-row w-full max-w-[80rem] h-full mx-auto my-0 justify-between py-2">
                <FinishForm />
                <PurchaseDetails />
            </div>
        </div>
    )
}