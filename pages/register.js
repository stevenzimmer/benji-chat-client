import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import H4 from "@material-tailwind/react/Heading4";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { STREAM_API_URL } from "@/config/index";

const cookies = new Cookies();

import { useForm, Controller } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";

import { TextField, Button, CircularProgress } from "@mui/material";

export default function Register() {
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username must be less than 20 characters")
            .required("Username is a required field"),
        fullName: Yup.string()
            .max(24, "Your full name must be less than 24 characters")
            .required("Please add a username"),
        phoneNumber: Yup.number("Please enter only numbers")
            .min(10, "Phone number must be at least 10 digits")
            .required("Please add a phone number"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be less than 20 characters")
            .required("Please add a password"),

        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords must and should match"),
    });

    const defaultValues = {
        username: "",
        fullName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setErr("");

        const subscription = watch((data) => {
            console.log({ data });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    const submitForm = async (form) => {
        console.log("submit form ", form);

        setIsLoading(true);

        try {
            const { username, phoneNumber } = form;
            const URL = `${STREAM_API_URL}/auth`;

            const {
                data: { token, userId, hashedPassword, fullName },
            } = await axios.post(`${URL}/register`, {
                username: form.username,
                password: form.password,
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
            });

            console.log({ token });
            // console.log({ username });
            console.log({ fullName });
            console.log({ userId });

            cookies.set("token", token);
            cookies.set("username", username);
            cookies.set("fullName", fullName);
            cookies.set("userId", userId);

            cookies.set("phoneNumber", phoneNumber);
            // cookies.set("avatarURL", avatarURL);
            console.log({ phoneNumber });
            cookies.set("hashedPassword", hashedPassword);
            console.log({ hashedPassword });

            // window.location.reload();
            router.push("/");
        } catch (err) {
            setIsLoading(false);
            console.log({ err });
            if (err.response.data.message) {
                setErr(err.response.data.message);
            }
        }
    };

    return (
        <>
            <Head>
                <title>Register to use Benji Chat</title>
                <meta name="description" content="It is quick and easy" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen">
                <div className="flex h-full justify-center bg-blue-50">
                    <div className="lg:w-1/4">
                        <div className="h-full flex items-center justify-center bg-blue-50">
                            <div className="flex justify-center items-center w-full">
                                <div className="w-11/12">
                                    <div className="bg-white p-12 rounded shadow w-full">
                                        <div className="text-center mb-6">
                                            <H4>Register</H4>
                                        </div>

                                        <form
                                            onSubmit={handleSubmit(submitForm)}
                                            className={`${isLoading} ? "opacity-75" : "" `}
                                        >
                                            {Object.keys(defaultValues).map(
                                                (objKey, i) => {
                                                    console.log({ objKey });
                                                    const result =
                                                        objKey.replace(
                                                            /([A-Z])/g,
                                                            " $1"
                                                        );
                                                    const finalResult =
                                                        result
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        result.slice(1);
                                                    return (
                                                        <Controller
                                                            key={i}
                                                            control={control}
                                                            render={() => (
                                                                <>
                                                                    <TextField
                                                                        {...register(
                                                                            objKey
                                                                        )}
                                                                        error={
                                                                            err ||
                                                                            errors[
                                                                                objKey
                                                                            ]
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        helperText={
                                                                            errors[
                                                                                objKey
                                                                            ]
                                                                                ? errors[
                                                                                      objKey
                                                                                  ]
                                                                                      .message
                                                                                : ""
                                                                        }
                                                                        autoFocus={
                                                                            i ===
                                                                            0
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        className={`w-full bg-blue-50 rounded border-0 outline-none mb-2`}
                                                                        label={
                                                                            finalResult
                                                                        }
                                                                        placeholder={
                                                                            finalResult
                                                                        }
                                                                        type={
                                                                            objKey ===
                                                                                "password" ||
                                                                            objKey ===
                                                                                "confirmPassword"
                                                                                ? "password"
                                                                                : "text"
                                                                        }
                                                                        autoComplete="off"
                                                                        disabled={
                                                                            isLoading
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        // variant="standard"
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    );
                                                }
                                            )}

                                            <Button
                                                className="bg-blue-200"
                                                variant="contained"
                                                endIcon={
                                                    !isLoading ? (
                                                        <SendIcon />
                                                    ) : (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    )
                                                }
                                                disabled={
                                                    isLoading ? true : false
                                                }
                                                type="submit"
                                            >
                                                Sign in
                                            </Button>
                                        </form>
                                        {err && (
                                            <>
                                                <ClosingAlert
                                                    color="red"
                                                    onClick={(e) => {
                                                        setErr("");
                                                    }}
                                                >
                                                    {err}
                                                </ClosingAlert>
                                            </>
                                        )}

                                        <div>
                                            {`Already have an account? `}{" "}
                                            <Link href="/login/">
                                                <a>Sign in</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
