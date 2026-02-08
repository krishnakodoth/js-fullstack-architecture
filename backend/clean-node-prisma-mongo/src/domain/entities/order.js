class Order {
  constructor({ userId, total, status }) {
    if (total <= 0) {
      throw new Error("Total must be positive");
    }

    this.userId = userId;
    this.total = total;
    this.status = status || "NEW";
  }

  validate() {
    if (!this.userId) {
      throw new Error("User ID is required");
    }

    if (this.total <= 0) {
      throw new Error("Total must be positive");
    }

    const validStatuses = ["NEW", "PROCESSING", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(this.status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    return true;
  }

  updateStatus(newStatus) {
    const validStatuses = ["NEW", "PROCESSING", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    if (this.status === "CANCELLED" && newStatus !== "CANCELLED") {
      throw new Error("Cannot update a cancelled order");
    }

    if (this.status === "COMPLETED" && newStatus !== "COMPLETED") {
      throw new Error("Cannot update a completed order");
    }

    this.status = newStatus;
  }

  cancel() {
    if (this.status === "COMPLETED") {
      throw new Error("Cannot cancel a completed order");
    }
    this.status = "CANCELLED";
  }

  complete() {
    if (this.status === "CANCELLED") {
      throw new Error("Cannot complete a cancelled order");
    }
    this.status = "COMPLETED";
  }

  isCompleted() {
    return this.status === "COMPLETED";
  }

  isCancelled() {
    return this.status === "CANCELLED";
  }

  toJSON() {
    return {
      userId: this.userId,
      total: this.total,
      status: this.status
    };
  }
}

module.exports = Order;
