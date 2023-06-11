const productController = require("../../controllers/product.controller");

test("should create a new product", async () => {
  const req = {
    body: {
      name: "Test product",
      description: "Test description",
      price: 10,
      category: "643677e475f3f16b9377118a",
      brand: "Test brand",
    },
    // files: [{ path: "path_to_image" }],
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  await productController.createProduct(req, res, next);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
  expect(next).not.toHaveBeenCalled();
});
