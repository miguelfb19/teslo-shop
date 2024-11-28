import { titleFont } from "@/config/fonts";


export default function Home() {
  return (
    <div>
      <div>Hola mundo</div>
      <h1 className={`${titleFont.className}`}>Hola Mundo H1</h1>
    </div>
  );
}
