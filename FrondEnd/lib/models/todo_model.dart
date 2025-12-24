class Todo {
  final int id;
  final String title;
  final bool isDone;

  Todo({required this.id, required this.title, required this.isDone});

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'],
      title: json['title'],
      // Perhatikan: Sequelize defaultnya camelCase
      isDone: json['isDone'] ?? false,
    );
  }
}
