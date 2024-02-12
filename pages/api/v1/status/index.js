function status(request, response) {
  response.status(200).json({
    msg: "Rota ativa!",
  });
}

export default status;
