import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/todo_model.dart';
import '../constants/api_constants.dart';

class TodoService {
  Future<List<Todo>> getTodos() async {
    try {
      final response = await http.get(Uri.parse(ApiConstants.baseUrl));
      if (response.statusCode == 200) {
        List<dynamic> body = jsonDecode(response.body);
        return body.map((e) => Todo.fromJson(e)).toList();
      } else {
        return [];
      }
    } catch (e) {
      print("Error fetching: $e");
      return [];
    }
  }

  Future<bool> addTodo(String title) async {
    final response = await http.post(
      Uri.parse(ApiConstants.baseUrl),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"title": title}),
    );
    return response.statusCode == 201;
  }

  Future<bool> toggleTodo(int id) async {
    final response = await http.put(Uri.parse("${ApiConstants.baseUrl}/$id"));
    return response.statusCode == 200;
  }

  Future<bool> deleteTodo(int id) async {
    final response = await http.delete(
      Uri.parse("${ApiConstants.baseUrl}/$id"),
    );
    return response.statusCode == 200;
  }
}
