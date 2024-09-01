from aiogram import Bot, Dispatcher, types
from aiogram.types.web_app_info import WebAppInfo
from aiogram.filters import Command
import asyncio

API_TOKEN = '7484345671:AAGXx5sPOjKRXTrvtvWRz0P1J7OB-iKYLDQ'

# Создание экземпляра бота
bot = Bot(token=API_TOKEN)

# Создание экземпляра диспетчера
dp = Dispatcher()

# Регистрация обработчика команд
@dp.message(Command('start'))
async def send_welcome(message: types.Message):
    # Создание кнопки с объектом WebAppInfo
    web_app_info = WebAppInfo(url='https://l1ghtfly.github.io/OrderFood/')  # Замените на фактический URL
    button = types.InlineKeyboardButton(text='Заказать еду', web_app=web_app_info)
    
    # Инициализация инлайн-клавиатуры с кнопкой
    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton('Заказать еду', web_app= WebAppInfo(url='https://l1ghtfly.github.io/OrderFood/')))
    # Отправка приветственного сообщения с инлайн-клавиатурой
    await message.answer('Бот для удобного заказа еды в "Любимой Столовой": просматривай меню, заказывай на доставку или самовывоз.', reply_markup=markup)

# Запуск бота
async def main():
    # Запускаем polling, передавая экземпляр бота непосредственно в метод
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())

