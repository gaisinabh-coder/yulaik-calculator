import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  Button,
  Card,
  FormItem,
  Group,
  Header,
  Input,
  Panel,
  PanelHeader,
  Select,
  Text,
  Textarea,
  Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {
  CUSTOMER_ITEM_TYPES,
  CUSTOMER_PRINT_ZONES,
  INDIVIDUAL_PRODUCTS,
  PERSONALIZATION,
  PRINT_METHODS,
  READY_COLLECTIONS,
  START_SECTIONS,
  TEAM_KITS,
} from './data/catalog';
import {
  calculateBaseTotal,
  calculateCustomerPrintTotal,
} from './utils/calculate';
import { sendLead } from './api/sendLead';
import { CatalogIllustration } from './assets/catalogIllustrations';

type StartSection = 'collections' | 'custom_order' | 'team_kit';
type CustomOrderType = 'product' | 'customer_print';
type CatalogIllustrationProps = ComponentProps<typeof CatalogIllustration>;

type CatalogImageProps = CatalogIllustrationProps & {
  imageUrl?: string;
};

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;

const COLORS = {
  black: '#05070D',
  navy: '#07111F',
  darkBlue: '#0B1D3A',
  blue: '#1E63FF',
  blueSoft: '#EAF1FF',
  border: '#DCE6F7',
  text: '#101828',
  muted: '#667085',
  white: '#FFFFFF',
  page: '#F5F8FF',
};

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${COLORS.white} 0%, ${COLORS.page} 44%, ${COLORS.white} 100%)`,
  color: COLORS.text,
};

const pageShellStyle: CSSProperties = {
  width: '100%',
  maxWidth: 1160,
  margin: '0 auto',
  padding: '12px 14px 48px',
  boxSizing: 'border-box',
};

const heroStyle: CSSProperties = {
  padding: 24,
  borderRadius: 26,
  background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.navy} 54%, ${COLORS.darkBlue} 100%)`,
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 24px 60px rgba(5, 7, 13, 0.22)',
  color: COLORS.white,
};

const heroLabelStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 38,
  padding: '8px 16px',
  borderRadius: 999,
  background: 'rgba(30, 99, 255, 0.22)',
  color: COLORS.white,
  fontSize: 22,
  lineHeight: '28px',
  fontWeight: 700,
  marginBottom: 0,
  border: '1px solid rgba(255,255,255,0.16)',
};

const groupStyle: CSSProperties = {
  marginTop: 14,
  borderRadius: 22,
  overflow: 'hidden',
  boxShadow: '0 12px 32px rgba(11, 29, 58, 0.08)',
  border: `1px solid ${COLORS.border}`,
};

const cardStyle = (isSelected: boolean): CSSProperties => ({
  padding: 14,
  cursor: 'pointer',
  border: isSelected
    ? `2px solid ${COLORS.blue}`
    : `2px solid ${COLORS.border}`,
  borderRadius: 20,
  transition: 'border-color 0.18s ease, transform 0.18s ease',
  boxShadow: isSelected
    ? '0 16px 34px rgba(30, 99, 255, 0.18)'
    : '0 8px 22px rgba(11, 29, 58, 0.08)',
  background: COLORS.white,
});

const sectionNoteStyle: CSSProperties = {
  marginTop: 8,
  color: COLORS.muted,
};

const rowStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  overflowX: 'auto',
  paddingBottom: 8,
};

const productGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 14,
};

const smallCardStyle = (isSelected: boolean): CSSProperties => ({
  ...cardStyle(isSelected),
  minWidth: 220,
  flex: '0 0 220px',
});

const productCardStyle = (isSelected: boolean): CSSProperties => ({
  ...cardStyle(isSelected),
  width: '100%',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
});

const realPhotoStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const photoFrameStyle = (width: number): CSSProperties => ({
  width: '100%',
  maxWidth: width,
  height: width,
  borderRadius: 18,
  overflow: 'hidden',
  background: COLORS.blueSoft,
  border: `1px solid ${COLORS.border}`,
});

const productTitleRowStyle: CSSProperties = {
  marginTop: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const productMetaStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  minHeight: 26,
  padding: '0 10px',
  borderRadius: 999,
  background: COLORS.blueSoft,
  color: COLORS.blue,
  border: `1px solid ${COLORS.border}`,
  fontSize: 13,
  fontWeight: 700,
};

const productPriceStyle: CSSProperties = {
  marginTop: 10,
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 800,
  color: COLORS.black,
};

const selectionBadgeStyle = (isSelected: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  minHeight: 32,
  padding: '0 13px',
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 700,
  background: isSelected ? COLORS.blue : COLORS.blueSoft,
  color: isSelected ? COLORS.white : COLORS.blue,
  border: isSelected ? `1px solid ${COLORS.blue}` : `1px solid ${COLORS.border}`,
});

const summaryBoxStyle: CSSProperties = {
  padding: 16,
  borderRadius: 18,
  background: COLORS.blueSoft,
  border: `1px solid ${COLORS.border}`,
};

