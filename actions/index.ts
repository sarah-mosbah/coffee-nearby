"use server";

import { updateCoffeeStore } from "@/app/lib/airtable";

type State = {
  id: string;
  voting: number;
};

export const upvoteAction = async (prevState: State): Promise<State> => {
  const { id } = prevState;
  const data = await updateCoffeeStore(id);

  return {
    voting: data.voting,
    id,
  };
};
