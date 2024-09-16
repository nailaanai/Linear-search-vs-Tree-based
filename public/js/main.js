document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const price = document.getElementById('price').value;
  const algorithm = document.getElementById('algorithm').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch(`/search/${algorithm}/${price}`);
    const data = await response.json();

    resultDiv.innerHTML = `
      <p>Result: ${JSON.stringify(data.result)}</p>
      <p>Time taken: ${data.time}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = '<p>Error fetching data</p>';
  }
});
