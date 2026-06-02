type BaseCalculateParams = {
  basePrice: number;
  personalizationPrice: number;
  quantity: number;
  printMethodExtraPrice: number;
  printedItemsCount: number;
};

type CustomerPrintCalculateParams = {
  selectedZonePrices: number[];
  personalizationPrice: number;
  quantity: number;
  printMethodExtraPrice: number;
  printedItemsCount: number;
};

const MIN_QUANTITY = 5;

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity) || quantity < MIN_QUANTITY) {
    return MIN_QUANTITY;
  }

  return Math.floor(quantity);
}

function calculatePrintMethodExtra({
  printMethodExtraPrice,
  printedItemsCount,
}: {
  printMethodExtraPrice: number;
  printedItemsCount: number;
}) {
  return printMethodExtraPrice * printedItemsCount;
}

export function calculateBaseTotal({
  basePrice,
  personalizationPrice,
  quantity,
  printMethodExtraPrice,
  printedItemsCount,
}: BaseCalculateParams) {
  const normalizedQuantity = normalizeQuantity(quantity);

  const printMethodExtra = calculatePrintMethodExtra({
    printMethodExtraPrice,
    printedItemsCount,
  });

  const pricePerItem = basePrice + personalizationPrice + printMethodExtra;
  const total = pricePerItem * normalizedQuantity;

  return {
    quantity: normalizedQuantity,
    basePrice,
    personalizationPrice,
    printMethodExtra,
    pricePerItem,
    total,
  };
}

export function calculateCustomerPrintTotal({
  selectedZonePrices,
  personalizationPrice,
  quantity,
  printMethodExtraPrice,
  printedItemsCount,
}: CustomerPrintCalculateParams) {
  const normalizedQuantity = normalizeQuantity(quantity);

  const zonesTotal = selectedZonePrices.reduce((sum, price) => sum + price, 0);

  const printMethodExtra = calculatePrintMethodExtra({
    printMethodExtraPrice,
    printedItemsCount,
  });

  const pricePerItem = zonesTotal + personalizationPrice + printMethodExtra;
  const total = pricePerItem * normalizedQuantity;

  return {
    quantity: normalizedQuantity,
    zonesTotal,
    personalizationPrice,
    printMethodExtra,
    pricePerItem,
    total,
  };
}

// Временная совместимость со старым кодом.
// После полной замены App.tsx можно будет убрать.
export function calculateKitTotal(params: BaseCalculateParams) {
  return calculateBaseTotal(params);
}

export function calculateSingleProductTotal(params: BaseCalculateParams) {
  return calculateBaseTotal(params);
}

export function calculateTotal(params: BaseCalculateParams) {
  return calculateBaseTotal(params);
}