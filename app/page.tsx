import Header from "@/components/Header";
import IntroAnimation from "@/components/IntroAnimation";
import { Manifesto, Services, Process, Works, Contact } from "@/components/Sections";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <IntroAnimation nextSectionId="yaklasim" />
                <Manifesto />
                <Services />
                <Process />
                <Works />
                <Contact />
            </main>
        </>
    );
}
