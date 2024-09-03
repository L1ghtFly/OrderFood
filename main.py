from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
import asyncio

API_TOKEN = '7484345671:AAGXx5sPOjKRXTrvtvWRz0P1J7OB-iKYLDQ'  # Замените YOUR_API_TOKEN на ваш фактический токен

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    web_app_info = WebAppInfo(url='https://l1ghtfly.github.io/OrderFood/')
    button = InlineKeyboardButton(text='Заказать еду', web_app=web_app_info)
    # Создание и добавление кнопки в клавиатуру одновременно
    markup = InlineKeyboardMarkup(inline_keyboard=[[button]])
    
    await message.answer('Бот для удобного заказа еды в "Любимой Столовой": просматривай меню, заказывай на доставку или самовывоз.', reply_markup=markup)

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    if loop.is_running():
        loop.create_task(main())
    else:
        asyncio.run(main())
