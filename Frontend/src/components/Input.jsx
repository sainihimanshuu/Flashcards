import { useId } from "react";

export default function Input({
    label,
    className = "",
    placeHolder = "",
    type = "text",
    error,
    ...props
}) {
    const id = useId();
    return (
        <div className="mb-8">
            <div className="flex justify-center items-center">
                {label && <label className="mr-2 font-semibold">{label}</label>}
                <input
                    id={id}
                    type={type}
                    placeholder={placeHolder}
                    className={`rounded-md pl-1 h-7 w-3/4 ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-xs font-semibold text-red-500 mb-5">
                    {`*${error}`}
                </span>
            )}
        </div>
    );
}
