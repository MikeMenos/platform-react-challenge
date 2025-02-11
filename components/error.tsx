import { CircleX } from "lucide-react";

const Error = ({ message }: { message?: string }) => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center text-xl">
      <CircleX color="red" size={30} />
      {message ?? "Ops. Something went wrong."}
    </div>
  );
};

export default Error;
