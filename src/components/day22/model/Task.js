import { Model, appSchema } from "@nozbe/watermelondb";
import { field, text, writer } from "@nozbe/watermelondb/decorators";
import { database } from ".";

export default class Task extends Model {
  static table = "tasks";

  @text("title") title;
  @field("is_finished") isFinished;
}
