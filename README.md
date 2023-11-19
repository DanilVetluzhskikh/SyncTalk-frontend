## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev - запуск сервера + frontend проекта в dev режиме
```

----

## Правила тестирования

pre-commit: 

- `test:unit` - проверка корректности unit-тестов

----

## Скрипты

- `npm run start` - Билд проекта в dev режиме
- `npm run dev` - Запуск frontend проекта на webpack dev server
- `npm run build` - Билд проекта в prod режиме
- `npm run test:unit` - Запуск unit тестов

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Тесты

В проекте используются unit тесты:
1) Запуск unit тестов на jest - `npm run test:unit`
...?

----

## Правила написания React компонентов

В этом разделе описаны основные правила и рекомендации по написанию React компонентов в проекте.

### Структура компонента
1. **Объявление переменных**: Сначала объявляются все переменные. Это включает в себя состояния (`useState`), ссылки (`useRef`) и любые другие переменные.

    ```jsx
    const [count, setCount] = useState(0);
    const myRef = useRef(null);
    ```

2. **Функции**: Затем следуют функции. Это улучшает читаемость, так как позволяет сразу увидеть, какие действия может выполнять компонент.

    ```jsx
    const incrementCount = () => {
      setCount(prevCount => prevCount + 1);
    };
    ```

3. **Эффекты (`useEffect`)**: Эффекты располагаются после функций. Это помогает поддерживать чистоту компонента и четкую структуру.

    ```jsx
    useEffect(() => {
      console.log('Component mounted or updated');
    }, []);
    ```

4. **Моковые переменные**: После `useEffect` могут идти моковые переменные, такие как условные выражения для рендеринга или классов.

    ```jsx
    const isDisabled = count > 3;
    ```

### Ключи в списках
- Избегайте использования индексов массива в качестве ключей (`key`) для элементов списка. Вместо этого используйте уникальные идентификаторы.

    **Плохо:**
    ```jsx
    {items.map((item, index) => <div key={index}>{item.name}</div>)}
    ```

    **Хорошо:**
    ```jsx
    {items.map(item => <div key={item.id}>{item.name}</div>)}
    ```

### Использование `useMemo` и `useCallback`
- Избегайте без надобности использования `useMemo` и `useCallback`, так как это может привести к излишней оптимизации и усложнению кода.
- Используйте `useMemo` и `useCallback` только в тех случаях, когда дочерние компоненты обернуты в `React.memo`, и это действительно необходимо для оптимизации.

    **Плохо:**
    ```jsx
    const ParentComponent = () => {
      const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
      const handleClick = useCallback(() => {
        console.log('Clicked');
      }, []);
      // ...
    }

    const ChildComponent = ({ memoizedValue, onClick }) => {
      // ...
    };
    ```

    **Хорошо:**
    ```jsx
    const ParentComponent = () => {
      const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
      const handleClick = useCallback(() => {
        console.log('Clicked');
      }, []);

      return <ChildComponent memoizedValue={memoizedValue} onClick={handleClick} />;
    }

    const ChildComponent = React.memo(({ memoizedValue, onClick }) => {
      // ...
    });
    ```

----

## Правила тестирования

В этом разделе описываются основные принципы и рекомендации по тестированию в проекте.

### Общие положения
- **Покрытие тестами**: Все React компоненты должны быть покрыты тестами. Также необходимо покрывать тестами функции, которые выступают в роли хелперов или утилит.
- **Инструменты тестирования**:
  - Для React компонентов используем **React Testing Library (RTL)**.
  - Для функций-хелперов и утилит используем **Jest**.

### Структура тестов
- **`describe` блоки**: Используйте `describe` для группировки тестов. В заголовке `describe` указывайте путь до тестируемого модуля или компонента для лучшей читабельности и поиска по проекту.
- **`test` блоки**: Каждый тест описывается внутри блока `test`. Название теста должно быть на русском языке и чётко отражать его смысл.

### Пример теста для функции-валидатора
```javascript
describe('shared/lib/validators/validateEmail', () => {
  test('Валидация на некорректный email', () => {
    expect(validateEmail('testmail.ru')).toBe(invalidEmailMessage);
    expect(validateEmail('test@mailru')).toBe(invalidEmailMessage);
    expect(validateEmail('test22222@')).toBe(invalidEmailMessage);
  });

  test('Валидация на корректный email', () => {
    expect(validateEmail('test@mail.ru')).toBe(undefined);
    expect(validateEmail('test@gmail.com')).toBe(undefined);
    expect(validateEmail('test@c123.ru')).toBe(undefined);
  });
});