import {
  createTable,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "tasks",
          columns: [
            { name: "title", type: "string" },
            { name: "is_finished", type: "boolean" },
          ],
        }),
      ],
    },
  ],
});
