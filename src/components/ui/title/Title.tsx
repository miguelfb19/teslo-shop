import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className} mt-3 px-2`}>
      <h1
        className={`${titleFont.className} antialiased font-semibold text-3xl my-10`}
      >
        {title}
      </h1>

      {subtitle && <h3 className="text-xl mb-10">{subtitle}</h3>}
    </div>
  );
};
