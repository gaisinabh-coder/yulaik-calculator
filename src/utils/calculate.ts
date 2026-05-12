type CalculateParams = {
  basePrice: number;
  personalizationPrice: number;
  quantity: number;
  garmentOwner: 'yulaik' | 'client';
};

export function calculateTotal({
  basePrice,
  personalizationPrice,
  quantity,
  garmentOwner,
}: CalculateParams) {
  let pricePerSet = basePrice + personalizationPrice;

  if (garmentOwner === 'client') {
    pricePerSet = Math.round(pricePerSet * 0.55);
  }

  const total = pricePerSet * quantity;

  return {
    pricePerSet,
    total,
  };
}