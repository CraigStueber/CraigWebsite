function RestaurantTable({ restaurants }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Specials</th>
          <th>Happy Hour</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.specials}</td>
            <td>{restaurant.happyHour}</td>
            <td>{restaurant.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RestaurantTable;
