import dynamic from "next/dynamic";
import Router from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { StreamChat } from "stream-chat";
import { Chat, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelListContent from "@/components/ChannelListContent";
import ChannelContainer from "@/components/ChannelContainer";

import "stream-chat-react/dist/css/index.css";

const cookies = new Cookies();
const authToken = cookies.get("token");
const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const client = StreamChat.getInstance(api_key);
client.connectUser(
    {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        phoneNumber: cookies.get("phoneNumber"),
        hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
);

export default function Index() {
    // console.log({ client });

    return (
        <>
            <Head>
                <title>
                    {cookies.get("fullName") || cookies.get("username")}&apos;s
                    Benji Chat.
                </title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen">
                <Chat client={client} theme="team light">
                    <div className="flex h-full">
                        <div className="lg:w-1/4">
                            <ChannelListContent />
                        </div>
                        <div className="lg:w-3/4">
                            <ChannelContainer />
                        </div>
                    </div>
                </Chat>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log("getting index server side props .....");

    const serverCookies = new Cookies(context.req.headers.cookie);

    const serverAuthToken = serverCookies.get("token");

    if (serverAuthToken) {
        return {
            props: {},
        };
    } else {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
}
