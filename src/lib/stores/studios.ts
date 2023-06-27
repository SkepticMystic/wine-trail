import type { Studio } from "$lib/models/Studio";
import { writable } from "svelte/store";

export const studios = writable<Studio[]>([]);
