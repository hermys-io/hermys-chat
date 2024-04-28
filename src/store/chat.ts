import { type ChatMessageProps, type ChatStateProps } from "@/lib/chat";
import { atom } from "jotai";

export const chatState = atom<ChatStateProps>("online");

export const chatHistory = atom<ChatMessageProps[]>([]);
