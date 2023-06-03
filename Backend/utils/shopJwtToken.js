const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  res.status(statusCode).json({
    success: true,
    user,
    token,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

module.exports = sendShopToken;
