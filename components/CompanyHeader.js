import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useStateContext } from "@/context/StateContextProvider";
export default function CompanyHeader() {
    const { isOpen, setIsOpen } = useStateContext();
    return (
        <div className="company-header mb-6 relative">
            <div
                className={`flex items-center ${
                    isOpen ? "justify-start" : "justify-center"
                }`}
            >
                <div className="text-center">
                    <Image
                        src={`/emoticons/1.png`}
                        width={40}
                        height={40}
                        alt="Benji image 1"
                    />
                </div>
                {isOpen && (
                    <div className="px-2 lg:px-2">
                        <p className="font-bold text-lg lg:text-2xl dark:text-grey-200">
                            Benji Chat
                        </p>
                    </div>
                )}
            </div>
            <div
                className="absolute top-0 -right-6 lg:-right-10 h-full w-8 flex items-center cursor-pointer z-0"
                onClick={() => {
                    console.log("toggle menu");
                }}
            >
                <div
                    className="dark:bg-grey-50 rounded-full shadow-lg h-8 w-full flex justify-center items-center"
                    onClick={(e) => setIsOpen((prevState) => !prevState)}
                >
                    <div
                        className={`transform origin-center transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    >
                        <ChevronRightIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
