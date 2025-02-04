module.exports = Transaction = {
  create: async function (
    userId,
    amount,
    receipt = null,
    breakdown = null,
    notes = null,
    allow_debit = false
  ) {
    if (receipt) receipt.breakdown = breakdown;

    var data = {
      user_id: userId,
      amount: parseFloat(amount),
      allow_debit: allow_debit,
    };

    if (receipt) data.receipt = receipt;
    if (notes) data.notes = notes;

    try {
      var res = await this.request("POST", "/transactions/create", data);
      if (res.success) {
        return res.transaction;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  },
  get: async function (transactionId) {
    try {
      var data = await this.request(
        "GET",
        "/transactions/get/transaction/" + transactionId
      );
      if (data.success) {
        return data.transaction;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  },
};
