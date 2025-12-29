import { url } from "@/url";

interface FilterOptions {
  price?: number;
  choosenHouseType?: string;
  active_payment_category?: string;
  features?: string[]; // if you're adding features later
}

export default async function filterHousesFromAPI({
  price,
  choosenHouseType,
  active_payment_category,
  features,
}: FilterOptions): Promise<any> {
  const query = new URLSearchParams();
 
  if (price && price > 0) {
    query.append("price_max", price.toString());
  }

  if (choosenHouseType) {
    query.append("house_category", choosenHouseType);
  }

  if (active_payment_category) {
    query.append("payment_category", active_payment_category);
  }

  if (features && features.length > 0) {
    features.forEach((f) => query.append("features", f));
  }

  const response = await fetch(`${url}/api/houses/?${query.toString()}`);
  const data = await response.json();

//   console.log("Filtered houses:", data);

  return data;
}
