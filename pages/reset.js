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

import Button from "@material-tailwind/react/Button";

import { useForm } from "react-hook-form";
import { STREAM_API_URL } from "@/config/index";

const cookies = new Cookies();

export default function Reset() {
    const router = useRouter();
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [stateUserId, setStateUserId] = useState("");

    const schemaShape = verified
        ? {
              newPassword: Yup.string()
                  .min(6, "New Password must be at least 6 characters")
                  .max(20, "New Password must be less than 20 characters")
                  .required("Please add a password"),

              confirmNewPassword: Yup.string()
                  .required("Confirm New Password is required")
                  .oneOf(
                      [Yup.ref("newPassword")],
                      "Passwords must and should match"
                  ),
          }
        : {
              username: Yup.string().required("Username is a required field"),
              phoneNumber: Yup.number("Please enter only numbers")
                  .min(10, "Phone number must be at least 10 digits")
                  .required("Please enter your phone number"),
          };

    const schema = Yup.object().shape(schemaShape);

    const defaultValues = verified
        ? { newPassword: "", confirmNewPassword: "" }
        : { username: "", phoneNumber: "" };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const subscription = watch((data) => {
            console.log(data);
            setErr("");
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, verified]);

    const submitForm = async (form) => {
        console.log("submit form ", form);

        setIsLoading(true);

        try {
            const URL = `${STREAM_API_URL}/auth`;

            if (verified) {
                console.log({ stateUserId });
                const { data } = await axios.post(`${URL}/reset`, {
                    newPassword: form.newPassword,
                    userId: stateUserId,
                });

                console.log({ data });

                router.push("/login/");
            } else {
                const {
                    data: { fullName, userId, username, resetPassword },
                } = await axios.post(`${URL}/verify`, {
                    username: form.username,
                    phoneNumber: form.phoneNumber,
                });
                // // console.log({ data });
                // console.log({ token });
                console.log({ username });
                console.log({ fullName });
                console.log({ userId });
                console.log({ resetPassword });
                reset();
                setVerified(resetPassword);
                setStateUserId(userId);

                // cookies.set("token", token);
                // cookies.set("username", username);
                // cookies.set("fullName", fullName);
                // cookies.set("userId", userId);
                // router.push("/");
                // setIsLoading(false);
            }
        } catch (err) {
            console.log({ err });
            if (err.response.data.message) {
                setErr(err.response.data.message);
            }
        }

        setIsLoading(false);
    };
    // console.log({ defaultValues });
    return (
        <>
            <Head>
                <title>
                    {verified
                        ? "Reset your password"
                        : "Verify your account details"}
                </title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen">
                <div className="flex h-full justify-start">
                    <div className="lg:w-1/4">
                        <div className="h-full flex items-center justify-center bg-blue-50">
                            <div className="flex justify-center items-center w-full">
                                <div className="w-11/12">
                                    <div className="bg-white p-12 rounded shadow w-full">
                                        <div className="text-center mb-6">
                                            <H4>
                                                {verified
                                                    ? "Reset Password"
                                                    : "Forgot password?"}
                                            </H4>
                                        </div>

                                        <form
                                            onSubmit={handleSubmit(submitForm)}
                                            className={`${isLoading} ? "opacity-75" : "" `}
                                        >
                                            {Object.keys(defaultValues).map(
                                                (objKey, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <input
                                                                autoComplete="off"
                                                                type="text"
                                                                {...register(
                                                                    objKey
                                                                )}
                                                                placeholder={
                                                                    objKey
                                                                }
                                                                className={`border ${
                                                                    errors[
                                                                        objKey
                                                                    ]
                                                                        ? " border-red-500"
                                                                        : ""
                                                                }`}
                                                            />
                                                            <br />
                                                            {errors[objKey] &&
                                                                errors[objKey]
                                                                    .message}
                                                            <br />
                                                        </div>
                                                    );
                                                }
                                            )}

                                            <Button
                                                color="lightBlue"
                                                buttonType="filled"
                                                size="regular"
                                                rounded={false}
                                                block={false}
                                                iconOnly={false}
                                                ripple="light"
                                            >
                                                {verified
                                                    ? "Reset password"
                                                    : "Verify detail"}
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
                                            {`Don't yet have an account? `}{" "}
                                            <Link href="/register/">
                                                <a>Register here</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4">
                        <div className="h-full w-full bg-blue-100"></div>
                    </div>
                </div>
            </div>
        </>
    );
}