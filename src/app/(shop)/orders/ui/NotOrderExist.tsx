import { Title } from "@/components/ui/title/Title";

import Image from "next/image";

interface Props {
  id: string;
}

export const NotOrderExist = ({ id }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center mb-72 px-10 w-full sm:px-0">
        <div className="flex flex-col w-full">
          <Title title={`Orden #${id}`} />
          <div className="flex flex-col items-center">
            <Image
              src="/imgs/starman_750x750.png"
              alt="starman"
              className="p-5 sm:p-0"
              width={400}
              height={400}
            />
            <p className="text-red-600 text-2xl text-center font-bold">
              No se encontro la orden
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
