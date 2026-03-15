import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="h-[calc(100vh-100px)] flex justify-center items-center"></div>
      <Footer />
    </main>
  );
}
