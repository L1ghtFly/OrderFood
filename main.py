from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
import asyncio
from aiogram.types import KeyboardButton, ReplyKeyboardMarkup

API_TOKEN = '7484345671:AAGXx5sPOjKRXTrvtvWRz0P1J7OB-iKYLDQ'  # Замените YOUR_API_TOKEN на ваш фактический токен

# Создание экземпляра бота
bot = Bot(token=API_TOKEN)

# Создание экземпляра диспетчера
dp = Dispatcher()

async def set_commands():
    commands = [
        types.BotCommand(command="/start", description="Start the bot"),
    ]
    await bot.set_my_commands(commands)

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    web_app_info = WebAppInfo(url='https://l1ghtfly.github.io/OrderFood/')
    button = KeyboardButton(text='Заказать еду', web_app=web_app_info)
    # Используйте InlineKeyboardMarkup сразу с кнопкой
    markup = ReplyKeyboardMarkup(inline_keyboard=[[button]])
    await message.answer('Бот для удобного заказа еды в "Любимой Столовой": просматривай меню, заказывай на доставку или самовывоз.', reply_markup=markup)

# Запуск бота
async def main():
    await dp.start_polling(bot)

# Это проверка нужна, если ваш код выполняется в среде, где уже запущен цикл событий
if __name__ == '__main__':
    if asyncio.get_event_loop().is_running():
        asyncio.create_task(main())
    else:
        asyncio.run(main())

   