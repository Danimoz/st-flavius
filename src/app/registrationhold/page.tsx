import { numberOfParishioners } from "@/libs/fetch";
import PageHero from "@/components/PageHero";
import RegistrationForm from "./form";

export default async function RegistrationWithPayment() {
  let { total } = await numberOfParishioners();
  if (!total) {
    total = 0;
  }
  
  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero
        eyebrow="Parish membership"
        title="Become a registered parishioner."
        description="Keep your details in the parish register and receive a membership card for future parish services."
      />
      <RegistrationForm totalParishioners={total} />
    </main>
  )
}
