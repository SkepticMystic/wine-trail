import { Studios } from "$lib/models/Studio";
import { _idToString, shuffleArray } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const [studios] = await Promise.all([
    Studios.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 },
    ).lean(),
  ]);

  return json({
    studios: shuffleArray(studios.map(_idToString)),
  });
};
