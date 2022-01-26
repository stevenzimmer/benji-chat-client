import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function CompanyHeader() {
    return (
        <div className="company-header mb-12 px-6">
            <p className="font-bold text-2xl dark:text-grey-200">Benji Chat</p>
        </div>
    );
}
