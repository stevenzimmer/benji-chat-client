import { useForm } from "react-hook-form";

export const FormInput = ({ objKey }) => {
    const {
        register,
        formState: { errors },
    } = useForm();

    console.log({ objKey });
    const result = objKey.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return (
        <div>
            <input
                autoComplete="off"
                type="text"
                {...register(objKey)}
                placeholder={finalResult}
                className={`border ${errors[objKey] ? " border-red-500" : ""}`}
            />
            <br />
            {errors[objKey] && errors[objKey].message}
        </div>
    );
};
