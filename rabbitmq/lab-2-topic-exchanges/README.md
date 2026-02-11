# Lab 2: Intelligent Routing with Topic Exchanges

### Context
Your platform processes different types of animal-related logs: `canine.bark`, `feline.meow`, `canine.track`, and `feline.sleep`.

### The Issue
You have different workers that need specialized subsets of data:
1.  **Animal Researcher**: Needs ALL logs for ALL animals.
2.  **Dog Trainer**: Needs only logs related to `canine`.
3.  **Behavioralist**: Needs only logs related to `track` behaviors across all species.

If you used a `Direct` exchange, you would need to duplicate messages to multiple queues, which is inefficient.

### Goal
Implement a **Topic Exchange** to route messages dynamically using wildcards (`*` and `#`).
