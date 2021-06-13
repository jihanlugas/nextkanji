import { NextPage } from "next";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type Props = {
    label: string;
    disabled?: boolean;
    loading?: boolean;
}

const ButtonSubmit: NextPage<Props> = ({ label, disabled = false, loading = false }) => {
    return (
        <button
            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full'}
            type={'submit'}
            disabled={disabled}
        >
            <div className={`flex justify-center items-center`}>
                {loading ? <AiOutlineLoading3Quarters className={"animate-spin"} size={"1.5em"} /> : label}
            </div>
        </button>
    )
}

export default ButtonSubmit;