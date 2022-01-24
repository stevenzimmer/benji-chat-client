import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";

import H4 from "@material-tailwind/react/Heading4";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Button from "@material-tailwind/react/Button";

import { useForm } from "react-hook-form";

const cookies = new Cookies();

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username must be less than 20 characters")
            .required("Username is a required field"),
        fullName: isSignUp
            ? Yup.string()
                  .max(24, "Your full name must be less than 24 characters")
                  .required("Please add a username")
            : null,
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be less than 20 characters")
            .required("Please add a password"),
        phoneNumber: isSignUp
            ? Yup.number("Please enter only numbers")
                  .min(10, "Phone number must be at least 10 digits")
                  .required("Please add a phone number")
            : null,
        // avatarURL: isSignUp
        //     ? Yup.string().required("Please add an avatar URL")
        //     : null,
        confirmPassword: isSignUp
            ? Yup.string()
                  .required("Confirm Password is required")
                  .oneOf(
                      [Yup.ref("password")],
                      "Passwords must and should match"
                  )
            : null,
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitForm = async (form) => {
        console.log("submit form ", form);

        setIsLoading(true);

        try {
            const { username, phoneNumber } = form;
            const URL = `http://localhost:5000/auth`;

            const {
                data: { token, userId, hashedPassword, fullName },
            } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
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
            if (isSignUp) {
                cookies.set("phoneNumber", phoneNumber);
                // cookies.set("avatarURL", avatarURL);
                console.log({ phoneNumber });
                cookies.set("hashedPassword", hashedPassword);
                console.log({ hashedPassword });
            }

            window.location.reload();
            setIsLoading(false);
        } catch (err) {
            console.log({ err });
            if (err.response.data.message) {
                setErr(err.response.data.message);
            }
        }
        setIsLoading(false);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setErr("");
    };

    return (
        <>
            <Head>
                <title>
                    {isSignUp
                        ? "Sign up to use Benji Chat"
                        : "Welcome Back! Sign in to use Benji Chat"}
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
                                                {isSignUp
                                                    ? "Sign Up"
                                                    : "Sign in"}
                                            </H4>
                                        </div>

                                        <form
                                            onSubmit={handleSubmit(submitForm)}
                                            className={`${isLoading} ? "opacity-75" : "" `}
                                        >
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                {...register("username")}
                                                placeholder="User name"
                                                className={`border ${
                                                    errors.username
                                                        ? " border-red-500"
                                                        : ""
                                                }`}
                                            />
                                            {errors.username &&
                                                errors.username.message}

                                            <input
                                                type="password"
                                                autoComplete="off"
                                                {...register("password")}
                                                placeholder="Password"
                                            />
                                            {errors.password &&
                                                errors.password.message}

                                            {!err && (
                                                <Button
                                                    color="lightBlue"
                                                    buttonType="filled"
                                                    size="regular"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="light"
                                                >
                                                    {isSignUp
                                                        ? "Sign Up"
                                                        : "Sign in"}
                                                </Button>
                                            )}
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