const basketBoxStyle: CSSProperties = {
  padding: 18,
  borderRadius: 22,
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  boxShadow: '0 10px 28px rgba(11, 29, 58, 0.08)',
};

const basketTopLineStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
  flexWrap: 'wrap',
};

const basketCounterStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 32,
  padding: '0 12px',
  borderRadius: 999,
  background: COLORS.navy,
  color: COLORS.white,
  fontSize: 14,
  fontWeight: 700,
};

const selectedCollectionGroupStyle: CSSProperties = {
  marginTop: 14,
  padding: 14,
  borderRadius: 18,
  background: COLORS.blueSoft,
  border: `1px solid ${COLORS.border}`,
};

const collectionHeaderRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  flexWrap: 'wrap',
};

const collectionPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 32,
  padding: '0 13px',
  borderRadius: 999,
  background: COLORS.navy,
  color: COLORS.white,
  fontSize: 14,
  fontWeight: 700,
};

const collectionCountStyle: CSSProperties = {
  color: COLORS.muted,
  fontSize: 14,
  fontWeight: 600,
};

const selectedItemsListStyle: CSSProperties = {
  display: 'grid',
  gap: 8,
  marginTop: 12,
};

const selectedItemRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
  borderRadius: 14,
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
};

const selectedItemNameStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: COLORS.text,
};

const selectedItemTypeStyle: CSSProperties = {
  marginTop: 2,
  fontSize: 13,
  color: COLORS.muted,
};

const selectedItemPriceStyle: CSSProperties = {
  flex: '0 0 auto',
  fontSize: 15,
  fontWeight: 800,
  color: COLORS.blue,
};

const collectionTotalStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  marginTop: 12,
  paddingTop: 12,
  borderTop: `1px solid ${COLORS.border}`,
  fontWeight: 800,
};

const grandTotalStyle: CSSProperties = {
  marginTop: 16,
  padding: 16,
  borderRadius: 18,
  background: COLORS.navy,
  color: COLORS.white,
};

const emptySelectionStyle: CSSProperties = {
  marginTop: 12,
  padding: 14,
  borderRadius: 16,
  background: COLORS.blueSoft,
  border: `1px dashed ${COLORS.border}`,
  color: COLORS.muted,
};

const basketActionsStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 10,
  marginTop: 16,
};

const SectionBox = ({ children }: { children: ReactNode }) => (
  <Box style={{ padding: 16 }}>{children}</Box>
);

const getImageUrl = (item: unknown) => {
  if (typeof item !== 'object' || item === null || !('imageUrl' in item)) {
    return '';
  }

  const value = (item as { imageUrl?: unknown }).imageUrl;

  return typeof value === 'string' ? value : '';
};

const CatalogImage = ({ imageUrl, imageKey, width = 190 }: CatalogImageProps) => {
  if (imageUrl) {
    return (
      <div style={photoFrameStyle(width)}>
        <img src={imageUrl} alt="" style={realPhotoStyle} />
      </div>
    );
  }

  return <CatalogIllustration imageKey={imageKey} width={width} />;
};

