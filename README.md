# Плагин для ручного ввода в Grafana

## Компиляция
Компиляция проводилась с использованием:

1. Ubuntu 22.04
2. node v20.10.0
3. yarn v.1.22.19

```bash
$ yarn build
```

## Упаковка пакета для установки в Grafana
После компиляции пакета в каталоге проекта будет создан каталог ``dist``.
В каталоге проекта выполняем команду:

```bash
$ (cd dist && zip -r ../mp-co-peresvet-app-<version>.zip .)
```
Каждый новый релиз проекта включает в качестве артефакта новый zip-архив.

## Установка плагина в Grafana

> [!WARNING]
> Так как упакованный плагин не подписан, то:
> 1. Grafana должна быть переведена в режим разработки:
>    параметр ``app_mode = development`` в файле ``grafana.ini``.
> 2. В Grafana должно быть разрешено использование неподписанных плагинов:
>    параметр ``allow_loading_unsigned_plugins = mp-co-peresvet-app``
>    в файле ``grafana.ini`` либо установленная переменная окружения
>    ``GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=mp-co-peresvet-app``

### Установка через автоматическую загрузку
1. Заходим на страницу релизов плагина в GitHub'е и копируем ссылку на
   zip-архив плагина в выбранном релизе.
2. Устанавливаем переменную окружения
   ``GF_INSTALL_PLUGINS=<скопированная ссылка>;mp-co-peresvet-app``
3. Запускаем Grafana, плагин будет установлен автоматически.

### Установка вручную
1. Заходим на страницу релизов плагина в GitHub'е и скачиваем
   zip-архив плагина в выбранном релизе.
2. Разархивируем плагин в папку плагинов Grafana:
   ```bash
   $ unzip mp-co-peresvet-app-<version>.zip -d /var/lib/grafana/plugins/mp-co-peresvet-app/
   ```
3. Запускаем Grafana.

## Запуск приложения в режиме отладки

- Убедиться, что на компьютере стоит Docker.
- Открыть терминал
- Перейти в директорию, куда будет скачан проект с помощью команды `cd <путь к директории>`
- Загрузить проект с помощью команды `git clone https://github.com/mp-co-ru/grafana-ui-plugin.git`
- Из терминала зайти в корневую директорию проекта с помощью команды `cd grafana-ui-plugin`
- Выполнить команду docker compose -f docker-compose.yaml up
- Далее выполнить команду yarn dev

После этого перейти в Grafana по адресу http://localhost:3000. Плагин будет доступен.
