import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const versionPostgres = await database.query("show server_version;");
  const versionPostgresValue = versionPostgres.rows[0]["server_version"];

  const maxConnections = await database.query("show max_connections;");
  const databaseMaxConnectionsValue = maxConnections.rows[0]["max_connections"];

  const databaseName = process.env.POSTGRES_DB; // QUERYS DINAMICAS
  const openedConnectios = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectiosValue = openedConnectios.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgres_version: parseFloat(versionPostgresValue),
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: parseInt(databaseOpenedConnectiosValue),
      },
    },
  });
}

export default status;
