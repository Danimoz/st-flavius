import { numberOfParishioners } from "@/libs/fetch";
import RegistrationForm from "./form";

export default async function RegistrationWithPayment() {
  let { total } = await numberOfParishioners();
  if (!total) {
    total = 0;
  }
  
  return (
    <main>
      <RegistrationForm totalParishioners={total} />
    </main>
  )
}