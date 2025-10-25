import { createConsumer } from "@rails/actioncable";

// Create a single Action Cable consumer instance
const consumer = createConsumer("/cable");

export default consumer;
