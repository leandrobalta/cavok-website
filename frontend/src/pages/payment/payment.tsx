import { FinishForm } from "./components/finish-form";
import { PurchaseDetails } from "./components/purchase-details";
import './payment.css'

export default function Payment() {
    return (
        <div className="flex bg-[#f8f6f7]">
            <div className="payment-conteiner">
                <FinishForm />
                <PurchaseDetails />
            </div>
        </div>
    );
}
