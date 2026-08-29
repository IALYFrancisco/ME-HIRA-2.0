import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsAndConditions(){
    return(
        <>
            <Head>
                <title>Conditions générales d'utilisation - Me-Hira</title>
            </Head>
            <Navbar/>
            {/* <section className="terms-and-conditions-container"></section> */}
            <Footer/>
        </>
    )
}