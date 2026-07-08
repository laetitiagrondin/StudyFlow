export class Task {
    constructor({ id, title, description, priority, estimatedTime, deadline, status }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.estimatedTime = estimatedTime;
        this.deadline = deadline;
        this.status = status;
    }
}
