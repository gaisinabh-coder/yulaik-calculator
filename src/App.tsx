import { type ReactNode, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
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

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;

const cardStyle = (isSelected: boolean) => ({
  padding: 14,
  cursor: 'pointer',
  border: isSelected ? '2px solid #2688EB' : '2px solid transparent',
});

const sectionNoteStyle = {
  marginTop: 8,
  color: '#6D7885',
};

const rowStyle = {
  display: 'flex',
  gap: 12,
  overflowX: 'auto',
  paddingBottom: 8,
};

const smallCardStyle = (isSelected: boolean) => ({
  ...cardStyle(isSelected),
  minWidth: 220,
  flex: '0 0 220px',
});

const SectionBox = ({ children }: { children: ReactNode }) => (
  <Box style={{ padding: 16 }}>{children}</Box>
);

export const App = () => {
  const [startSection, setStartSection] = useState<StartSection | ''>('');
  const [customOrderType, setCustomOrderType] =
    useState<CustomOrderType>('product');

  const [printMethodId, setPrintMethodId] = useState(PRINT_METHODS[0].id);

  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [selectedCollectionProductIds, setSelectedCollectionProductIds] =
    useState<string[]>([]);

  const [selectedTeamKitId, setSelectedTeamKitId] = useState(TEAM_KITS[0].id);
  const [selectedProductId, setSelectedProductId] = useState(
    INDIVIDUAL_PRODUCTS[0].id,
  );

  const [selectedUpper, setSelectedUpper] = useState('');
  const [selectedSecondUpper, setSelectedSecondUpper] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState('');

  const [customerItemType, setCustomerItemType] = useState(
    CUSTOMER_ITEM_TYPES[0],
  );
  const [selectedPrintZoneIds, setSelectedPrintZoneIds] = useState<string[]>([
    CUSTOMER_PRINT_ZONES[0].id,
  ]);

  const [quantityInput, setQuantityInput] = useState('5');
  const [personalizationId, setPersonalizationId] = useState('none');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [teamName, setTeamName] = useState('');
  const [comment, setComment] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
    ? selectedCollection?.name || ''
    : isTeamKitMode
      ? selectedTeamKit.name
      : customOrderType === 'product'
        ? selectedProduct.name
        : 'Печать на изделиях заказчика';

  const collectionProductsText =
    selectedCollectionProducts.length > 0
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
    ? collectionProductsText
    : isTeamKitMode
      ? [selectedUpper, selectedSecondUpper, selectedAccessory]
          .filter(Boolean)
          .join(' + ')
      : customOrderType === 'product'
        ? selectedProduct.name
        : customerItemType;

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
    setSelectedCollectionProductIds([]);
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

    setSelectedTeamKitId(kit.id);
    setSelectedUpper(kit.upperOptions[0] || '');
    setSelectedSecondUpper(kit.secondUpperOptions[0] || '');
    setSelectedAccessory(kit.accessoryOptions[0] || '');
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

    if (isCollectionsMode && !selectedCollection) {
      alert('Выберите коллекцию');
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
      quantity: isCollectionsMode ? '' : activeCalculation.quantity,
      pricePerSet: isCollectionsMode ? '' : activeCalculation.pricePerItem,
      total: isCollectionsMode ? '' : activeCalculation.total,
      comment,
    });

    setIsSending(false);
    setIsSent(true);
  }

  return (
    <Panel id="main">
      <PanelHeader>ЮлайК</PanelHeader>

      <Group>
        <SectionBox>
          <Title level="1">Калькулятор ЮлайК</Title>
          <Text style={{ marginTop: 8 }}>
            Выберите нужный раздел: посмотреть готовые коллекции, рассчитать
            индивидуальный заказ или комплект для команды.
          </Text>
        </SectionBox>
      </Group>

      <Group header={<Header>1. Выберите раздел</Header>}>
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
                <CatalogIllustration imageKey={section.imageKey} width={190} />

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
        <Group header={<Header>2. Тип нанесения</Header>}>
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
          <Group header={<Header>2. Готовые коллекции</Header>}>
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
                    <CatalogIllustration
                      imageKey={collection.imageKey}
                      width={190}
                    />

                    <Title level="3" style={{ marginTop: 12 }}>
                      {collection.name}
                    </Title>

                    <Text style={{ marginTop: 6 }}>
                      {collection.description}
                    </Text>

                    <Text style={{ marginTop: 8, fontWeight: 600 }}>
                      {collection.priceLabel}
                    </Text>
                  </Card>
                ))}
              </div>
            </SectionBox>
          </Group>

          {selectedCollection && (
            <Group header={<Header>3. Каталог коллекции</Header>}>
              <SectionBox>
                <Button
                  mode="secondary"
                  onClick={() => {
                    setSelectedCollectionId('');
                    setSelectedCollectionProductIds([]);
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
                <div style={rowStyle}>
                  {selectedCollection.products.map((product) => {
                    const isSelected = selectedCollectionProductIds.includes(
                      product.id,
                    );

                    return (
                      <Card
                        key={product.id}
                        mode="shadow"
                        style={smallCardStyle(isSelected)}
                        onClick={() => toggleCollectionProduct(product.id)}
                      >
                        <CatalogIllustration
                          imageKey={product.imageKey}
                          width={190}
                        />

                        <Checkbox
                          checked={isSelected}
                          style={{ pointerEvents: 'none' }}
                          onChange={() => {}}
                        >
                          {product.name}
                        </Checkbox>

                        <Text style={{ marginTop: 6 }}>
                          {product.description}
                        </Text>
                      </Card>
                    );
                  })}
                </div>
              </SectionBox>
            </Group>
          )}
        </>
      )}

      {isCustomOrderMode && (
        <>
          <Group header={<Header>3. Что нужно рассчитать?</Header>}>
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
                  <CatalogIllustration imageKey="single" width={190} />

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
                  style={smallCardStyle(customOrderType === 'customer_print')}
                  onClick={() => {
                    setCustomOrderType('customer_print');
                    setIsSent(false);
                  }}
                >
                  <CatalogIllustration imageKey="customerPrint" width={190} />

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
            <Group header={<Header>4. Выберите изделие</Header>}>
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
                      <CatalogIllustration
                        imageKey={product.imageKey}
                        width={190}
                      />

                      <Title level="3" style={{ marginTop: 12 }}>
                        {product.name}
                      </Title>

                      <Text style={{ marginTop: 6 }}>
                        {product.description}
                      </Text>

                      <Text style={{ marginTop: 8, fontWeight: 600 }}>
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
              <Group header={<Header>4. На чём печатаем?</Header>}>
                <FormItem top="Тип изделия заказчика">
                  <Select
                    value={customerItemType}
                    onChange={(event) =>
                      setCustomerItemType(
                        event.target
                          .value as (typeof CUSTOMER_ITEM_TYPES)[number],
                      )
                    }
                    options={CUSTOMER_ITEM_TYPES.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </FormItem>
              </Group>

              <Group header={<Header>5. Где нужно нанесение?</Header>}>
                <SectionBox>
                  <div style={rowStyle}>
                    {CUSTOMER_PRINT_ZONES.map((zone) => {
                      const isSelected = selectedPrintZoneIds.includes(zone.id);

                      return (
                        <Card
                          key={zone.id}
                          mode="shadow"
                          style={smallCardStyle(isSelected)}
                          onClick={() => togglePrintZone(zone.id)}
                        >
                          <CatalogIllustration
                            imageKey={zone.imageKey}
                            width={190}
                          />

                          <Checkbox
                            checked={isSelected}
                            style={{ pointerEvents: 'none' }}
                            onChange={() => {}}
                          >
                            {zone.name}
                          </Checkbox>

                          <Text style={{ marginTop: 6 }}>
                            {zone.description}
                          </Text>

                          <Text style={{ marginTop: 8, fontWeight: 600 }}>
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
          <Group header={<Header>3. Выберите комплект для команды</Header>}>
            <SectionBox>
              <div style={rowStyle}>
                {TEAM_KITS.map((kit) => (
                  <Card
                    key={kit.id}
                    mode="shadow"
                    style={smallCardStyle(selectedTeamKitId === kit.id)}
                    onClick={() => handleTeamKitSelect(kit.id)}
                  >
                    <CatalogIllustration imageKey={kit.imageKey} width={190} />

                    <Title level="3" style={{ marginTop: 12 }}>
                      {kit.name}
                    </Title>

                    <Text style={{ marginTop: 6 }}>{kit.description}</Text>

                    <Text style={{ marginTop: 8, fontWeight: 600 }}>
                      от {formatPrice(kit.price)}
                    </Text>

                    <Text style={sectionNoteStyle}>{kit.composition}</Text>
                  </Card>
                ))}
              </div>
            </SectionBox>
          </Group>

          <Group header={<Header>4. Уточните состав</Header>}>
            {selectedTeamKit.upperOptions.length > 0 && (
              <FormItem top="Верх 1">
                <Select
                  value={selectedUpper || selectedTeamKit.upperOptions[0]}
                  onChange={(event) => {
                    setSelectedUpper(event.target.value);
                    setIsSent(false);
                  }}
                  options={selectedTeamKit.upperOptions.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </FormItem>
            )}

            {selectedTeamKit.secondUpperOptions.length > 0 && (
              <FormItem top="Верх 2">
                <Select
                  value={
                    selectedSecondUpper ||
                    selectedTeamKit.secondUpperOptions[0]
                  }
                  onChange={(event) => {
                    setSelectedSecondUpper(event.target.value);
                    setIsSent(false);
                  }}
                  options={selectedTeamKit.secondUpperOptions.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </FormItem>
            )}

            {selectedTeamKit.accessoryOptions.length > 0 && (
              <FormItem top="Дополнение">
                <Select
                  value={
                    selectedAccessory || selectedTeamKit.accessoryOptions[0]
                  }
                  onChange={(event) => {
                    setSelectedAccessory(event.target.value);
                    setIsSent(false);
                  }}
                  options={selectedTeamKit.accessoryOptions.map((item) => ({
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
        <Group header={<Header>Количество и персонализация</Header>}>
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

      {startSection && (!isCollectionsMode || selectedCollection) && (
        <Group
          header={
            <Header>
              {isCollectionsMode ? 'Выбранная коллекция' : 'Итоговая стоимость'}
            </Header>
          }
        >
          <SectionBox>
            <Text>Раздел: {selectedStartSection?.name || ''}</Text>
            <Text>Позиция: {resultName}</Text>

            {!isCollectionsMode && (
              <Text>Тип нанесения: {selectedPrintMethod.name}</Text>
            )}

            <Text>Состав / нанесение: {resultDescription}</Text>
            <Text>Выбранные изделия: {selectedItemsText || '—'}</Text>

            {!isCollectionsMode && (
              <>
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
                    {formatPrice(activeCalculation.printMethodExtra)} за 1 шт.
                    / комплект
                  </Text>
                )}
              </>
            )}

            {isCollectionsMode && (
              <Text style={{ marginTop: 12 }}>
                Это раздел просмотра готовых коллекций. Выберите интересующие
                изделия и оставьте заявку — мы свяжемся и уточним наличие,
                цвета и стоимость.
              </Text>
            )}

            {!isCollectionsMode && (
              <Text style={{ marginTop: 12 }}>
                Расчёт предварительный, но фиксированный по выбранным
                параметрам. Перед запуском мы проверим макет, ткань и
                техническую возможность нанесения.
              </Text>
            )}
          </SectionBox>
        </Group>
      )}

      {startSection && (!isCollectionsMode || selectedCollection) && (
        <Group header={<Header>Оставить заявку</Header>}>
          {isSent ? (
            <SectionBox>
              <Title level="2">Заявка отправлена</Title>
              <Text style={{ marginTop: 8 }}>
                Мы проверим детали и подтвердим заказ.
              </Text>
            </SectionBox>
          ) : (
            <>
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
                      ? 'Например: интересует шопер и футболка, нужны фото и наличие'
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
    </Panel>
  );
};