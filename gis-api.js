const apiKey = 'rugkll0210';

export async function getRestaurantsInAlmaty(query, page) {
  const cityId = '9430034490064971';
  const pageSize = 10;

  try {
    const response = await axios.get('https://catalog.api.2gis.com/3.0/items', {
      params: {
        q: `ресторан ${query}`,
        city_id: cityId,
        sort: 'rating',
        key: apiKey,
        page: page,
        page_size: pageSize
      }
    });

    console.log('Response from API:', response.data);

   if (response.data && response.data.result && Array.isArray(response.data.result.items)) {
      const restaurants = response.data.result.items.map(restaurant => {
        return {
          name: restaurant.name,
          rating: restaurant.rating,
          address: restaurant.address_name,
          workTime: restaurant.adm_div && restaurant.adm_div.work_time,
          website: restaurant.adm_div && restaurant.adm_div.has_site ? restaurant.adm_div.site_url : null,
        };
      });

      return {
        total: response.data.result.total,
        items: restaurants
      };
    } else {
      throw new Error('Некорректный ответ от сервера API или пустой результат');
    }
  } catch (error) {
    console.error(`Ошибка при получении данных о заведениях (${query}):`, error);
    return [];
  }
}
