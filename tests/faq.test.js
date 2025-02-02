const request = require("supertest");
const app = require("../app");

describe("FAQ API with Error Handling", () => {
  test("Fetch FAQs (empty case)", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("No FAQs found");
  });

  test("Create a new FAQ (Valid Input)", async () => {
    const res = await request(app).post("/api/faqs").send({
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime.",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("question", "What is Node.js?");
  });

  test("Create FAQ (Missing Input)", async () => {
    const res = await request(app).post("/api/faqs").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Question and Answer are required");
  });
});
