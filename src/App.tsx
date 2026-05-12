import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardGrid,
  Div,
  FormItem,
  Group,
  Header,
  Input,
  Panel,
  PanelHeader,
  Radio,
  Select,
  Text,
  Textarea,
  Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { SETS, PERSONALIZATION } from './data/catalog';
import { calculateTotal } from './utils/calculate';
import { sendLead } from './api/sendLead';

type GarmentOwner = 'yulaik' | 'client';

export const App = () => {
  const [selectedSetId, setSelectedSetId] = useState(SETS[0].id);
  const [quantity, setQuantity] = useState(10);
  const [garmentOwner, setGarmentOwner] = useState<GarmentOwner>('yulaik');
  const [printType, setPrintType] = useState('Полноцветная печать');
  const [personalizationId, setPersonalizationId] = useState('name');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [teamName, setTeamName] = useState('');
  const [comment, setComment] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const selectedSet = useMemo(
    () => SETS.find((item) => item.id === selectedSetId) || SETS[0],
    [selectedSetId],
  );

  const selectedPersonalization = useMemo(
    () =>
      PERSONALIZATION.find((item) => item.id === personalizationId) ||
      PERSONALIZATION[0],
    [personalizationId],
  );

  const calculation = calculateTotal({
    basePrice: selectedSet.price,
    personalizationPrice: selectedPersonalization.price,
    quantity,
    garmentOwner,
  });

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      alert('Укажите имя и телефон');
      return;
    }

    setIsSending(true);

    await sendLead({
      name,
      phone,
      vk: '',
      teamName,
      setName: selectedSet.name,
      quantity,
      garmentOwner:
        garmentOwner === 'yulaik' ? 'Изделия ЮлайК' : 'Изделия клиента',
      printType,
      personalization: selectedPersonalization.name,
      pricePerSet: calculation.pricePerSet,
      total: calculation.total,
      comment,
    });

    setIsSending(false);
    setIsSent(true);
  }

  return (
    <Panel id="main">
      <PanelHeader>ЮлайК</PanelHeader>

      <Group>
        <Div>
          <Title level="1">Калькулятор комплектов</Title>
          <Text style={{ marginTop: 8 }}>
            Выберите комплект, количество и персонализацию. Калькулятор сразу
            покажет предварительную итоговую стоимость.
          </Text>
        </Div>
      </Group>

      <Group header={<Header>1. Выберите комплект</Header>}>
        <CardGrid size="l">
          {SETS.map((set) => (
            <Card
              key={set.id}
              mode="shadow"
              style={{
                padding: 16,
                border:
                  selectedSetId === set.id
                    ? '2px solid #2688EB'
                    : '2px solid transparent',
              }}
              onClick={() => setSelectedSetId(set.id)}
            >
              <Title level="3">{set.name}</Title>

              <Text style={{ marginTop: 6 }}>{set.direction}</Text>

              <Text style={{ marginTop: 8, fontWeight: 600 }}>
                от {set.price.toLocaleString('ru-RU')} ₽
              </Text>

              <ul>
                {set.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </CardGrid>
      </Group>

      <Group header={<Header>2. Параметры заказа</Header>}>
        <FormItem top="Количество комплектов">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => {
              const value = Number(event.target.value);
              setQuantity(value > 0 ? value : 1);
            }}
          />
        </FormItem>

        <FormItem top="Чьи изделия">
          <Radio
            name="garmentOwner"
            checked={garmentOwner === 'yulaik'}
            onChange={() => setGarmentOwner('yulaik')}
          >
            Изделия ЮлайК
          </Radio>

          <Radio
            name="garmentOwner"
            checked={garmentOwner === 'client'}
            onChange={() => setGarmentOwner('client')}
          >
            Изделия клиента
          </Radio>
        </FormItem>

        <FormItem top="Тип нанесения">
          <Select
            value={printType}
            onChange={(event) => setPrintType(event.target.value)}
            options={[
              {
                label: 'Полноцветная печать',
                value: 'Полноцветная печать',
              },
              {
                label: 'Одноцветная печать',
                value: 'Одноцветная печать',
              },
              {
                label: 'Вышивка',
                value: 'Вышивка',
              },
              {
                label: 'Пока не знаю',
                value: 'Пока не знаю',
              },
            ]}
          />
        </FormItem>

        <FormItem top="Персонализация">
          <Select
            value={personalizationId}
            onChange={(event) => setPersonalizationId(event.target.value)}
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

      <Group header={<Header>3. Итоговая стоимость</Header>}>
        <Div>
          <Text>Комплект: {selectedSet.name}</Text>
          <Text>Количество: {quantity} шт.</Text>
          <Text>Персонализация: {selectedPersonalization.name}</Text>

          <Title level="2" style={{ marginTop: 16 }}>
            {calculation.total.toLocaleString('ru-RU')} ₽
          </Title>

          <Text style={{ marginTop: 8 }}>
            Цена за комплект:{' '}
            {calculation.pricePerSet.toLocaleString('ru-RU')} ₽
          </Text>

          <Text style={{ marginTop: 12 }}>
            Расчёт предварительный. Мы подтвердим его после проверки макета,
            ткани и сроков.
          </Text>
        </Div>
      </Group>

      <Group header={<Header>4. Оставить заявку</Header>}>
        {isSent ? (
          <Div>
            <Title level="2">Заявка отправлена</Title>
            <Text style={{ marginTop: 8 }}>
              Мы проверим детали и подтвердим расчёт.
            </Text>
          </Div>
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

            <FormItem top="Название команды / коллектива">
              <Input
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                placeholder="Например, НОВА"
              />
            </FormItem>

            <FormItem top="Комментарий">
              <Textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Например: нужны белые футболки, логотип есть"
              />
            </FormItem>

            <Div>
              <Button
                size="l"
                stretched
                loading={isSending}
                onClick={handleSubmit}
              >
                Отправить заявку
              </Button>
            </Div>
          </>
        )}
      </Group>
    </Panel>
  );
};