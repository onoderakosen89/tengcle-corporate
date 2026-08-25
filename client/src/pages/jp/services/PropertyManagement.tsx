import BuyerIntentServicePage from "@/components/BuyerIntentServicePage";
import JpHeader from "@/components/jp/Header";
import JpFooter from "@/components/jp/Footer";
import { useJpLanguage } from "@/contexts/JpLanguageContext";

export default function PropertyManagement() {
  const { language } = useJpLanguage();
  return (
    <BuyerIntentServicePage
      profileKey="jpPropertyManagement"
      language={language}
      Header={JpHeader}
      Footer={JpFooter}
    />
  );
}
