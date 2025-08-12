const invoiceHTMLGenerator = (order) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; color: #333;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #27ae60; margin-bottom: 5px;">Food-Del 🍽️</h1>
      <p style="margin: 0; font-size: 14px; color: #555;">Your Delicious Moments Delivered</p>
    </div>
  
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
  
    <h2 style="color: #2c3e50;">Invoice Details</h2>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
    <p><strong>Status:</strong> <span style="color: #e67e22;">${order.status}</span></p>
  
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
  
    <h3 style="color: #2c3e50;">Customer Information</h3>
    <p>
      <strong>${order.address.firstName} ${order.address.lastName}</strong><br />
      ${order.address.email}<br />
      ${order.address.street}, ${order.address.city}<br />
      ${order.address.state} - ${order.address.zipCode}, ${order.address.country}<br />
      📞 ${order.address.phone}
    </p>
  
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
  
    <h3 style="color: #2c3e50;">Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background-color: #f1f1f1;">
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Item</th>
          <th style="text-align: center; padding: 10px; border-bottom: 1px solid #ddd;">Qty</th>
          <th style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">Price (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `
              <tr>
                <td style="padding: 8px 10px;">${item.name}</td>
                <td style="text-align: center;">${item.quantity}</td>
                <td style="text-align: right;">₹${item.quantity * item.price}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  
    <h2 style="text-align: right; color: #27ae60;">Total: ₹${order.amount}</h2>
  
    <div style="text-align: center; margin-top: 40px;">
      <p style="font-size: 14px; color: #999;">Thank you for ordering with <strong>Food-Del</strong>!<br />We hope to serve you again soon.</p>
      <div style="text-align: center; margin-top: 30px;">
      
    </div>
      <p style="font-size: 12px; color: #bbb;">This is an auto-generated invoice.</p>
    </div>
  </div>
  `;
}

module.exports = {
  invoiceHTMLGenerator,
}