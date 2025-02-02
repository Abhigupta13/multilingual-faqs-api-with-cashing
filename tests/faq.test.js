const request = require("supertest");
const app = require("../index");

describe("FAQ API Tests", () => {
  let createdFAQId;

  test("Create a new FAQ (Valid Input)", async () => {
    const res = await request(app).post("/api/faqs").send({
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime.",
    });
console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("question", "What is Node.js?");
    createdFAQId = res.body.data._id;
  });

  test("Create FAQ (Missing Input)", async () => {
    const res = await request(app).post("/api/faqs").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Question and Answer are required");
  });

  test("Fetch FAQs in English (Default)", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("Fetch FAQs in Hindi", async () => {
    const res = await request(app).get("/api/faqs?lang=hi");
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0]).toHaveProperty("question");
  });

  test("Fetch FAQs in Bengali", async () => {
    const res = await request(app).get("/api/faqs?lang=bn");
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0]).toHaveProperty("question");
  });

  test("Fetch FAQ by ID", async () => {
    const res = await request(app).get(`/api/faqs/${createdFAQId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe(createdFAQId);
  });

  test("Fetch FAQ by ID with Hindi translation", async () => {
    const res = await request(app).get(`/api/faqs/${createdFAQId}?lang=hi`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("question");
  });

  test("Fetch non-existing FAQ by ID", async () => {
    const res = await request(app).get("/api/faqs/invalidid");
    expect(res.statusCode).toBe(500);
  });

  test("Update FAQ by ID", async () => {
    const res = await request(app).patch(`/api/faqs/${createdFAQId}`).send({
      question: "Updated Question?",
      answer: "Updated Answer.",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.question).toBe("Updated Question?");
  });

  test("Update FAQ with missing data", async () => {
    const res = await request(app).patch(`/api/faqs/${createdFAQId}`).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Question and Answer are required");
  });

  test("Delete FAQ", async () => {
    const res = await request(app).delete(`/api/faqs/${createdFAQId}`);
    expect(res.statusCode).toBe(200);
  });

  test("Fetch deleted FAQ", async () => {
    const res = await request(app).get(`/api/faqs/${createdFAQId}`);
    expect(res.statusCode).toBe(404);
  });
});
