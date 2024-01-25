const checkout = async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
    })
    console.log(session);

    res.json({ url: session.url });
}

module.exports = { checkout };