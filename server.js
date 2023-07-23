import express from 'express';
import axios from "axios";

const app = express();

app.get('/', (req, res) => {
  res.send('Добро пожаловать на сайт путеводителя по заведениям!');
});

const apiKey = 'rugkll0210';


app.get('/api/2gis', async (req, res) => {
  const coordinates = '55.753215,37.622504';
  const category = 'restaurants';
  const radius = 1000;

  
  const apiUrl = `https://catalog.api.2gis.com/3.0/items?q=${category}&point=${coordinates}&radius=${radius}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const items = response.data.result.items;

    if (items.length > 0) {
      const result = items.map(item => {
        const name = item.name;
        const rating = item.rubrics.find(rubric => rubric.key === 'rating');
        return { name, rating: rating ? rating.average : 'Нет рейтинга' };
      });
      res.json(result);
    } else {
      res.json({ message: 'Заведения не найдены' });
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

