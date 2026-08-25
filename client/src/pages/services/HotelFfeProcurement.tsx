import BuyerIntentServicePage from "@/components/BuyerIntentServicePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HotelFfeProcurement() {
  const { language } = useLanguage();
  return (
    <BuyerIntentServicePage
      profileKey="hkHotelFfe"
      language={language}
      Header={Header}
      Footer={Footer}
    />
  );
}
