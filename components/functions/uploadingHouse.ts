type HouseDataType = {
  category: string;
  thumbnail: { uri: string; type: string; name: string };
  additionalFeatures: Record<
    string,
    {
      number?: string;
      image?: {
        uri: string;
        type: string;
        name: string;
      };
    }
  >;
  proximity: string[];
  purpose: string;
  price: string;
  agent: {
    name: string;
    status: string;
    id: string; // ID number
    upi: string; // UPI code
    phone: string;
    otherphone: string;
    description: string;
    photo?: { uri: string; type: string; name: string }; // optional profile photo
  };
};
export const prepareFormData = (houseData: HouseDataType) => {
  const formData = new FormData();

  // Basic house info
  formData.append("house_category", houseData.category);
  formData.append("payment_category", houseData.purpose);
  formData.append("price", houseData.price);

  // Thumbnail
  if (houseData.thumbnail?.uri) {
    console.log(houseData?.thumbnail);

    formData.append("thumbnail", {
      uri: houseData.thumbnail.uri,
      name: `${houseData.thumbnail.name}.jpeg` || "thumbnail.jpeg",
      type: houseData.thumbnail.type || "image/jpeg",
    } as any);
  }

  // Additional Features
  Object.entries(houseData.additionalFeatures).forEach(
    ([featureId, feature]) => {
      if (feature.number)
        formData.append(
          `features[${featureId}][available_number]`,
          feature.number
        );
      if (feature.image)
        formData.append(`features[${featureId}][image]`, {
          uri: feature.image.uri,
          name: feature.image.name,
          type: feature.image.type,
        } as any);
    }
  );

  // Proximity (IDs array)
  houseData.proximity.forEach((id, idx) =>
    formData.append(`proximity[${idx}]`, id)
  );

  formData.append("agent.name", houseData.agent.name);
  formData.append("agent.upi", houseData.agent.upi);
  formData.append("agent.phone", houseData.agent.phone);
  formData.append("agent.other_phone", houseData.agent.otherphone);
  formData.append("agent.description", houseData.agent.description);
  formData.append("agent.status", houseData.agent.status);

  if (houseData.agent.photo?.uri) {
    formData.append("agent.photo", {
      uri: houseData.agent.photo.uri,
      name: `${houseData.agent.photo.name}.jpeg`,
      type: houseData.agent.photo.type ?? "image/jpeg",
    } as any);
  }
  formData.append(
    "address",
    houseData.agent.description || "No address provided"
  );
  formData.append(
    "description",
    houseData.agent.description || "No description provided"
  );

  return formData;
};
