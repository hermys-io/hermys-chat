import { type ChatStateProps } from "@/lib/chat";
import { atom } from "jotai";

export const chatState = atom<ChatStateProps>("online");
