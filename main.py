from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
from pymongo import MongoClient
import asyncio
import json

client = MongoClient('mongodb://localhost:27017/')
db = client['food_ordering_bot']
users_collection = db.users

API_TOKEN = '7484345671:AAGXx5sPOjKRXTrvtvWRz0P1J7OB-iKYLDQ'
bot = Bot(token=API_TOKEN)
dp = Dispatcher()  # Передайте экземпляр бота здесь

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    web_app_info = WebAppInfo(url='https://l1ghtfly.github.io/OrderFood/')
    button = InlineKeyboardButton(text='Заказать еду', web_app=web_app_info)
    markup = InlineKeyboardMarkup(inline_keyboard=[[button]])
    await message.answer(
        'Бот для удобного заказа еды в "Любимой Столовой": просматривай меню, заказывай на доставку или самовывоз.',
        reply_markup=markup
    )

@dp.message(lambda message: message.content_type == types.ContentType.WEB_APP_DATA)
async def handle_web_app_data(message: types.Message):
    print("Received data:", message.web_app_data.data)  # Логирование полученных данных
    data = json.loads(message.web_app_data.data)
    print("Parsed data:", data)  # Проверка распарсенных данных
    update_result = users_collection.update_one(
        {"telegram_id": message.from_user.id},
        {"$set": {"name": data['name'], "phone": data['phone']}},
        upsert=True
    )

    if update_result.matched_count:
        await message.answer(f"Данные обновлены: Имя - {data['name']}, Телефон - {data['phone']}")
    else:
        await message.answer(f"Данные сохранены: Имя - {data['name']}, Телефон - {data['phone']}")

    await message.answer("Если вы хотите изменить данные, отправьте новые данные.")

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    if loop.is_running():
        loop.create_task(main())
    else:
        asyncio.run(main())