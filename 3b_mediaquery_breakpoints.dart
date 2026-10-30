import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MediaQueryHomePage(),
    );
  }
}

class MediaQueryHomePage extends StatelessWidget {
  const MediaQueryHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(title: const Text('MediaQuery Example')),
      body: Center(
        child: screenWidth > 600
            ? Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const FlutterLogo(size: 100),
                  const SizedBox(width: 20),
                  Text(
                    'Wide Screen: ${screenWidth.toStringAsFixed(0)} px',
                    style: const TextStyle(fontSize: 24),
                  ),
                ],
              )
            : Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const FlutterLogo(size: 100),
                  const SizedBox(height: 20),
                  Text(
                    'Narrow Screen: ${screenWidth.toStringAsFixed(0)} px',
                    style: const TextStyle(fontSize: 24),
                  ),
                ],
              ),
      ),
    );
  }
}
