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
    web_app_info = WebAppInfo(url='https://example.com')  # Замените на фактический URL
    button = types.KeyboardButton(text='Заказать еду', web_app=web_app_info)
    
    # Инициализация клавиатуры с кнопкой
    markup = types.ReplyKeyboardMarkup(keyboard=[[button]], resize_keyboard=True)
    
    await message.answer("Hello! This is the bot response to /start or /help.", reply_markup=markup)

# Запуск бота
async def main():
    # Запускаем polling, передавая экземпляр бота непосредственно в метод
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())

