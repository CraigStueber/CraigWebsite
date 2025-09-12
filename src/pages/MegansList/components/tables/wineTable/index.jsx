function WineTable({ wines }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {wines.map((wine) => (
          <tr key={wine.id}>
            <td>{wine.name}</td>
            <td>{wine.description}</td>
            <td>{wine.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WineTable;