export const App = () => {
  const [startSection, setStartSection] = useState<StartSection | ''>('');
  const [customOrderType, setCustomOrderType] =
    useState<CustomOrderType>('product');

  const [printMethodId, setPrintMethodId] = useState<string>(
    PRINT_METHODS[0].id,
  );

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');
  const [selectedCollectionProductIds, setSelectedCollectionProductIds] =
    useState<string[]>([]);

  const [selectedTeamKitId, setSelectedTeamKitId] = useState<string>(
    TEAM_KITS[0].id,
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    INDIVIDUAL_PRODUCTS[0].id,
  );

  const [selectedUpper, setSelectedUpper] = useState<string>('');
  const [selectedSecondUpper, setSelectedSecondUpper] = useState<string>('');
  const [selectedAccessory, setSelectedAccessory] = useState<string>('');

  const [customerItemType, setCustomerItemType] = useState<string>(
    CUSTOMER_ITEM_TYPES[0],
  );
  const [selectedPrintZoneIds, setSelectedPrintZoneIds] = useState<string[]>([
    CUSTOMER_PRINT_ZONES[0].id,
  ]);

  const [quantityInput, setQuantityInput] = useState<string>('5');
  const [personalizationId, setPersonalizationId] = useState<string>('none');

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const quantity = useMemo(() => {
    const parsedQuantity = Number(quantityInput);

    if (!Number.isFinite(parsedQuantity) || parsedQuantity < 5) {
      return 5;
    }

    return Math.floor(parsedQuantity);
  }, [quantityInput]);

  const selectedStartSection = useMemo(
    () => START_SECTIONS.find((item) => item.id === startSection),
    [startSection],
  );

  const selectedPrintMethod = useMemo(
    () =>
      PRINT_METHODS.find((item) => item.id === printMethodId) ||
      PRINT_METHODS[0],
    [printMethodId],
  );

  const selectedCollection = useMemo(
    () => READY_COLLECTIONS.find((item) => item.id === selectedCollectionId),
    [selectedCollectionId],
  );

  const selectedCollectionProducts = useMemo(
    () =>
      selectedCollection
        ? selectedCollection.products.filter((product) =>
            selectedCollectionProductIds.includes(product.id),
          )
        : [],
    [selectedCollection, selectedCollectionProductIds],
  );

  const selectedCollectionGroups = useMemo(
    () =>
      READY_COLLECTIONS.map((collection) => {
        const products = collection.products.filter((product) =>
          selectedCollectionProductIds.includes(product.id),
        );

        const total = products.reduce((sum, product) => sum + product.price, 0);

        return {
          collection,
          products,
          total,
        };
      }).filter((group) => group.products.length > 0),
    [selectedCollectionProductIds],
  );

  const selectedProductsTotalCount = selectedCollectionGroups.reduce(
    (total, group) => total + group.products.length,
    0,
  );

  const selectedProductsGrandTotal = selectedCollectionGroups.reduce(
    (total, group) => total + group.total,
    0,
  );

  const hasSelectedCollectionProducts = selectedCollectionGroups.length > 0;

  const collectionNamesText =
    selectedCollectionGroups.length > 0
      ? selectedCollectionGroups
          .map((group) => group.collection.name)
          .join(', ')
      : selectedCollection?.name || '';

  const selectedCollectionItemsText =
    selectedCollectionGroups.length > 0
      ? selectedCollectionGroups
          .map(
            (group) =>
              `${group.collection.name}: ${group.products
                .map((product) => `${product.name} — ${formatPrice(product.price)}`)
                .join(', ')}. Итого: ${formatPrice(group.total)}`,
          )
          .join(' | ')
      : 'изделия не выбраны';

  const selectedTeamKit = useMemo(
    () =>
      TEAM_KITS.find((item) => item.id === selectedTeamKitId) || TEAM_KITS[0],
    [selectedTeamKitId],
  );

  const selectedProduct = useMemo(
    () =>
      INDIVIDUAL_PRODUCTS.find((item) => item.id === selectedProductId) ||
      INDIVIDUAL_PRODUCTS[0],
    [selectedProductId],
  );

  const selectedPersonalization = useMemo(
    () =>
      PERSONALIZATION.find((item) => item.id === personalizationId) ||
      PERSONALIZATION[0],
    [personalizationId],
  );

  const selectedPrintZones = useMemo(
    () =>
      CUSTOMER_PRINT_ZONES.filter((zone) =>
        selectedPrintZoneIds.includes(zone.id),
      ),
    [selectedPrintZoneIds],
  );

  const upperOptions = useMemo(
    () => [...selectedTeamKit.upperOptions],
    [selectedTeamKit],
  );

  const secondUpperOptions = useMemo(
    () => [...selectedTeamKit.secondUpperOptions],
    [selectedTeamKit],
  );

  const accessoryOptions = useMemo(
    () => [...selectedTeamKit.accessoryOptions],
    [selectedTeamKit],
  );

  const teamKitCalculation = calculateBaseTotal({
    basePrice: selectedTeamKit.price,
    personalizationPrice: selectedPersonalization.price,
    quantity,
    printMethodExtraPrice: selectedPrintMethod.extraPricePerPrintedItem,
    printedItemsCount: selectedTeamKit.printedItemsCount,
  });

  const productCalculation = calculateBaseTotal({
    basePrice: selectedProduct.price,
    personalizationPrice: selectedPersonalization.price,
    quantity,
    printMethodExtraPrice: selectedPrintMethod.extraPricePerPrintedItem,
    printedItemsCount: selectedProduct.printedItemsCount,
  });

  const customerPrintedItemsCount =
    selectedPrintZones.length > 0 ? selectedPrintZones.length : 1;

  const customerPrintCalculation = calculateCustomerPrintTotal({
    selectedZonePrices: selectedPrintZones.map((zone) => zone.price),
    personalizationPrice: selectedPersonalization.price,
    quantity,
    printMethodExtraPrice: selectedPrintMethod.extraPricePerPrintedItem,
    printedItemsCount: customerPrintedItemsCount,
  });

  const activeCalculation =
    startSection === 'team_kit'
      ? teamKitCalculation
      : customOrderType === 'product'
        ? productCalculation
        : customerPrintCalculation;

  const isCollectionsMode = startSection === 'collections';
  const isCustomOrderMode = startSection === 'custom_order';
  const isTeamKitMode = startSection === 'team_kit';

  const resultName = isCollectionsMode
    ? collectionNamesText || 'Готовые коллекции'
    : isTeamKitMode
      ? selectedTeamKit.name
      : customOrderType === 'product'
        ? selectedProduct.name
        : 'Печать на изделиях заказчика';

  const collectionProductsText = isCollectionsMode
    ? selectedCollectionItemsText
    : selectedCollectionProducts.length > 0
      ? selectedCollectionProducts.map((product) => product.name).join(', ')
      : selectedCollection
        ? 'изделия не выбраны'
        : 'коллекция не выбрана';

  const resultDescription = isCollectionsMode
    ? collectionProductsText
    : isTeamKitMode
      ? selectedTeamKit.composition
      : customOrderType === 'product'
        ? selectedProduct.description
        : selectedPrintZones.length > 0
          ? selectedPrintZones.map((zone) => zone.name).join(', ')
          : 'зоны нанесения не выбраны';

  const selectedItemsText = isCollectionsMode
    ? selectedCollectionItemsText
    : isTeamKitMode
      ? [selectedUpper, selectedSecondUpper, selectedAccessory]
          .filter(Boolean)
          .join(' + ')
      : customOrderType === 'product'
        ? selectedProduct.name
        : customerItemType;

  const shouldShowRequestBlocks = Boolean(
    startSection &&
      (!isCollectionsMode || selectedCollection || hasSelectedCollectionProducts),
  );

  function handleStartSectionSelect(sectionId: StartSection) {
    setStartSection(sectionId);
    setIsSent(false);

    if (sectionId === 'collections') {
      setSelectedCollectionId('');
      setSelectedCollectionProductIds([]);
    }
  }

  function handleCollectionSelect(collectionId: string) {
    setSelectedCollectionId(collectionId);
    setIsSent(false);
  }

  function handleAddFromAnotherCollection() {
    setSelectedCollectionId('');
    setIsSent(false);
  }

  function toggleCollectionProduct(productId: string) {
    setSelectedCollectionProductIds((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }

      return [...current, productId];
    });

    setIsSent(false);
  }

  function handleTeamKitSelect(kitId: string) {
    const kit = TEAM_KITS.find((item) => item.id === kitId) || TEAM_KITS[0];

    const nextUpperOptions = [...kit.upperOptions];
    const nextSecondUpperOptions = [...kit.secondUpperOptions];
    const nextAccessoryOptions = [...kit.accessoryOptions];

    setSelectedTeamKitId(kit.id);
    setSelectedUpper(nextUpperOptions[0] || '');
    setSelectedSecondUpper(nextSecondUpperOptions[0] || '');
    setSelectedAccessory(nextAccessoryOptions[0] || '');
    setIsSent(false);
  }

  function togglePrintZone(zoneId: string) {
    setSelectedPrintZoneIds((current) => {
      if (current.includes(zoneId)) {
        return current.filter((id) => id !== zoneId);
      }

      return [...current, zoneId];
    });

    setIsSent(false);
  }

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      alert('Укажите имя и телефон');
      return;
    }

    if (isCollectionsMode && selectedCollectionProductIds.length === 0) {
      alert('Выберите хотя бы одно изделие из коллекции');
      return;
    }

    if (
      startSection === 'custom_order' &&
      customOrderType === 'customer_print' &&
      selectedPrintZoneIds.length === 0 &&
      selectedPersonalization.price === 0
    ) {
      alert('Выберите хотя бы одну зону нанесения или персонализацию');
      return;
    }

    setIsSending(true);

    await sendLead({
      name,
      phone,
      vk: '',
      teamName: isCollectionsMode ? '' : teamName,
      calculationType: selectedStartSection?.name || '',
      setName: resultName,
      selectedItems: selectedItemsText,
      garmentOwner:
        startSection === 'custom_order' && customOrderType === 'customer_print'
          ? 'Изделия заказчика'
          : 'Изделия ЮлайК',
      printMethod: isCollectionsMode ? '' : selectedPrintMethod.name,
      printType: resultDescription,
      personalization: isCollectionsMode ? '' : selectedPersonalization.name,
      quantity: isCollectionsMode ? selectedProductsTotalCount : activeCalculation.quantity,
      pricePerSet: isCollectionsMode ? '' : activeCalculation.pricePerItem,
      total: isCollectionsMode ? selectedProductsGrandTotal : activeCalculation.total,
      comment,
    });

    setIsSending(false);
    setIsSent(true);
  }

  return (
    <Panel id="main" style={pageStyle}>
      <PanelHeader>ЮлайК</PanelHeader>

      <div style={pageShellStyle}>
        <div style={heroStyle}>
          <div style={heroLabelStyle}>Каталог готовых коллекций и расчёт заказов</div>

          <Text style={{ marginTop: 14, maxWidth: 760, color: '#D9E4FF' }}>
            Сначала выберите готовую коллекцию или нужный формат заказа.
            <br />
            Калькулятор поможет быстро собрать заявку, а мы уточним наличие,
            цвета, сроки и технические детали.
          </Text>
        </div>

        <Group header={<Header>1. Выберите раздел</Header>} style={groupStyle}>
          <SectionBox>
            <div style={rowStyle}>
              {START_SECTIONS.map((section) => (
                <Card
                  key={section.id}
                  mode="shadow"
                  style={smallCardStyle(startSection === section.id)}
                  onClick={() =>
                    handleStartSectionSelect(section.id as StartSection)
                  }
                >
                  <CatalogImage
                    imageKey={section.imageKey}
                    imageUrl={getImageUrl(section)}
                    width={190}
                  />

                  <Title level="3" style={{ marginTop: 12 }}>
                    {section.name}
                  </Title>

                  <Text style={{ marginTop: 6 }}>{section.description}</Text>
                </Card>
              ))}
            </div>
          </SectionBox>
        </Group>

        {startSection && !isCollectionsMode && (
          <Group header={<Header>2. Тип нанесения</Header>} style={groupStyle}>
            <SectionBox>
              <div style={rowStyle}>
                {PRINT_METHODS.map((method) => (
                  <Card
                    key={method.id}
                    mode="shadow"
                    style={smallCardStyle(printMethodId === method.id)}
                    onClick={() => {
                      setPrintMethodId(method.id);
                      setIsSent(false);
                    }}
                  >
                    <Title level="3">{method.name}</Title>

                    <Text style={{ marginTop: 8 }}>{method.description}</Text>

                    <Text style={{ marginTop: 10, fontWeight: 600 }}>
                      {method.extraPricePerPrintedItem > 0
                        ? `+${formatPrice(method.extraPricePerPrintedItem)} за изделие с нанесением`
                        : 'Без доплаты'}
                    </Text>
                  </Card>
                ))}
              </div>
            </SectionBox>
          </Group>
        )}

        {isCollectionsMode && (
          <>
            <Group
              header={<Header>2. Готовые коллекции</Header>}
              style={groupStyle}
            >
              <SectionBox>
                <Text style={sectionNoteStyle}>
                  Выберите коллекцию. После этого откроется каталог изделий
                  именно этой коллекции.
                </Text>
              </SectionBox>

              <SectionBox>
                <div style={rowStyle}>
                  {READY_COLLECTIONS.map((collection) => (
                    <Card
                      key={collection.id}
                      mode="shadow"
                      style={smallCardStyle(
                        selectedCollectionId === collection.id,
                      )}
                      onClick={() => handleCollectionSelect(collection.id)}
                    >
                      <CatalogImage
                        imageKey={collection.imageKey}
                        imageUrl={getImageUrl(collection)}
                        width={190}
                      />

                      <Title level="3" style={{ marginTop: 12 }}>
                        {collection.name}
                      </Title>

                      <Text style={{ marginTop: 6 }}>
                        {collection.description}
                      </Text>

                      <Text
                        style={{
                          marginTop: 8,
                          fontWeight: 700,
                          color: COLORS.blue,
                        }}
                      >
                        {collection.priceLabel}
                      </Text>
                    </Card>
                  ))}
                </div>
              </SectionBox>
            </Group>

            {selectedCollection && (
              <Group
                header={<Header>3. Каталог коллекции</Header>}
                style={groupStyle}
              >
                <SectionBox>
                  <Button
                    mode="secondary"
                    onClick={() => {
                      setSelectedCollectionId('');
                      setIsSent(false);
                    }}
                  >
                    ← Назад к коллекциям
                  </Button>

                  <Title level="3" style={{ marginTop: 16 }}>
                    {selectedCollection.name}
                  </Title>

                  <Text style={{ marginTop: 8 }}>
                    {selectedCollection.description}
                  </Text>
                </SectionBox>

                <SectionBox>
                  <div style={productGridStyle}>
                    {selectedCollection.products.map((product) => {
                      const isSelected = selectedCollectionProductIds.includes(
                        product.id,
                      );

                      return (
                        <Card
                          key={product.id}
                          mode="shadow"
                          style={productCardStyle(isSelected)}
                          onClick={() => toggleCollectionProduct(product.id)}
                        >
                          <CatalogImage
                            imageKey={product.imageKey}
                            imageUrl={getImageUrl(product)}
                            width={220}
                          />

                          <div style={productTitleRowStyle}>
                            <span style={productMetaStyle}>{product.type}</span>

                            <Title level="3">{product.name}</Title>

                            <span style={selectionBadgeStyle(isSelected)}>
                              {isSelected ? '✓ Выбрано' : 'Выбрать'}
                            </span>
                          </div>

                          <Text style={{ marginTop: 8 }}>
                            {product.description}
                          </Text>

                          <div style={productPriceStyle}>
                            {formatPrice(product.price)}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </SectionBox>

                <SectionBox>
                  <Button
                    mode="outline"
                    stretched
                    onClick={handleAddFromAnotherCollection}
                  >
                    + Добавить из другой коллекции
                  </Button>
                </SectionBox>
              </Group>
            )}
          </>
        )}

        {isCustomOrderMode && (
          <>
            <Group
              header={<Header>3. Что нужно рассчитать?</Header>}
              style={groupStyle}
            >
              <SectionBox>
                <div style={rowStyle}>
                  <Card
                    mode="shadow"
                    style={smallCardStyle(customOrderType === 'product')}
                    onClick={() => {
                      setCustomOrderType('product');
                      setIsSent(false);
                    }}
                  >
                    <CatalogImage imageKey="single" width={190} />

                    <Title level="3" style={{ marginTop: 12 }}>
                      Один вид изделий
                    </Title>

                    <Text style={{ marginTop: 6 }}>
                      Если нужны только футболки, худи, шоперы, мешки, сумки или
                      рюкзаки с логотипом.
                    </Text>
                  </Card>

                  <Card
                    mode="shadow"
                    style={smallCardStyle(
                      customOrderType === 'customer_print',
                    )}
                    onClick={() => {
                      setCustomOrderType('customer_print');
                      setIsSent(false);
                    }}
                  >
                    <CatalogImage imageKey="customerPrint" width={190} />

                    <Title level="3" style={{ marginTop: 12 }}>
                      Печать на ваших изделиях
                    </Title>

                    <Text style={{ marginTop: 6 }}>
                      Если вещи уже есть, а нужно только нанести логотип, имя,
                      номер или принт.
                    </Text>
                  </Card>
                </div>
              </SectionBox>
            </Group>

            {customOrderType === 'product' && (
              <Group
                header={<Header>4. Выберите изделие</Header>}
                style={groupStyle}
              >
                <SectionBox>
                  <div style={rowStyle}>
                    {INDIVIDUAL_PRODUCTS.map((product) => (
                      <Card
                        key={product.id}
                        mode="shadow"
                        style={smallCardStyle(selectedProductId === product.id)}
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setIsSent(false);
                        }}
                      >
                        <CatalogImage
                          imageKey={product.imageKey}
                          imageUrl={getImageUrl(product)}
                          width={190}
                        />

                        <Title level="3" style={{ marginTop: 12 }}>
                          {product.name}
                        </Title>

                        <Text style={{ marginTop: 6 }}>
                          {product.description}
                        </Text>

                        <Text
                          style={{
                            marginTop: 8,
                            fontWeight: 700,
                            color: COLORS.blue,
                          }}
                        >
                          от {formatPrice(product.price)}
                        </Text>
                      </Card>
                    ))}
                  </div>
                </SectionBox>

                <SectionBox>
                  <Text style={sectionNoteStyle}>
                    Цена указана за изделие ЮлайК с одним нанесением логотипа /
                    бренда. Персонализация считается отдельно.
                  </Text>
                </SectionBox>
              </Group>
            )}

            {customOrderType === 'customer_print' && (
              <>
                <Group
                  header={<Header>4. На чём печатаем?</Header>}
                  style={groupStyle}
                >
                  <FormItem top="Тип изделия заказчика">
                    <Select
                      value={customerItemType}
                      onChange={(event) => {
                        setCustomerItemType(event.target.value);
                        setIsSent(false);
                      }}
                      options={CUSTOMER_ITEM_TYPES.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    />
                  </FormItem>
                </Group>

                <Group
                  header={<Header>5. Где нужно нанесение?</Header>}
                  style={groupStyle}
                >
                  <SectionBox>
                    <div style={rowStyle}>
                      {CUSTOMER_PRINT_ZONES.map((zone) => {
                        const isSelected = selectedPrintZoneIds.includes(
                          zone.id,
                        );

                        return (
                          <Card
                            key={zone.id}
                            mode="shadow"
                            style={smallCardStyle(isSelected)}
                            onClick={() => togglePrintZone(zone.id)}
                          >
                            <CatalogImage
                              imageKey={zone.imageKey}
                              imageUrl={getImageUrl(zone)}
                              width={190}
                            />

                            <div style={productTitleRowStyle}>
                              <Title level="3">{zone.name}</Title>

                              <span style={selectionBadgeStyle(isSelected)}>
                                {isSelected ? '✓ Выбрано' : 'Выбрать'}
                              </span>
                            </div>

                            <Text style={{ marginTop: 8 }}>
                              {zone.description}
                            </Text>

                            <Text
                              style={{
                                marginTop: 8,
                                fontWeight: 700,
                                color: COLORS.blue,
                              }}
                            >
                              +{formatPrice(zone.price)}
                            </Text>
                          </Card>
                        );
                      })}
                    </div>
                  </SectionBox>

                  <SectionBox>
                    <Text style={sectionNoteStyle}>
                      Стоимость считается по выбранным зонам нанесения. Перед
                      запуском мы проверяем ткань, швы, молнии, карманы и зону
                      печати.
                    </Text>
                  </SectionBox>
                </Group>
              </>
            )}
          </>
        )}

        {isTeamKitMode && (
          <>
            <Group
              header={<Header>3. Выберите комплект для команды</Header>}
              style={groupStyle}
            >
              <SectionBox>
                <div style={rowStyle}>
                  {TEAM_KITS.map((kit) => (
                    <Card
                      key={kit.id}
                      mode="shadow"
                      style={smallCardStyle(selectedTeamKitId === kit.id)}
                      onClick={() => handleTeamKitSelect(kit.id)}
                    >
                      <CatalogImage
                        imageKey={kit.imageKey}
                        imageUrl={getImageUrl(kit)}
                        width={190}
                      />

                      <Title level="3" style={{ marginTop: 12 }}>
                        {kit.name}
                      </Title>

                      <Text style={{ marginTop: 6 }}>{kit.description}</Text>

                      <Text
                        style={{
                          marginTop: 8,
                          fontWeight: 700,
                          color: COLORS.blue,
                        }}
                      >
                        от {formatPrice(kit.price)}
                      </Text>

                      <Text style={sectionNoteStyle}>{kit.composition}</Text>
                    </Card>
                  ))}
                </div>
              </SectionBox>
            </Group>

            <Group
              header={<Header>4. Уточните состав</Header>}
              style={groupStyle}
            >
              {upperOptions.length > 0 && (
                <FormItem top="Верх 1">
                  <Select
                    value={selectedUpper || upperOptions[0] || ''}
                    onChange={(event) => {
                      setSelectedUpper(event.target.value);
                      setIsSent(false);
                    }}
                    options={upperOptions.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </FormItem>
              )}

              {secondUpperOptions.length > 0 && (
                <FormItem top="Верх 2">
                  <Select
                    value={selectedSecondUpper || secondUpperOptions[0] || ''}
                    onChange={(event) => {
                      setSelectedSecondUpper(event.target.value);
                      setIsSent(false);
                    }}
                    options={secondUpperOptions.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </FormItem>
              )}

              {accessoryOptions.length > 0 && (
                <FormItem top="Дополнение">
                  <Select
                    value={selectedAccessory || accessoryOptions[0] || ''}
                    onChange={(event) => {
                      setSelectedAccessory(event.target.value);
                      setIsSent(false);
                    }}
                    options={accessoryOptions.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </FormItem>
              )}

              <SectionBox>
                <Text style={sectionNoteStyle}>
                  В базовую стоимость входит нанесение на каждое изделие
                  комплекта. Имена, фамилии, номера и дополнительные принты
                  считаются отдельно.
                </Text>
              </SectionBox>
            </Group>
          </>
        )}

        {startSection && !isCollectionsMode && (
          <Group
            header={<Header>Количество и персонализация</Header>}
            style={groupStyle}
          >
            <FormItem top="Количество">
              <Input
                type="text"
                inputMode="numeric"
                value={quantityInput}
                onChange={(event) => {
                  const onlyDigits = event.target.value.replace(/\D/g, '');
                  setQuantityInput(onlyDigits);
                  setIsSent(false);
                }}
                onBlur={() => {
                  const parsedQuantity = Number(quantityInput);

                  if (!Number.isFinite(parsedQuantity) || parsedQuantity < 5) {
                    setQuantityInput('5');
                    return;
                  }

                  setQuantityInput(String(Math.floor(parsedQuantity)));
                }}
              />
            </FormItem>

            <SectionBox>
              <Text style={sectionNoteStyle}>
                Минимальный заказ — от 5 штук. Если оставить поле пустым или
                ввести меньше 5, калькулятор вернёт минимальное количество.
              </Text>
            </SectionBox>

            <FormItem top="Персонализация">
              <Select
                value={personalizationId}
                onChange={(event) => {
                  setPersonalizationId(event.target.value);
                  setIsSent(false);
                }}
                options={PERSONALIZATION.map((item) => ({
                  label:
                    item.price > 0
                      ? `${item.name} +${item.price} ₽`
                      : item.name,
                  value: item.id,
                }))}
              />
            </FormItem>
          </Group>
        )}

        {shouldShowRequestBlocks && (
          <Group
            header={
              <Header>
                {isCollectionsMode
                  ? 'Ваш выбор'
                  : 'Итоговая стоимость'}
              </Header>
            }
            style={groupStyle}
          >
            <SectionBox>
              {isCollectionsMode ? (
                <div style={basketBoxStyle}>
                  <div style={basketTopLineStyle}>
                    <div>
                      <Text style={{ color: COLORS.muted, fontWeight: 700 }}>
                        Корзина-заявка
                      </Text>

                      <Title level="2" style={{ marginTop: 6 }}>
                        Выбранные изделия
                      </Title>
                    </div>

                    <span style={basketCounterStyle}>
                      {selectedProductsTotalCount} поз.
                    </span>
                  </div>

                  <Text style={{ marginTop: 10, color: COLORS.muted }}>
                    Можно выбрать изделия из одной или нескольких коллекций.
                    Мы проверим наличие, покажем варианты принтов и уточним
                    стоимость.
                  </Text>

                  {selectedCollectionGroups.length > 0 ? (
                    <>
                      {selectedCollectionGroups.map((group) => (
                        <div
                          key={group.collection.id}
                          style={selectedCollectionGroupStyle}
                        >
                          <div style={collectionHeaderRowStyle}>
                            <span style={collectionPillStyle}>
                              {group.collection.name}
                            </span>

                            <span style={collectionCountStyle}>
                              {group.products.length} поз.
                            </span>
                          </div>

                          <div style={selectedItemsListStyle}>
                            {group.products.map((product) => (
                              <div key={product.id} style={selectedItemRowStyle}>
                                <div>
                                  <div style={selectedItemNameStyle}>
                                    {product.name}
                                  </div>

                                  <div style={selectedItemTypeStyle}>
                                    {product.type}
                                  </div>
                                </div>

                                <div style={selectedItemPriceStyle}>
                                  {formatPrice(product.price)}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div style={collectionTotalStyle}>
                            <span>Итого по коллекции</span>
                            <span>{formatPrice(group.total)}</span>
                          </div>
                        </div>
                      ))}

                      <div style={grandTotalStyle}>
                        <Text style={{ color: '#D9E4FF', fontWeight: 700 }}>
                          Предварительная сумма
                        </Text>

                        <Title level="1" style={{ marginTop: 4, color: COLORS.white }}>
                          {formatPrice(selectedProductsGrandTotal)}
                        </Title>

                        <Text style={{ marginTop: 6, color: '#D9E4FF' }}>
                          Итоговая стоимость может уточняться по наличию,
                          цветам и выбранному варианту нанесения.
                        </Text>
                      </div>

                      <div style={basketActionsStyle}>
                        <Button
                          mode="outline"
                          stretched
                          onClick={handleAddFromAnotherCollection}
                        >
                          + Добавить из другой коллекции
                        </Button>

                        <Button
                          mode="secondary"
                          stretched
                          onClick={() => {
                            setSelectedCollectionProductIds([]);
                            setIsSent(false);
                          }}
                        >
                          Очистить выбор
                        </Button>
                      </div>

                      <Text style={{ marginTop: 14, color: COLORS.muted }}>
                        Оставьте заявку — мы свяжемся и уточним наличие, цвета
                        и стоимость.
                      </Text>
                    </>
                  ) : (
                    <div style={emptySelectionStyle}>
                      Вы пока не выбрали изделия. Нажмите «Выбрать» на нужных
                      карточках выше.
                    </div>
                  )}
                </div>
              ) : (
                <div style={summaryBoxStyle}>
                  <Text>Раздел: {selectedStartSection?.name || ''}</Text>
                  <Text>Позиция: {resultName}</Text>
                  <Text>Тип нанесения: {selectedPrintMethod.name}</Text>
                  <Text>Состав / нанесение: {resultDescription}</Text>
                  <Text>Выбранные изделия: {selectedItemsText || '—'}</Text>
                  <Text>Количество: {activeCalculation.quantity} шт.</Text>
                  <Text>Персонализация: {selectedPersonalization.name}</Text>

                  <Title level="2" style={{ marginTop: 16 }}>
                    {formatPrice(activeCalculation.total)}
                  </Title>

                  <Text style={{ marginTop: 8 }}>
                    Цена за 1 шт. / комплект:{' '}
                    {formatPrice(activeCalculation.pricePerItem)}
                  </Text>

                  {activeCalculation.printMethodExtra > 0 && (
                    <Text style={{ marginTop: 8 }}>
                      Доплата за вышивку:{' '}
                      {formatPrice(activeCalculation.printMethodExtra)} за 1
                      шт. / комплект
                    </Text>
                  )}

                  <Text style={{ marginTop: 12 }}>
                    Расчёт предварительный, но фиксированный по выбранным
                    параметрам. Перед запуском мы проверим макет, ткань и
                    техническую возможность нанесения.
                  </Text>
                </div>
              )}
            </SectionBox>
          </Group>
        )}

        {shouldShowRequestBlocks && (
          <Group header={<Header>Оставить заявку</Header>} style={groupStyle}>
            {isSent ? (
              <SectionBox>
                <Title level="2">Заявка отправлена</Title>
                <Text style={{ marginTop: 8 }}>
                  Мы проверим детали и подтвердим заказ.
                </Text>
              </SectionBox>
            ) : (
              <>
                <SectionBox>
                  <Text style={sectionNoteStyle}>
                    Оставьте контакты. Мы свяжемся, уточним наличие, цвета,
                    сроки и подготовим заказ к запуску.
                  </Text>
                </SectionBox>

                <FormItem top="Ваше имя">
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Например, Анастасия"
                  />
                </FormItem>

                <FormItem top="Телефон">
                  <Input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+7..."
                  />
                </FormItem>

                {!isCollectionsMode && (
                  <FormItem top="Название команды / коллектива / мероприятия">
                    <Input
                      value={teamName}
                      onChange={(event) => setTeamName(event.target.value)}
                      placeholder="Например, НОВА"
                    />
                  </FormItem>
                )}

                <FormItem top="Комментарий">
                  <Textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder={
                      isCollectionsMode
                        ? 'Например: интересует шопер и футболка из разных коллекций'
                        : 'Например: нужны белые футболки, логотип есть'
                    }
                  />
                </FormItem>

                <SectionBox>
                  <Button
                    size="l"
                    stretched
                    loading={isSending}
                    onClick={handleSubmit}
                  >
                    Отправить заявку
                  </Button>
                </SectionBox>
              </>
            )}
          </Group>
        )}
      </div>
    </Panel>
  );
};