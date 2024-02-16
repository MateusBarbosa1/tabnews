test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // VERIFICA SE A DATA NÂO ESTA VAZIA
  const responseBody = await response.json();

  const expectedDate = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(expectedDate);

  // VERIFICA SE AS INFORMAÇÕES DO BANCO DE DADOS ESTA NO TIPO CORRETO
  expect(responseBody.dependencies.database.postgres_version).toEqual(16.2);
  expect(typeof responseBody.dependencies.database.postgres_version).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(typeof responseBody.dependencies.database.max_connections).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
