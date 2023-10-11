import { FinishForm } from "./components/finish-form";
import { PurchaseDetails } from "./components/purchase-details";

export default function Payment() {
    return (
        <div className="flex bg-[#f8f6f7]">
            <div className="grid w-full max-w-[80rem] h-full mx-auto my-0 justify-between py-2 pt-6 gap-4" style={{gridTemplateColumns: "3fr 1.25fr"}}>
                <FinishForm />
                <PurchaseDetails />
            </div>
        </div>
    );
}
