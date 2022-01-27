import Cookies from "universal-cookie";
import Image from "next/image";
const cookies = new Cookies();
export default function CompanyHeader() {
    return (
        <div className="company-header mb-12 px-6">
            <div className="flex items-center">
                <div>
                    <Image
                        src={`/emoticons/1.png`}
                        width={40}
                        height={40}
                        alt="Benji image 1"
                    />
                </div>
                <div className="px-2">
                    <p className="font-bold text-2xl dark:text-grey-200">
                        Benji Chat
                    </p>
                </div>
            </div>
        </div>
    );
}
