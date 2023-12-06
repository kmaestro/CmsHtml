<?php

require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;

$watchedFolder = './api';
$targetFolder = './dist/cms/browser/api';

$filesystem = new Filesystem();

$previousState = [];

while (true) {
  // Получите текущее состояние файлов в папке
  $currentState = iterator_to_array(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($watchedFolder)));

  // Сравните текущее состояние с предыдущим
  $addedFiles = array_diff_key($currentState, $previousState);
  $deletedFiles = array_diff_key($previousState, $currentState);

  // Обработайте добавленные файлы
  foreach ($addedFiles as $addedFile => $fileInfo) {
    echo "Добавлен файл: $addedFile" . PHP_EOL;

    // Копировать или переместить файл в целевую папку, только если он существует
    if (file_exists($addedFile)) {
      $targetPath = $targetFolder . '/' . basename($addedFile);
      try {

        $filesystem->copy($addedFile, $targetPath);
      } catch (\Symfony\Component\Filesystem\Exception\FileNotFoundException $exception) {

      }
    }

    // Добавьте здесь код для дополнительной обработки, если необходимо
  }

  // Обработайте удаленные файлы
  foreach ($deletedFiles as $deletedFile => $fileInfo) {
    echo "Удален файл: $deletedFile" . PHP_EOL;

    // Удалить файл из целевой папки, только если он существует
    $targetPath = $targetFolder . '/' . basename($deletedFile);
    if (file_exists($targetPath)) {
      $filesystem->remove($targetPath);
    }
  }

  // Обновите предыдущее состояние
  $previousState = $currentState;

  // Задержка перед следующей проверкой изменений
  sleep(1);
}
