"use client";
import { useFormState, useFormStatus } from "react-dom";
import { upvoteAction } from "@/actions";
import { CoffeeStoreType } from "@/app/types";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-purple-951 min-w-[120px]"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          alt="loading"
          src="/static/loading-spinner.svg"
          width="30"
          height="30"
          className="m-auto"
        />
      ) : (
        "Upvote"
      )}
    </button>
  );
}

export default function Upvote({
  coffeeStore,
}: {
  coffeeStore: Pick<CoffeeStoreType, "id" | "voting">;
}) {
  const [state, dispatch] = useFormState(upvoteAction, coffeeStore);

  return (
    <form action={dispatch}>
      <div className="flex mb-6">
        <Image src="/static/star.svg" width="24" height="24" alt="star icon" />
        <p className="pl-2">{state.voting}</p>
      </div>
      <SubmitButton />
    </form>
  );
}
